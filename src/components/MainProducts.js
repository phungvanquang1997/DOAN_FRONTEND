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
import AllProduct from "./AllProduct";
import Search from "./Search";
import Cart from "./Cart";
import Purchase from "./PurchaseHistory";
import BestSeller from "./BestSeller"
import NewProducts from "./NewProducts"
import ProductViewest from "./ProductViewest"
import ProductByNumPage from "./ProductByNumPage";


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
                    <Route exact path='/home/Search/:QueryStr' component={Search}/>
                    <Route exact path='/home/Cart' component={Cart}/>
                    <Route exact path='/home/Purchase' component={Purchase}/>
                    <Route exact path='/home/NewProducts' component={NewProducts}/>
                    <Route exact path='/home/ProductViewest' component={ProductViewest}/>
                    <Route exact path='/home/BestSeller' component={BestSeller}/>
                    <Route exact path="/home/page/:number" component={ProductByNumPage}/>
                    <Route exact path='/home/' component={ProductByNumPage}/>
                    <Route exact path = "/" component ={ProductByNumPage}/>
                </Switch>
            </main>
        )
    }
}

export default Main
