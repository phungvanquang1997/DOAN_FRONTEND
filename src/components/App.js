import Header from './Header'
import Main from './Main'
import Home from './Home'
import React, {Component} from 'react';
import Footer from './Footer'
import AdminDashboard from "./AdminDashboard";
import Login from "./login";
import ProductLayout from "./productLayout";
import Route from "./router";
import Register from "./register"

class App extends Component {

    constructor() {
        super();

    }
    
    render()
    {
        return(
        <div >
                <Route/>
        </div>
        );
    }


}

export default App
