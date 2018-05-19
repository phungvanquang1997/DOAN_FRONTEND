import React from 'react'
import ProductHeader from "./ProductHeader";
import ProductLayout from "./productLayout"
import Register from "./register"
import Login from "./login";
import AdminDashboard from "./AdminDashboard";

class LayoutAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            isHidden : "hidden"
        }

    }


    render()
    {
        return(
            <React.Fragment>
                <AdminDashboard/>
            </React.Fragment>
        )
    }

}

export default  LayoutAdmin
