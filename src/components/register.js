import React from 'react'
const min = 1;
const max = 100;
const rand = parseInt(min + Math.random() * (max - min));
const min1 = 1;
const max1 = 100;
const rand1 = parseInt(min1 + Math.random() * (max1 - min1));


class register extends React.Component {

    constructor(props) {
        super(props);
        this.state=({
            isHidden : "hidden",
            ErrUserName : "hidden",
            ErrPassword : "hidden",
            ErrName : "hidden",
            ErrSDT : "hidden",
            ErrEmail : "hidden",
            ErrDiaChi : "hidden",
            ErrUserName1 : "hidden",
            ErrUserName2 : "hidden",
            ErrPassword1 : "hidden",
            ErrPassword2 : "hidden",
            ErrName1 : "hidden",
            ErrSDT1 : "hidden",
            ErrEmail1 : "hidden",
            Errcaptcha : "hidden",
            randomNumA : rand,
            randomNumB : rand1,

        })
        this.CheckWhiteSpace = this.CheckWhiteSpace.bind(this);
    }


    CheckWhiteSpace(str)
    {
        for(let i = 0 ; i < str.length ; i++)
        {
            if(str[i]=== " ")
            {
                return 1; // có khoảng trắng
            }
        }
        return 0;
    }

    handlerRegister()
    {

        var d = new Date();
        var Now = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();
        var flag = true;

        if(this.f_Username.value.length <= 6)
        {
            flag = false;
            this.setState({ErrUserName:"visible"});
        }
        if(this.f_Username.value == null || this.f_Username.value === "")
        {
            flag = false;
            this.setState({ErrUserName1:"visible"});
        }

      if(this.CheckWhiteSpace(this.f_Username.value))
        {
            console.log("hahahaha")
            flag = false;
            this.setState({ErrUserName2:"visible"});
        }


        if(this.f_Name.value.length <= 10)
        {
            flag = false;
            this.setState({ErrName:"visible"});
        }
        if(this.f_Name.value == null || this.f_Name.value === "")
        {
            flag = false;
            this.setState({ErrName1:"visible"});
        }




        if(this.f_Password.value.length <= 5)
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
        }

        if(this.f_SDT.value === "" || this.f_SDT.value == null)
        {
            flag = false;
            this.setState({ErrSDT1:"visible"});
        }
        if((isNaN(this.f_SDT.value))) // k phải số
        {
            flag = false;
            this.setState({ErrSDT:"visible"});
        }



        if(this.f_DiaChi.value === "" || this.f_DiaChi.value == null)
        {
            flag = false;
            this.setState({ErrDiaChi:"visible"});
        }


        if(this.f_Email.value === "" || this.f_Email.value == null)
        {
            flag = false;
            this.setState({ErrEmail1:"visible"});
        }
        if(!this.f_Email.value.includes("@gmail.com","@yahoo.com","@yahoo.com.vn"))
        {
            flag = false;
            this.setState({ErrEmail:"visible"});
        }

        if(this.Captcha.value != parseInt(this.state.randomNumA + this.state.randomNumB))
        {
            flag = false;
            this.setState({Errcaptcha:"visible"});
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
                ErrUserName2 : "hidden",
                ErrName1 : "hidden",
                ErrSDT1 : "hidden",
                ErrEmail1 : "hidden",
                Errcaptcha : "hidden"
            });

            fetch("http://localhost:3001/api/users/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    f_Username: this.f_Username.value,
                    f_Password: this.f_Password.value,
                    f_Name: this.f_Name.value,
                    f_Email: this.f_Email.value,
                    f_Permission: "0",
                    f_NgayTaoTK: Now,
                    f_DiaChi: this.f_DiaChi.value,
                    f_SDT: this.f_SDT.value,
                })
            }).then(console.log("Created"));
            this.setState({isHidden:'visible'});
        }

        this.Captcha.value = this.f_rePassword.value = this.f_SDT.value = this.f_Username.value =  this.f_Password.value = this.f_Name.value = this.f_Email.value = this.f_DiaChi.value = null;

    }


    render()
    {
        return(
            <div >
                <div className="col-md-3">
                </div>

                <div className="col-md-5 col">
                    <h3 className="text-center fontcolor">Đăng ký thành viên</h3>
                        <div className="form-group">
                            <label htmlFor="txtHoTen">Họ tên</label>
                            <input type="text"  ref={input=>this.f_Name = input}   className="form-control" id="txtHoTen" name="txtHoTen"/>

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
                            <input type="text" className="form-control" ref={input=>this.f_Username = input} id="txtTenDangNhap" name="txtTenDangNhap"
                                   placeholder="PhungVanQuang"/>
                        </div>

                      <div className={this.state.ErrUserName2} id="pdtop20">
                        <div className="alert alert-danger" id="ThongBao" role="alert">
                            <strong>Tên đăng nhập không được chứa khoảng trắng !</strong>.
                        </div>
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
                            <input type="password" className="form-control" ref={input=>this.f_rePassword = input} name="txtPassword"
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






                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                            <input type="email" className="form-control" ref={input=>this.f_SDT = input} id="txtSDT" aria-describedby="emailHelp" name="Email"
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
                            <input type="text" className="form-control" ref={input=>this.f_DiaChi = input} id="txtDiaChi" name="txtDiaChi"
                                   placeholder="Nguyễn Văn Cừ"/>
                        </div>

                        <div className={this.state.ErrDiaChi} id="pdtop20">
                            <div className="alert alert-danger" id="ThongBao" role="alert">
                                <strong>Địa chỉ của bạn không được để trống !</strong>.
                            </div>
                        </div>





                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" ref={input=>this.f_Email = input} id="txtEmail" aria-describedby="emailHelp" name="Email"
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
                            <label htmlFor="abc"><b className="bold">Captcha</b> : {this.state.randomNumA} + {this.state.randomNumB} = ? <span>Chỉ nhập số </span></label>
                            <input type="abc" className="form-control" ref={input=>this.Captcha = input}  aria-describedby="abc" name="abc"
                                   placeholder="VD : 1 + 2 = 3"/>
                        </div>

                        <div className={this.state.Errcaptcha} id="pdtop20">
                            <div className="alert alert-danger" id="ThongBao" role="alert">
                                <strong>Captcha bạn vừa nhập không đúng !!</strong>.
                            </div>
                        </div>



                    {/*     <div className="form-group">
                        <label htmlFor="txtUserInput">Captcha</label>
                        <input type="text" className="form-control" id="txtUserInput" name="txtUserInput"/>
                    </div>*/}


                    <div className={this.state.isHidden} id="pdtop20">
                        <div className="alert alert-success" id="ThongBao" role="alert">
                            <strong>Đăng ký thành công!</strong>.
                        </div>
                    </div>



                    <br/>

                    <div>
                        <button onClick={this.handlerRegister.bind(this)} className="btn btn-success btn-block " name="btnRegister">
                            <span className="glyphicon glyphicon-user"></span>
                            Đăng kí
                        </button>
                    </div>
                </div>
            </div>
        )
    }


}

export default  register
