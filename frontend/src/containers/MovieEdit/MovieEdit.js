import React from 'react'

import {MOVIES_URL} from "../../api-urls";

import ItemEdit from "../ItemEdit";


const MovieEdit = (props) => {

    return <ItemEdit url={MOVIES_URL} id={props.match.params.id}/>

}

export default MovieEdit