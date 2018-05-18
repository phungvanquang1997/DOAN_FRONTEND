import React from 'react'
import OrderDetail from "./OrderDetail";
import { Switch, Route } from 'react-router-dom'

var ReactDOM = require('react-dom');

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            access : "",
        }
    }


    handlerSingin()
    {

        var url = "http://localhost:3001/login/login";
        fetch(url,{
            body: JSON.stringify({
                ID: this.ID.value,
                password : this.password.value,
            }),
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
        }).then((rs)=>rs.json()).then((rs)=>{
            window.localStorage.setItem('access_token', rs.token);
        });

        var token = window.localStorage.getItem('access_token');
        this.sendToken(token);

        /*ReactDOM.unmountComponentAtNode(document.getElementById("quang"));*/
    }
/*
    getToken()
    {
       var data = {"name":"admin","password":"123456"};
       var url = "http://localhost:3001/login/login";
        fetch(url,{
            body: JSON.stringify(data),
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
        }).then((rs)=>rs.json()).then((rs)=>{
            window.localStorage.setItem('access_token', rs.token);
        });

        var token = window.localStorage.getItem('access_token');
        console.log(token);
    }*/


    sendToken(token)
    {
        var token = window.localStorage.getItem('access_token');
        var url = "http://localhost:3001/login/secret";
         fetch(url,{
             "async": true,
             "method": "GET",
             "headers": {
                 "Authorization": "bearer"+token.toString(),
                 "Cache-Control": "no-cache",
                 "Postman-Token": "32d031bc-43e9-4771-bcc9-acb5b7b0b737"},
          }).then(res => res.json())
             .then(
                 (result) => {
                     this.setState({
                         access: result // nhận đc res từ /secret
                     });
                     console.log(result)
                 });
    }


    render()
    {
        return(
            <div className="bg-img">

                <div className="login-form" >
                    <div className="bg-form">
                        <h2 className="text-center">Sign in</h2>
                        <div className="text-center social-btn">
                            <a href="#" className="btn btn-primary btn-block"><i className="fa fa-facebook"></i> Sign in
                                with <b>Facebook</b></a>
                            <a href="#" className="btn btn-info btn-block"><i className="fa fa-twitter"></i> Sign in
                                with <b>Twitter</b></a>
                            <a href="#" className="btn btn-danger btn-block"><i className="fa fa-google"></i> Sign in
                                with <b>Google</b></a>
                        </div>
                        <div className="or-seperator"><i>or</i></div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control" ref={input => this.ID = input} name="username" placeholder="Username"
                                       required="required"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <input type="password" className="form-control" ref={input => this.password = input} name="password" placeholder="Password"
                                       required="required"/>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-success btn-block login-btn" onClick={this.handlerSingin.bind(this)}>Sign in</button>
                        </div>
                        <div className="clearfix">
                            <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label>
                            <a href="#" className="pull-right text-success">Forgot Password?</a>
                        </div>
                    </div>


                    <div className="hint-text small">Don't have an account? <a href="#" className="text-success">Register
                        Now!</a>
                    </div>
                </div>
            </div>
        )};
}

export default login