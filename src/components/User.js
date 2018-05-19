import React from 'react'
import ListUser from './ListUser'
import UserDetail from './UserDetail'
import { Switch, Route } from 'react-router-dom'

const User = () => (
    <Switch>
        <Route exact path='/admin/listUser' component={ListUser}/>
        <Route exact path='/admin/listUser/:number' component={UserDetail}/>
    </Switch>
)

export default User
