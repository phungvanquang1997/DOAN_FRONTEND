import React from 'react'
import Header from "./Header";
import Main from "./Main";



class LayoutHeader extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            clicked : 0
        }
    }

    render(){
        return(
            <div>
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Quang's shop</a>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                   aria-label="Search"/>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="#">Sign out</a>
                    </li>
                </ul>
        </nav>

        <div className="container-fluid">
            <div className="row">

                <Header/>

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div
                        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
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

                  {/*  Điều hướng Home với Fullroster*/}
                        <Main/>


                </main>
            </div>
        </div>
            </div>
        );
    }

}

export default LayoutHeader

