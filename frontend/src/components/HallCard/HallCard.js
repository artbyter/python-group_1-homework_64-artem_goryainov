import React from 'react'
import Card from "../UI/Card/Card";

const HallCard = props => {
    const {hall, className} = props;
    const {name, description, id} = hall;
    const link = {
        text: 'Read more',
        url: '/halls/' + id
    };

    return <Card header={name} id={id} link={link} onDelete={props.onDelete} className='h-100'/>;

}

export default HallCard