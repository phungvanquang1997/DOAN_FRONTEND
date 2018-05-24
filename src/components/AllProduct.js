import React from 'react'
import Header from "./AdminCatologies";
import Main from "./Main";
import ProductCatologies from "./ProductCatologies";
import MainProducts from "./MainProducts";
import { Link } from 'react-router-dom';
import AdminDashboard from "./AdminDashboard";
import Footer from "./Footer"

class allProduct extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            show:true,
            Run:true,
        }
    }
    render(){
        return(
            <div className="top0">

                <div className="bg-light">
                    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                        <Link to ="/" className="navbar-brand col-sm-3 col-md-2 mr-0">Quang's shop</Link>
                        <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                               aria-label="Search"/>
                        <Link to='/home/register' className="nav-link" >
                            <div className="navbar-nav px-2">
                                <button className="btn btn-primary">
                                   Đăng ký
                                </button>
                            </div>
                        </Link>
                        <Link to='/home/login' className="nav-link" >
                            <div className="navbar-nav px-3">
                                <button className="btn btn-primary">
                                    Đăng nhập
                                </button>
                            </div>
                        </Link>
                    </nav>

                    <div className="container-fluid bg-color">
                        <div className="row">
                                <ProductCatologies/>
                            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                                <div
                                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom ">
                                    <h1 className="h2">Dashboard</h1>
                                    <div className="btn-toolbar mb-2 mb-md-0">
                                        <div className="btn-group mr-2">
                                            <button className="btn btn-sm btn-outline-secondary">Share</button>
                                            <button className="btn btn-sm btn-outline-secondary">Export</button>
                                        </div>
                                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                            <span data-feather="calendar"></span>
                                            This week
                                        </button>
                                    </div>
                                </div>


                                <MainProducts/>


                            </main>
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }

}

export default allProduct

