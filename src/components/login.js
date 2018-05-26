import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import ProductCatologies from "./ProductCatologies";
import Productlayout from "./AllProduct";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            access : null,
            isHidden: "hidden",
        }
    }


    handlerSingin()
    {
        var token;

        var url = "http://localhost:3001/login/login";
        fetch(url,{
            body: JSON.stringify({
                ID: this.username.value,
                password : this.password.value,
            }),
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
        }).then((rs)=>rs.json()).then((rs1)=>{
            if(rs1.err)
            {
                this.setState({isHidden:"visible"});
            }
            else {
                window.localStorage.setItem('access_token', rs1.token);
                token = window.localStorage.getItem('access_token');

                window.localStorage.setItem('username', this.username.value); // lưu cho trang index load được đã đăng nhập hay chưa

                this.sendToken(token);

            }
        });



    }



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
               },
          }).then(res => res.json())
             .then(
                 (result) => {
                     this.setState({
                         access: result.isAdmin // nhận đc res từ /secret
                     });

                     window.localStorage.setItem('permission', result.isAdmin);
                     window.localStorage.setItem('uid', result.uid);
                     if(this.state.access !== null)
                     {
                         document.location.href = "http://localhost:3000/";
                     }
                 },
                 );


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
                                <input type="text" className="form-control" ref={input => this.username = input} name="username" placeholder="Username"
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
                        <div className={this.state.isHidden} id="pdtop20">
                            <div className="alert alert-danger" id="ThongBao" role="alert">
                                <strong>Tên đăng nhập hoặc mật khẩu không đúng !!</strong>.
                            </div>
                        </div>
                        <Link to ="/admin">
                            <span className="color-red"> (Demo) </span>
                            <p> Go to admin ! Check if you don't have a token</p>
                        </Link>
                    </div>



                    <div className="hint-text small">Don't have an account? <a href="#" className="text-success">Register
                        Now!</a>
                    </div>
                </div>
            </div>
        )};
}

export default Login