import React from 'react'

import {HALLS_URL} from "../../api-urls";
import ItemEdit from "../ItemEdit"

const HallEdit = (props) => {


    return <ItemEdit url={HALLS_URL} id={props.match.params.id} itemType="hall"/>

}


export default HallEdit