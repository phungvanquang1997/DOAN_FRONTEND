import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Roster from './Roster'
import User from './User'
import Login from './login'
import Register from './register';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }

    render() {
        return (

            <main>
                <Switch>
                    <Route path='/home/register' component={Register}/>
                    <Route path='/home/login' component={Login}/>
                </Switch>
            </main>
        )
    }
}

export default Main
