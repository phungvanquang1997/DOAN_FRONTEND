import Header from './Header'
import React, {Component} from 'react';
import Footer from './Footer'
import AdminDashboard from "./AdminDashboard";
import Login from "./login";
import ProductLayout from "./productLayout";
import Register from "./register";
import ListUser from "./ListUser";
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom'
import Admin from "./Admin"
import RouteHome from "./RouteHome"
import LayoutAdmin from "./Layout_Admin"
import LayoutProduct from "./Layout_Product";


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
            <Route exact path="/home/register" component={LayoutProduct}/>
           <Route exact path="/home/login" component={LayoutProduct}/>
            <Route exact path='/admin/roster' component={LayoutAdmin}/>
            <Route exact path='/admin/listUser' component={LayoutAdmin}/>
            <Route exact path='/admin/listUser/:number' component={LayoutAdmin}/>
            <Route exact path='/admin/roster/' component={LayoutAdmin}/>
            <Route exact path='/admin/roster/:number' component={LayoutAdmin}/>
        </Switch>
    );

export default RouteConfig
