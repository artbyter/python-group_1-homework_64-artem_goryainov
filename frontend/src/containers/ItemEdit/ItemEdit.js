import React, {Component, Fragment} from 'react'
import axios from "axios";
import {MOVIES_URL} from "../../api-urls";
import MovieForm from "../../components/MovieForm/MovieForm";
import HallForm from "../../components/HallForm";


export default class ItemEdit extends Component {
    state = {
        // исходные данные фильма, загруженные из API.
        item: null,

        // сообщение об ошибке
        alert: null,

        errors: {}
    };

    componentDidMount() {
        // match.params - переменные из пути к этому компоненту
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(this.props.url + this.props.id)
            .then(response => {
                const item = response.data;

                this.setState(prevState => {
                    const newState = {...prevState};
                    newState.item = item;
                    if (this.props.itemType !== 'hall')
                        newState.item.categories = item.categories.map(category => category.id);
                    console.log(newState)
                    return newState;
                });
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
            });
    }

    // вывод сообщение об ошибке
    showErrorAlert = (error) => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.alert = {type: 'danger', message: `Item was not added!`};
            return newState;
        });
    };

    // сборка данных для запроса
    gatherFormData = (item) => {
        let formData = new FormData();
        Object.keys(item).forEach(key => {
            const value = item[key];
            if (value) {
                if (Array.isArray(value)) {
                    // для полей с несколькими значениями (категорий)
                    // нужно добавить каждое значение отдельно
                    value.forEach(item => formData.append(key, item));
                } else {
                    formData.append(key, value);
                }
            }
        });
        return formData;
    };

    // обработчик отправки формы
    formSubmitted = (item) => {
        // сборка данных для запроса
        const formData = this.gatherFormData(item);

        // отправка запроса
        return axios.put(this.props.url + this.props.id + '/', formData, {
            headers: {'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + localStorage.getItem('auth-token')},

        })
            .then(response => {
                // при успешном создании response.data содержит данные фильма
                const item = response.data;
                console.log(item);
                // если всё успешно, переходим на просмотр страницы фильма с id,
                // указанным в ответе
                this.props.history.replace(this.props.url + item.id);
            })
            .catch(error => {
                console.log(error);
                // error.response - ответ с сервера
                // при ошибке 400 в ответе с сервера содержатся ошибки валидации
                // пока что выводим их в консоль
                console.log(error.response);
                this.showErrorAlert(error.response);
                this.setState({
                ...this.state,
                errors: error.response.data
            })
            });
    };

    showErrors = (name) => {
        if(this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {alert, item} = this.state;

        return <Fragment>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            {item ? this.props.itemType === 'hall' ? <HallForm onSubmit={this.formSubmitted} item={item} showErrors={()=>this.showErrors()}/> :
                <MovieForm onSubmit={this.formSubmitted} item={item} showErrors={this.showErrors}/> : null}
        </Fragment>
    }
}


