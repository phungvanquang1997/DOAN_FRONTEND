import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListProduct from './ListProduct'
import User from './User'
import Login from './login'
import Register from './register';
import ListProductClient from "./ListProductClient";
import ProductByIDProducer from "./ProductByIDProducer";
import ProductDetail from "./ProductDetail";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword"


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }

    render() {
        return (

            <main>
                <Switch>
                    <Route exact path='/home/register' component={Register}/>
                    <Route exact path='/home/login' component={Login}/>
                    <Route exact path='/home/profile' component={Profile}/>
                    <Route exact path='/home/ChangePassword' component={ChangePassword}/>
                    <Route exact path='/home/producer/:number' component={ProductByIDProducer}/>
                    <Route exact path='/home/ProductDetail/:number' component={ProductDetail}/>
                    <Route exact path = "/" component ={ListProductClient}/>
                </Switch>
            </main>
        )
    }
}

export default Main
