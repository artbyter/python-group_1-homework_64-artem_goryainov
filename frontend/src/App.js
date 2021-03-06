import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import MovieList from "./containers/MovieList/MovieList";
import MovieDetail from "./containers/MovieDetail/MovieDetail";
import MovieAdd from "./containers/MovieAdd/MovieAdd";
import MovieEdit from "./containers/MovieEdit/MovieEdit";
import HallList from "./containers/HallList/HallList"
import HallDetail from "./containers/HallDetail/HallDetail"
import HallAdd from "./containers/HallAdd/HallAdd"
import HallEdit from "./containers/HallEdit/HallEdit"
import Layout from "./components/UI/Layout";
import AuthRoute from "./components/AuthRoute"
import Login from "./containers/Login"
import Logout from "./containers/Logout"


class App extends Component {
    render() {
        return (
            <div className="container">

                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <AuthRoute path="/movies/add" component={MovieAdd}/>
                            <AuthRoute path="/halls/add" component={HallAdd}/>
                            {/* :id обозначает переменную id */}
                            <AuthRoute path="/movies/:id/edit" component={MovieEdit}/>
                            <Route path="/movies/:id" component={MovieDetail}/>
                            <AuthRoute path="/halls/:id/edit" component={HallEdit}/>
                            <Route path="/halls/:id" component={HallDetail}/>
                            <Route path="/halls" component={HallList}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/logout" component={Logout}/>
                            <Route path="/" component={MovieList}/>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
