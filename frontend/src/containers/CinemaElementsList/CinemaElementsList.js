import React {Component} from 'react'
import axios from "axios";

export default class CinemaElementsList extends Component {
    state = {
        elements: [],
    };

    componentDidMount() {
        const {url} = this.props
        axios.get(url)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(halls => this.setState({halls}))
            .catch(error => console.log(error));
    }
}

