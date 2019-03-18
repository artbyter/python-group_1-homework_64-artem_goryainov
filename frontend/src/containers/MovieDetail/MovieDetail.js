import React from 'react'
import {MOVIES_URL} from "../../api-urls";

import ItemDetails from "../ItemDetails";


const MovieDetail  = (props) => {

    return <ItemDetails url={MOVIES_URL} id={props.match.params.id} buttonText="Movies"/>

}


export default MovieDetail;
