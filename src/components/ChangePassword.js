import React from 'react'
import { Link } from 'react-router-dom'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
class ChangePassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listUser: [],
            error: false,
            isLoaded: false,
            list: [],
            isHidden: "hidden",
            value: "",
            ErrPassword: "hidden",
            ErrPassword1: "hidden",
            ErrPassword2: "hidden",
            ErrPassword3: "hidden",
            UserName: "",
            Password: "",

        }
        this.reload = this.reload.bind(this);

        this.handlerChangePassword = this.handlerChangePassword.bind(this);

    }

    handlerChangePassword(event) {
        this.setState({
            Password : event.target.value,
        });
    }

    handlerUpdate()
    {
        var token = window.localStorage.getItem('access_token');
        var flag = true;
        console.log(this.state.UserName+"----"+this.f_oldPassword.value);
        var url = "http://localhost:3001/api/users/CheckPassword/";

            fetch(url, {
                async: true,
                crossDomain: true,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "bearer " + token.toString(),
                },
                mode: 'cors',
                body: JSON.stringify({
                    f_Username: this.state.UserName,
                    f_Password: this.f_oldPassword.value,
                }),
            }).then(res => res.json())
                .then((rs) => {
                        console.log(rs[0].ok);
                        if (parseInt(rs[0].ok) === 0) {
                            this.setState({ErrPassword3: "visible"});
                            flag = false;
                        }
                    }
                )
            if(flag===false) {
                return;
            }

          if(this.f_newPassword.value.length <= 5)
            {
                flag = false;
                this.setState({ErrPassword:"visible"});
                return;
            }


            if(this.f_newPassword.value == null || this.f_newPassword.value === "")
            {
                flag = false;
                this.setState({ErrPassword1:"visible"});
                return;
            }
            if(this.f_newPassword.value !== this.f_rePassword.value)
            {
                flag = false;
                this.setState({ErrPassword2:"visible"});
                return;
            }





        if(flag) {
            this.setState({
                ErrUserName : "hidden",
                ErrPassword : "hidden",
                ErrPassword1 : "hidden",
                ErrPassword2 : "hidden",
                ErrPassword3 : "hidden"
            });

            var f_id = window.localStorage.getItem('uid');
            var url = "http://localhost:3001/api/users/UpdatePassword/";
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "bearer " + token.toString(),
                },
                body: JSON.stringify({
                    f_ID: f_id,
                    f_Password : this.f_newPassword.value,
                }),
            }).then(()=>this.setState({isHidden: 'visible'}));
        }
        this.f_oldPassword.value = this.f_rePassword.value = this.f_newPassword = null;
    }

    reload()
    {
        var token = window.localStorage.getItem('access_token');
        var ID = parseInt(this.props.match.params.number, 10);
        var url = "http://localhost:3001/api/users/users/"+ID;

        fetch(url, {
            mode: "cors",
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result,

                    });
                    console.log(result)
                },

                (error) => {
                    console.log("error cmnr");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount()
    {
        var token = window.localStorage.getItem('access_token');

        var f_id = window.localStorage.getItem('uid'); // lấy id người dùng từ localStorage
        var url = "http://localhost:3001/api/users/users/"+f_id;
        this.setState({
            isLoaded: true,
            UserName :  window.localStorage.getItem('username')
        });


    }


    render() {

        const {error, isLoaded, list} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else {
            return (
                <div>
                    <div className="col-md-3">
                    </div>

                    <div className="col-md-5 col">
                        <h3 className="text-center fontcolor">Đổi mật khẩu</h3>
                            <div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Tên đăng nhập</label>
                                    <input readOnly type="text" className="form-control"   value={this.state.UserName} id="txtTenDangNhap" name="txtTenDangNhap"
                                           placeholder="PhungVanQuang"/>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="txtPassword">Password cũ</label>
                                    <input type="password" className="form-control" ref={input=>this.f_oldPassword = input} id="txtPassword" name="txtPassword"
                                           placeholder="******"/>
                                </div>

                                <div className={this.state.ErrPassword3} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Mật khẩu hiện tại của bạn nhập không chính xác !!</strong>.
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="txtPassword">Password mới</label>
                                    <input type="password" className="form-control" ref={input=>this.f_newPassword = input} id="txtPassword" name="txtPassword"
                                           placeholder="******"/>
                                </div>

                                <div className={this.state.ErrPassword} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Mật khẩu của bạn phải hơn 5 kí tự !</strong>.
                                    </div>
                                </div>
                                <div className={this.state.ErrPassword1} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Password của bạn không được để trống !</strong>.
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="txtPassword">Nhập lại password</label>
                                    <input type="password" className="form-control" ref={input=>this.f_rePassword = input} id="txtPassword" name="txtPassword"
                                           placeholder="******"/>
                                </div>
                                <div className={this.state.ErrPassword2} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Mật khẩu không trùng khớp , vui lòng nhập lại !!</strong>.
                                    </div>
                                </div>


                            </div>
                        <Link to='/' className="btn btn-primary"><span className="fas fa-backward"></span></Link>
                        <button type="button" className="btn btn-success" onClick={this.handlerUpdate.bind(this)}
                        >Đổi mật khẩu
                        </button>


                        <div className={this.state.isHidden} id="pdtop20">
                            <div className="alert alert-success" id="ThongBao" role="alert">
                                <strong>Đổi mật khẩu thành công!</strong>.
                            </div>
                        </div>
                    </div>


                </div>
            )
        }
    }
}



export default ChangePassword
