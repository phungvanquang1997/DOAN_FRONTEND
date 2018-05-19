import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Roster from './Roster'
import User from './User'
import ProductLayout from "./productLayout";
import OrderDetail from "./OrderDetail";

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/admin/' component={Home}/>
      <Route exact path='/admin/roster' component={Roster}/>
      <Route exact path='/admin/listUser' component={User}/>

    </Switch>
  </main>
)

export default Main
