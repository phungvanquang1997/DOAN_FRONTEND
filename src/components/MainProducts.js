import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Roster from './Roster'
import User from './User'
import login from './login'
import Register from './register';
const Main = () => (
    <main>
        <Switch>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={login}/>
        </Switch>
    </main>
)

export default Main
