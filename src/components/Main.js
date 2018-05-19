import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Roster from './Roster'
import User from './User'
import ProductLayout from "./productLayout";
import OrderDetail from "./OrderDetail";
import Admin from "./Admin";
import LayoutAdmin from "./Layout_Admin"
import UserDetail from "./UserDetail";
import ListUser from "./ListUser";
import ListOrders from "./ListOrders";
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/admin/' component={Home}/>
 {/*     <Route exact path='/admin/roster' component={Roster}/>*/}
    {/*  <Route exact path='/admin/listUser' component={User}/>*/}
           {/* Để main có thể route tới , không switch lồng switch dc*/}
        <Route exact path='/admin/roster' component={ListOrders}/>
        <Route path='/admin/roster/:number' component={OrderDetail}/>

        <Route exact path='/admin/listUser' component={ListUser}/>
        <Route exact path='/admin/listUser/:number' component={UserDetail}/>

    </Switch>
  </main>
)

export default Main
