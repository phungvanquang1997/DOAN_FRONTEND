import Header from './Header'
import Main from './Main'
import Home from './Home'
import React, {Component} from 'react';
import Footer from './Footer'
import LayoutHeader from "./LayoutHeader";
class App extends Component {

    constructor() {
        super();

    }
    
    render()
    {
        return(
        <div>
            <LayoutHeader/>

            <Footer/>
        </div>
        );
    }
}

export default App
