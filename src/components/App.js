import Header from './Header'
import Main from './Main'
import Home from './Home'
import React, {Component} from 'react';
import Footer from './Footer'
import LayoutHeader from "./LayoutHeader";
import Login from "./login";
import ProductLayout from "./productLayout";

class App extends Component {

    constructor() {
        super();

    }
    
    render()
    {
        return(
        <div >
            <ProductLayout/>
            <LayoutHeader/>
        </div>
        );
    }
}

export default App
