import React, {Fragment, Component} from 'react'
import {HALLS_URL, MOVIES_URL} from "../../api-urls";
import MovieCard from "../../components/MovieCard/MovieCard";
import {NavLink} from "react-router-dom";
import axios from 'axios';
import ItemCard from "../../components/ItemCard"


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
class MovieList extends Component {
    state = {
        movies: [],
    };

    componentDidMount() {
        console.log("Here is the path"+this.props.match.params)
        axios.get(MOVIES_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(movies => this.setState({movies}))
            .catch(error => console.log(error));
    }

    movieDeleted = (movieId) => {

        axios.delete(MOVIES_URL + movieId + '/').then(response => {
            console.log(response.data);
            this.setState(prevState => {
                let {movies} = prevState;
                const newMovies = [...movies]
                let movieIndex = newMovies.findIndex(movie => movie.id === movieId);
                newMovies.splice(movieIndex, 1);

                return {movies:newMovies};
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
        console.log("Deleted " + movieId)
    };

    render() {
        const link = {
        text: 'Read more',
        url: '/movies/'
    };
        return <Fragment>
            <p><NavLink to='/movies/add'>Добавить фильм</NavLink></p>
            <div className='row'>
                {this.state.movies.map(movie => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={movie.id}>
                        <ItemCard item={movie} link ={link} onDelete={this.movieDeleted}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default MovieList;