
import React, {Component} from 'react';
import AdminDashboard from "./AdminDashboard";
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom'
import Admin from "./Admin"
import RouteHome from "./RouteHome"
import RouteError from "./RouteError";
import AllProduct from "./AllProduct";
import Producer from "./ProductByIDProducer"
import Cart from "./Cart";

const Index = () =>
    (
        <div>
            <Link to = "/admin">
                    admin
            </Link>
                <br/>
            <Link to = "/home">
                    home
            </Link>
        </div>
    )

const  RouteConfig =() =>
    (
        <Switch>
           {/* <Route exact path = "/" component={Index}/>*/}
            <Route exact path='/admin' component={Admin}/>
            <Route exact path='/' component={RouteHome}/>
            {/*gọi layout*/}
            <Route exact path="/home/register" component={AllProduct}/>
           <Route exact path="/home/login" component={AllProduct}/>
            <Route exact path="/home/producer/:number" component={AllProduct}/>
            <Route exact path='/home/ProductDetail/:number' component={AllProduct}/>
            <Route exact path='/home/profile' component={AllProduct}/>
            <Route exact path='/home/ChangePassword' component={AllProduct}/>
            <Route exact path='/home/Search/:QueryStr' component={AllProduct}/>
            <Route exact path='/home/Cart' component={AllProduct}/>
            <Route exact path='/home/Purchase' component={AllProduct}/>


            <Route exact path='/admin/listUser' component={AdminDashboard}/>
            <Route exact path='/admin/listUser/:number' component={AdminDashboard}/>

            <Route exact path='/admin/order/' component={AdminDashboard}/>
            <Route exact path='/admin/order/:number' component={AdminDashboard}/>

            <Route exact path='/admin/producer/' component={AdminDashboard}/>



            <Route component ={RouteError}></Route>
        </Switch>
    );

export default RouteConfig
