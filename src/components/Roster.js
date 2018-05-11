import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListOrders from './ListOrders'
import Player from './Player'
import OrderDetail from "./OrderDetail";

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (
    <Switch>
        <Route exact path='/roster' component={ListOrders}/>
        <Route path='/roster/:number' component={OrderDetail}/>
    </Switch>
)


export default Roster

