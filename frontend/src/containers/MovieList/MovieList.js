import React, {Component} from 'react'
import {MOVIES_URL} from "../../api-urls";
import ItemList from "../ItemList"

export default class MovieList extends Component {

    render() {
        const link = {
            text: 'Read more',
            url: '/movies/'
        };
        return <ItemList url={MOVIES_URL} link={link}/>
    }
}

