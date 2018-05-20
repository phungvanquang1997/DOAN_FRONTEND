import Header from './AdminCatologies'
import Main from './Main'
import ListProduct from './ListProduct'
import React, {Component} from 'react';
import Footer from './Footer'
import AdminDashboard from "./AdminDashboard";
import Login from "./login";
import ProductLayout from "./AllProduct";
import Route from "./router";
import Register from "./register"
import Error from "./Error"

class App extends Component {

    constructor() {
        super();

    }
    
    render()
    {
        var token = window.localStorage.getItem('access_token');
        return(
            <div >
                    <Route/>
                    {/*{token ? <Footer/> : null}*/}
            </div>
            )
    }


}

export default App
