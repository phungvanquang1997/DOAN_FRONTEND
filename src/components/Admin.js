
import React, {Component} from 'react';

import AdminDashboard from "./AdminDashboard";


import { Switch, Route } from 'react-router-dom'


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
