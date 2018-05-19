import Header from './Header'
import Main from './Main'
import Home from './Home'
import React, {Component} from 'react';
import Footer from './Footer'
import AdminDashboard from "./AdminDashboard";
import Login from "./login";
import ProductLayout from "./productLayout";
import Register from "./register";
import ListUser from "./ListUser";
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom'
import User from "./User";
import Roster from "./Roster";
import UserDetail from "./UserDetail";
import ListOrders from "./ListOrders";
import OrderDetail from "./OrderDetail";


const  Admin =() =>
    (
        <Switch>
            <Route exact path = "/admin" component={AdminDashboard}/>
         {/*   <Route exact path='/admin/roster' component={Roster}/>
            <Route exact path='/admin/roster' component={ListOrders}/>
            <Route path='/admin/roster/:number' component={OrderDetail}/>


            <Route exact path='/admin/listUser' component={User}/>
            <Route exact path='/admin/listUser' component={ListUser}/>
            <Route exact path='/admin/listUser/:number' component={UserDetail}/>*/}

        </Switch>
    );
export default Admin
