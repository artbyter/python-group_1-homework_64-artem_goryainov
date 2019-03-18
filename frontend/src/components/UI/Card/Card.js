import React from 'react';
import {NavLink} from 'react-router-dom'


// компонент, который представляет собой карточку, основанную на стилях Bootstrap,
// и рисует карточку с указанным хедером, картинкой и ссылкой.
// проверки нужны на тот случай, чтобы в разметке не появлялись лишние отступы,
// если данные для какой-то части карточки не переданы и она выводится пустая.
// props.className позволяет принимать дополнительные классы для карточки по нуждам использующего компонента.
const Card = props => {
    console.log(props.item)
    return <div className={"card mt-3 text-center text-sm-left " + (props.className ? props.className : "")}>
        {props.item.poster ? <img className="card-img-top" src={props.item.poster}/> : null}
        {props.item.name || props.item.description || props.link ? <div className="card-body">
            {props.item.name ? <h5 className="card-title">{props.item.name}</h5> : null}
            {props.item.description ? <p className="card-text">{props.item.description}</p> : null}
            {/* ссылка NavLink (из роутера) для навигации между "страницами" */}
            {/* принимает два параметра в одном "флаконе": link = {url, text}.  */}
            {props.link ? <NavLink to={props.link.url+props.id} className="btn btn-primary">
                {props.link.text}
            </NavLink> : null}
            <button className="btn btn-primary ml-2" onClick={()=> props.onDelete(props.id)}>Delete</button>
        </div> : null}
    </div>
};


export default Card;