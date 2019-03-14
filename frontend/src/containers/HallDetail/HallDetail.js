import React, {Component} from 'react'
import {HALLS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import MovieCategories from "../../components/MovieCategories/MovieCategories";
import axios from 'axios';


class HallDetail extends Component {
    state = {
        hall: null
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
            .then(hall => this.setState({hall}))
            .catch(error => console.log(error));
    }



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
        </div>;
    }
}


export default HallDetail;