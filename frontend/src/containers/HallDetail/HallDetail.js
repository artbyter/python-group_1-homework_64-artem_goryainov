import React, {Component} from 'react'
import {HALLS_URL, SHOWS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import MovieCategories from "../../components/MovieCategories/MovieCategories";
import axios from 'axios';
import moment from 'moment';
import ShowSchedule from "../../components/ShowSchedule"


class HallDetail extends Component {
    state = {
        hall: null,
        shows: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(HALLS_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(hall => {
                this.setState({hall})
                this.loadShows(hall.id)
            })
            .catch(error => console.log(error));
    }


    loadShows = (hallId) => {
        // https://momentjs.com/ - библиотека для работы с датой и временем в JS
        // более удобная, чем встроенный класс Date(). Не забудьте импортировать.
        // установка: npm install --save moment (уже ставится вместе с реактом)
        // импорт: import moment from 'moment';
        console.log("In LoadShows")
        // вернёт текущую дату со временем в формате ISO с учётом временной зоны
        const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        // вернёт только дату на 3 дня вперёд от текущей в указанном формате
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');
        console.log(startsAfter)
        // encodeURI закодирует строку для передачи в запросе
        // отличается от encodeURIComponent тем, что пропускает символы,
        // входящие в формат URI, в т.ч. & и =.
        const query = encodeURI(`hall_id=${hallId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
        console.log(query)
        axios.get(`${SHOWS_URL}?${query}`).then(response => {
            console.log("Loading shows " + response.data);
            this.setState(prevState => {
                let newState = {...prevState};
                newState.shows = response.data;
                return newState;
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    };

    render() {
        // если movie в state нет, ничего не рисуем.
        if (!this.state.hall) return null;

        // достаём данные из movie
        const {name, description, id} = this.state.hall;
        // const {onDelete}=this.props.onDelete

        return <div>
            {/* постер, если есть */}
            {/*{poster ? <div className='text-center'>*/}
            {/*<img className="img-fluid rounded" src={poster}/>*/}
            {/*</div> : null}*/}

            {/* название фильма */}
            <h1>{name}</h1>
            <h3>{description}</h3>
            {/* категории, если указаны */}
            {/*{categories.length > 0 ? <MovieCategories categories={categories}/> : null}*/}

            {/* даты проката c: по: (если указано)*/}

            {/* редактировать фильм */}
            <NavLink to={'/halls/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>
            {/*<button onClick={()=>onDelete(id)} className="btn btn-primary mr-2">Delete</button>*/}

            {/* назад */}
            <NavLink to='/halls/' className="btn btn-primary">Halls</NavLink>
            {this.state.shows ? <ShowSchedule shows={this.state.shows}/> : null}
        </div>;
    }
}


export default HallDetail;