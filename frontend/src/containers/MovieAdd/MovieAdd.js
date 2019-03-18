import React from 'react';
import {MOVIES_URL} from "../../api-urls";
import ItemAdd from "../ItemAdd";


const MovieAdd  =(props) => {

        return <ItemAdd url={MOVIES_URL} />

}


export default MovieAdd;
