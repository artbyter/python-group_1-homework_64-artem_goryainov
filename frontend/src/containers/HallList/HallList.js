import React, { Component} from 'react'
import {HALLS_URL} from "../../api-urls";
import ItemList from "../ItemList"

export default class HallList extends Component {


    render() {
        const link = {
        text: 'Read more',
        url: '/halls/'
    };
        return <ItemList url={HALLS_URL} link={link}/>
    }
}


