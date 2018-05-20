import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListOrders from './ListOrders'
import OrderDetail from "./OrderDetail";

// The Roster component matches one of two different routes
// depending on the full pathname
const Order = () => (
    <Switch>
        <Route exact path='/admin/order' component={ListOrders}/>
        <Route path='/admin/order/:number' component={OrderDetail}/>
    </Switch>
)


export default Order

