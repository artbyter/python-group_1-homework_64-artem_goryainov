import React, {Component} from 'react'
import {SHOWS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import MovieCategories from "../../components/MovieCategories";
import axios from 'axios';
import moment from 'moment';
import ShowSchedule from "../../components/ShowSchedule"


export default class ItemDetails extends Component {
    state = {
        item: null,
        shows: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту

        const {url,id}=this.props

        console.log(this.props)
        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(url + id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(item => {
                this.setState({item})
                this.loadShows(item.id)
            })
            .catch(error => console.log(error));
    }


    loadShows = (itemId) => {
        // https://momentjs.com/ - библиотека для работы с датой и временем в JS
        // более удобная, чем встроенный класс Date(). Не забудьте импортировать.
        // установка: npm install --save moment (уже ставится вместе с реактом)
        // импорт: import moment from 'moment';

        // вернёт текущую дату со временем в формате ISO с учётом временной зоны
        const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        // вернёт только дату на 3 дня вперёд от текущей в указанном формате
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');

        // encodeURI закодирует строку для передачи в запросе
        // отличается от encodeURIComponent тем, что пропускает символы,
        // входящие в формат URI, в т.ч. & и =.
        const id=this.props.itemType==='hall'?'hall_id':'movie_id'
        const query = encodeURI(`${id}=${itemId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);

        axios.get(`${SHOWS_URL}?${query}`).then(response => {

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

        if (!this.state.item) return null;

        const {name, poster, description, release_date, finish_date, categories, id} = this.state.item;
        const {url}=this.props


        return <div>
             {/*постер, если есть*/}
            {poster ? <div className='text-center'>
            <img className="img-fluid rounded" src={poster}/>
            </div> : null}

            {/* название фильма */}
            <h1>{name}</h1>
            <h3>{description}</h3>
            {/* категории, если указаны */}
            {categories && categories.length > 0 ? <MovieCategories categories={categories}/> : null}

            {/* даты проката c: по: (если указано)*/}

            {/* редактировать фильм */}
            <NavLink to={url + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>
            {/*<button onClick={()=>onDelete(id)} className="btn btn-primary mr-2">Delete</button>*/}

            {/* назад */}
            <NavLink to={url} className="btn btn-primary">{this.props.buttonText}</NavLink>
            {this.state.shows ? <ShowSchedule shows={this.state.shows} itemType={this.props.itemType}/> : null}
        </div>;
    }
}


