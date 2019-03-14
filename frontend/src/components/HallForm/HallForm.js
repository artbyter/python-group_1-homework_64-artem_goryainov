import React, {Component} from 'react'
import axios from "axios";


class HallForm extends Component {
    // в props передаются начальные данные для фильма
    // в дальнейшем они копируются в state и извне компонента MovieForm больше не меняются
    // (всё остальное управление значением movie и его полей лежит на MovieForm).
    constructor(props) {
        super(props);

        // пустой объект фильма для формы создания
        const newHall = {
            name: "",
            description: "",
            categories: []
        };

        this.state = {

            submitEnabled: true,
            // изначально movie пустой (для формы добавления)
            hall: newHall,

        };

        // если movie передан через props
        if(this.props.hall) {


            // записываем в state существующий movie
            this.state.hall = this.props.hall;


        }
    }



    // блокировка отправки формы на время выполнения запроса
    disableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = false;
            return newState;
        });
    };

    // разблокировка отправки формы
    enableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = true;
            return newState;
        });
    };







    // функция, обновляющая поля в this.state.movie
    updateHallState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let hall = {...prevState.hall};
            hall[fieldName] = value;
            newState.hall = hall;
            return newState;
        });
    };

    // обработчик ввода в поля ввода
    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateHallState(fieldName, value);
    };



    // отправка формы
    // внутри вызывает onSubmit - переданное действие - со своим фильмом в качестве аргумента.
    submitForm = (event) => {
        if(this.state.submitEnabled) {
            event.preventDefault();
            this.disableSubmit();
            this.props.onSubmit(this.state.hall)
                .then(this.enableSubmit);
        }
    };

    render() {
        if (this.state.hall) {
            // распаковка данных фильма, чтобы было удобнее к ним обращаться
            const {name, description} = this.state.hall;
            // распаковка переменных из state.
            const {submitEnabled} = this.state;





            return <div>
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label className="font-weight-bold">Название</label>
                        <input type="text" className="form-control" name="name" value={name}
                               onChange={this.inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label>Описание</label>
                        <input type="text" className="form-control" name="description" value={description}
                               onChange={this.inputChanged}/>
                    </div>

                    <button disabled={!submitEnabled} type="submit"
                            className="btn btn-primary">Сохранить
                    </button>
                </form>
            </div>;
        }
    }
}


export default HallForm;