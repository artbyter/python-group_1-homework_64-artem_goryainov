import React from 'react'
import Card from "../UI/Card"

const ItemCard = props => {
    const {item, className} = props;
    const link = props.link

    return <Card item={item} id={item.id}  link={link} onDelete={props.onDelete} className='h-100'/>;
};


export default ItemCard;