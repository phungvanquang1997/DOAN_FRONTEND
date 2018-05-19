import React from 'react'
import ProductHeader from "./ProductHeader";
import ProductLayout from "./productLayout"
import Register from "./register"

class  LayoutProduct extends React.Component {

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
                <ProductLayout/>
            </React.Fragment>
        )
    }

}

export default  LayoutProduct
