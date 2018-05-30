import React from 'react'
import Header from "./AdminCatologies";
import Main from "./Main";
import { Link } from 'react-router-dom';
import Error from "./Error"
import Footer from "./Footer";

class AdminDashboard extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            clicked : 0
        }
    }

    SignOut()
    {
        window.localStorage.clear();
/*        window.localStorage.removeItem("permission");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("access_token"); // remove token là access token*/
        document.location.href = "http://localhost:3000/"; // chuyển về trang index

    }

/*    componnentDidMount()
    {var
    }*/

    render(){
        var token = window.localStorage.getItem('access_token');
        var permission = window.localStorage.getItem('permission');

        if(!token)
        {
            return(
                <Error/>
            )
        }
        if(permission==0)
        {
            return(
                <div>
                    <div className="text-center bold size24 fontcolor">
                        Bạn không có quyền truy cập vào trang này !!!

                    </div>
                    <Link to ='/' className="text-center">Back</Link>
                </div>
            )
        }
        else
        {
        return(
            <div className="top0">
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <Link to='/' className="navbar-brand col-sm-3 col-md-2 mr-0">Quang's shop</Link>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                   aria-label="Search"/>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link btn" onClick={this.SignOut.bind(this)}>Sign out</a>

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

                        <Main/>


                </main>
            </div>
        </div>
                <Footer/>
            </div>

        )};
    }

}

export default AdminDashboard

