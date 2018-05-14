import React from 'react'
import ListUser from './ListUser'
import UserDetail from './UserDetail'
import { Switch, Route } from 'react-router-dom'

const User = () => (
    <Switch>
        <Route exact path='/listUser' component={ListUser}/>
        <Route path='/listUser/:number' component={UserDetail}/>
    </Switch>
)

export default User
