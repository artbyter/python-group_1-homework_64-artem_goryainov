import React, {Component, Fragment} from 'react';
import axios from "axios";
import {HALLS_URL} from "../../api-urls";
import HallForm from "../../components/HallForm";
import MovieForm from "../../components/MovieForm";


export default class ItemAdd extends Component {
    state = {
        // сообщение об ошибке
        alert: null,
        errors:{}
    };

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
                if(Array.isArray(value)) {
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
        const {url,id}=this.props
        // сборка данных для запроса
        const formData = this.gatherFormData(item);

        // отправка запроса
        return axios.post(url , formData, {
            headers: {'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + localStorage.getItem('auth-token')}
        })
            .then(response => {
                // при успешном создании response.data содержит данные фильма
                const item = response.data;
                console.log(item);
                // если всё успешно, переходим на просмотр страницы фильма с id,
                // указанным в ответе
                this.props.history.replace(url + item.id);
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
        console.log('Errors')
        console.log(this.props.errors)
        const alert = this.state.alert;
        return <Fragment>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            {this.props.itemType==='hall'?<HallForm onSubmit={this.formSubmitted} showErrors={this.showErrors}/>:<MovieForm onSubmit={this.formSubmitted} showErrors={this.showErrors}/>}
        </Fragment>
    }
}


