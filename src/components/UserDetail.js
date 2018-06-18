import React from 'react'
import { Link } from 'react-router-dom'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
class UserDetail extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            listUser : [],
            error: false,
            isLoaded: false,
            list: [],
            isHidden : "hidden",
            value: "",
            ErrUserName : "hidden",
            ErrPassword : "hidden",
            ErrName : "hidden",
            ErrSDT : "hidden",
            ErrEmail : "hidden",
            ErrDiaChi : "hidden",
            ErrUserName1 : "hidden",
            ErrPassword1 : "hidden",
            ErrPassword2 : "hidden",
            ErrName1 : "hidden",
            ErrSDT1 : "hidden",
            ErrEmail1 : "hidden",
            Name : "",
            UserName :"",
            Password: "",
            SDT : "",
            DiaChi : "",
            Email : "",
        }
        this.reload = this.reload.bind(this);
        this.handlerChangeName = this.handlerChangeName.bind(this);
        this.handleChangeUserName= this.handleChangeUserName.bind(this);
        this.handlerChangePassword = this.handlerChangePassword.bind(this);
        this.handlerChangeDiaChi=this.handlerChangeDiaChi.bind(this);
        this.handlerChangeEmail = this.handlerChangeEmail.bind(this);
        this.handlerChangeSDT = this.handlerChangeSDT.bind(this);
    }

    handleChangeUserName(event) {
        this.setState({UserName: event.target.value});
    }

    handlerChangeName(event) {
        this.setState({
            Name : event.target.value,
        });
    }
    handlerChangePassword(event) {
        this.setState({
            Password : event.target.value,
        });
    }
    handlerChangeSDT(event) {
        this.setState({
            SDT : event.target.value,
        });
    }
    handlerChangeDiaChi(event) {
        this.setState({
            DiaChi : event.target.value,
        });
    }

    handlerChangeEmail(event) {
        this.setState({
            Email : event.target.value,
        });
    }


    handlerUpdate()
    {
        var token = window.localStorage.getItem('access_token');
        var flag = true;
        if(this.f_Username.value.length <= 6)
        {
            flag = false;
            this.setState({ErrUserName:"visible"});
            return;
        }
        if(this.f_Username.value == null || this.f_Username.value === "")
        {
            flag = false;
            this.setState({ErrUserName1:"visible"});
            return;
        }



        if(this.f_Name.value.length <= 10)
        {
            flag = false;
            this.setState({ErrName:"visible"});
            return;
        }
        if(this.f_Name.value == null || this.f_Name.value === "")
        {
            flag = false;
            this.setState({ErrName1:"visible"});
            return;
        }



    /*    if(this.f_Password.value.length <= 5)
        {
            flag = false;
            this.setState({ErrPassword:"visible"});
        }


        if(this.f_Password.value == null || this.f_Password.value === "")
        {
            flag = false;
            this.setState({ErrPassword1:"visible"});
        }
        if(this.f_Password.value !== this.f_rePassword.value)
        {
            flag = false;
            this.setState({ErrPassword2:"visible"});
        }*/

        if(this.f_SDT.value === "" || this.f_SDT.value == null)
        {
            flag = false;
            this.setState({ErrSDT1:"visible"});
            return;
        }
        if((isNaN(this.f_SDT.value))) // k phải số
        {
            flag = false;
            this.setState({ErrSDT:"visible"});
            return;
        }


        if(this.f_DiaChi.value === "" || this.f_DiaChi.value == null)
        {
            flag = false;
            this.setState({ErrDiaChi:"visible"});
            return;
        }


        if(this.f_Email.value === "" || this.f_Email.value == null)
        {
            flag = false;
            this.setState({ErrEmail1:"visible"});
            return;
        }
        if(!this.f_Email.value.includes("@gmail.com","@yahoo.com","@yahoo.com.vn"))
        {
            flag = false;
            this.setState({ErrEmail:"visible"});
            return;
        }




        if(flag) {
            this.setState({
                ErrUserName : "hidden",
                ErrPassword : "hidden",
                ErrName : "hidden",
                ErrSDT : "hidden",
                ErrEmail : "hidden",
                ErrDiaChi : "hidden",
                ErrUserName1 : "hidden",
                ErrPassword1 : "hidden",
                ErrPassword2 : "hidden",
                ErrName1 : "hidden",
                ErrSDT1 : "hidden",
                ErrEmail1 : "hidden",
            });
            this.setState({isHidden: 'visible'});
            var id = this.props.match.params.number;
            var url = "http://localhost:3001/api/users/users/" + id;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "bearer " + token.toString(),
                },
                body: JSON.stringify({
                    UserID: id,
                    f_Username : this.f_Username.value,
                    f_Permission : this.valueSelect.value,
               /*  f_Password : this.f_Password.value,*/
                    f_Name : this.f_Name.value,
                   f_Email : this.f_Email.value,

                    f_DiaChi : this.f_DiaChi.value,
                    f_SDT : this.f_SDT.value,
                }),
            }).then(() => this.reload());
        }

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
                        Name: result[0].f_Name,
                        UserName : result[0].f_Username,
                        Password:result[0].f_Password,
                        SDT:result[0].f_SDT,
                        Email:result[0].f_Email,
                        DiaChi : result[0].f_DiaChi

                    });
       /*             this.GetUserDetail();  //lấy thông tin user*/
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


    render() {

        const {error, isLoaded, list} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else {
            for (var i = 0 ; i < list.length ; i++)
            {
                if(list[i].f_Permission === 0)
                {
                    list[i].f_Permission = "Thành viên";
                }
                else
                    list[i].f_Permission = "Quản trị viên";
            }
            return (
                <div>
                    <div className="col-md-3">
                    </div>

                    <div className="col-md-5 col">
                        <h3 className="text-center fontcolor">Thông tin thành viên</h3>
                        {list.map(item=>(
                        <div>
                                <div className="form-group">
                                    <label htmlFor="txtHoTen">Họ tên</label>
                                    <input type="text"  ref={input=>this.f_Name = input}  value={this.state.Name}  onChange={this.handlerChangeName.bind(this)} className="form-control" id="txtHoTen" name="txtHoTen"/>
                                </div>
                                <div className={this.state.ErrName} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Họ tên của bạn phải hơn 10 kí tự !</strong>.
                                    </div>
                                </div>

                                <div className={this.state.ErrName1} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Họ tên của bạn không được để trống !</strong>.
                                    </div>
                                </div>




                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Tên đăng nhập</label>
                                    <input type="text" className="form-control" onChange={this.handleChangeUserName.bind(this)} ref={input=>this.f_Username = input}  value={this.state.UserName} id="txtTenDangNhap" name="txtTenDangNhap"
                                           placeholder="PhungVanQuang"/>
                                </div>


                                <div className={this.state.ErrUserName} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Tên đăng nhập phải hơn 5 kí tự !</strong>.
                                    </div>
                                </div>
                                <div className={this.state.ErrUserName1} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Username của bạn không được để trống !</strong>.
                                    </div>
                                </div>



{/*

                                <div className="form-group">
                                    <label htmlFor="txtPassword">Password</label>
                                    <input type="password" className="form-control" ref={input=>this.f_Password = input} id="txtPassword" name="txtPassword"
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
                                <div className={this.state.ErrPassword} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Mật khẩu của bạn phải hơn 5 kí tự !</strong>.
                                    </div>
                                </div>
                                <div className={this.state.ErrPassword2} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Mật khẩu không trùng khớp , vui lòng nhập lại !!</strong>.
                                    </div>
                                </div>
*/}



                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                                    <input type="email" className="form-control" onChange={this.handlerChangeSDT.bind(this)}  value={this.state.SDT} ref={input=>this.f_SDT = input}id="txtSDT" aria-describedby="emailHelp" name="Email"
                                           placeholder="Nhập số điện thoại của bạn"/>
                                </div>
                                <div className={this.state.ErrSDT} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Số điện thoại của bạn sai định dạng !!</strong>.
                                    </div>
                                </div>
                                <div className={this.state.ErrSDT1} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Số điện thoại của bạn không được để trống !</strong>.
                                    </div>
                                </div>





                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Địa chỉ</label>
                                    <input type="text" className="form-control" onChange={this.handlerChangeDiaChi.bind(this)} value={this.state.DiaChi} ref={input=>this.f_DiaChi = input} id="txtDiaChi" name="txtDiaChi"
                                           placeholder="Nguyễn Văn Cừ"/>
                                </div>

                                <div className={this.state.ErrDiaChi} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Địa chỉ của bạn không được để trống !</strong>.
                                    </div>
                                </div>





                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" onChange={this.handlerChangeEmail.bind(this)} value={this.state.Email} ref={input=>this.f_Email = input}id="txtEmail" aria-describedby="emailHelp" name="Email"
                                           placeholder="Enter email"/>
                                </div>
                                <div className={this.state.ErrEmail} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Email bạn nhập sai format !</strong>.
                                    </div>
                                </div>
                                <div className={this.state.ErrEmail1} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Email của bạn không được để trống !</strong>.
                                    </div>
                                </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Cấp nhật quyền hạn :  </label>
                                        {/*<input type="text" className="form-control text-center" readOnly   value={item.f_Permission}/>*/}
                                        <select ref={select => this.valueSelect = select} className="h40 text-center">
                                            <option value="0">Thành viên</option>
                                            <option value="1">Quản trị viên</option>
                                        </select>
                                    </div>
                        </div>
                        ))}
                        <Link to='/admin/listUser' className="btn btn-primary">Back</Link>
                        <button type="button" className="btn btn-success" onClick={this.handlerUpdate.bind(this)}
                        >Cập nhật
                        </button>



                        <div className={this.state.isHidden} id="pdtop20">
                            <div className="alert alert-success" id="ThongBao" role="alert">
                                <strong>Cập nhật quyền hạn thành công!</strong>.
                            </div>
                        </div>
                    </div>


                </div>
            )
        }
    }
}



export default UserDetail
