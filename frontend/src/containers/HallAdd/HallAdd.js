import React from 'react';
import {HALLS_URL} from "../../api-urls";
import ItemAdd from "../ItemAdd";


const HallAdd  =(props) => {

        return <ItemAdd url={HALLS_URL} itemType="hall"/>

}


export default HallAdd;