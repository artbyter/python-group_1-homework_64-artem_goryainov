import React from 'react'
import {HALLS_URL} from "../../api-urls";

import ItemDetails from "../ItemDetails"

const HallDetail  = (props) => {

 return <ItemDetails url={HALLS_URL} id={props.match.params.id} buttonText="Halls" itemType="hall"/>

}
export default HallDetail;