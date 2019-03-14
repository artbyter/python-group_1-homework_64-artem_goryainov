import React, {Fragment, Component} from 'react'
import {HALLS_URL} from "../../api-urls";
import HallCard from "../../components/HallCard/HallCard";
import {NavLink} from "react-router-dom";
import axios from 'axios';

class HallList extends Component {
    state = {
        halls: [],
    };

    componentDidMount() {
        axios.get('http://localhost:8000/api/v1/halls/')
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(halls => this.setState({halls}))
            .catch(error => console.log(error));
    }

    hallDeleted = (hallId) => {

        axios.delete(HALLS_URL + hallId + '/').then(response => {
            console.log(response.data);
            this.setState(prevState => {
                let {halls} = prevState;
                const newHalls = [...halls]
                let hallIndex = newHalls.findIndex(hall => hall.id === hallId);
                newHalls.splice(hallIndex, 1);

                return {halls:newHalls};
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
        console.log("Deleted " + hallId)
    };

    render() {
        return <Fragment>
            <p><NavLink to='/halls/add'>Добавить зал</NavLink></p>
            <div className='row'>
                {this.state.halls.map(hall => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3' key={hall.id}>
                        <HallCard hall={hall} onDelete={this.hallDeleted}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default HallList;