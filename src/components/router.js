import React, {Component} from 'react';
import AdminDashboard from "./AdminDashboard";
import { Switch, Route } from 'react-router-dom'
import RouteError from "./RouteError";
import AllProduct from "./AllProduct";
import BestSeller from "./BestSeller";




const  RouteConfig =() =>
    (
        <Switch>
            <Route exact path='/' component={AllProduct}/>
            <Route exact path="/home/register" component={AllProduct}/>
            <Route exact path="/home/login" component={AllProduct}/>
            <Route exact path="/home/page/:number" component={AllProduct}/>
            <Route exact path="/home/producer/:number" component={AllProduct}/>
            <Route exact path='/home/ProductDetail/:number' component={AllProduct}/>
            <Route exact path='/home/profile' component={AllProduct}/>
            <Route exact path='/home/ChangePassword' component={AllProduct}/>
            <Route exact path='/home/Search/:QueryStr' component={AllProduct}/>
            <Route exact path='/home/Cart' component={AllProduct}/>
            <Route exact path='/home/Purchase' component={AllProduct}/>
            <Route exact path='/home/NewProducts' component={AllProduct}/>
            <Route exact path='/home/ProductViewest' component={AllProduct}/>
            <Route exact path='/home/BestSeller' component={AllProduct}/>
            <Route exact path='/home/' component={AllProduct}/>


            <Route exact path='/admin/listUser' component={AdminDashboard}/>
            <Route exact path='/admin/listUser/:number' component={AdminDashboard}/>
            <Route exact path='/admin/Selltop10' component={AdminDashboard}/>
            <Route exact path='/admin/order/' component={AdminDashboard}/>
            <Route exact path='/admin/order/:number' component={AdminDashboard}/>

            <Route exact path='/admin/producer/' component={AdminDashboard}/>
            <Route exact path='/admin' component={AdminDashboard}/>


            <Route component ={RouteError}/>
        </Switch>
    );

export default RouteConfig
