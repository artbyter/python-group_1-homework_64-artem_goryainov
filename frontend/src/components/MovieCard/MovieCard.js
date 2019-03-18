import React from 'react';
import Card from "../UI/Card/Card";

const MovieCard = props => {
    const {movie, className} = props;
    const {name, poster, id} = movie;
    const link = {
        text: 'Read more',
        url: '/movies/' + id
    };

    return <Card header={name} id={id} image={poster} link={link} onDelete={props.onDelete} className='h-100'/>;
};


export default MovieCard;
