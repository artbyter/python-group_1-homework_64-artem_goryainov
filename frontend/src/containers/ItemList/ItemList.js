import React, {Component,Fragment} from 'react'
import axios from "axios";
import ItemCard from "../../components/ItemCard";

class ItemList extends Component {
    state = {
        items: [],
    };

    componentDidMount() {
        const {url} = this.props
        axios.get(url)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(items => this.setState({items}))
            .catch(error => console.log(error));
    }

    onDeleted = (itemId) => {

        axios.delete(this.props.url + itemId + '/').then(response => {
            console.log(response.data);
            this.setState(prevState => {
                let {items} = prevState;
                const newItems = [...items]
                let itemIndex = newItems.findIndex(item => item.id === itemId);
                newItems.splice(itemIndex, 1);

                return {items:newItems};
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
        console.log("Deleted " + itemId)
    };

     render() {
        const {link} = this.props
        return <Fragment>
            <div className='row'>
                {this.state.items.map(item => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3' key={item.id}>
                        <ItemCard item={item} link={link} onDelete={this.onDeleted}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

export default ItemList