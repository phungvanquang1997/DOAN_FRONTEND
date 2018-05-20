import React from 'react'


class register extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            isHidden : "hidden"
        }

    }

    handlerRegister()
    {

        var d = new Date();
        var Now = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();
        fetch("http://localhost:3001/api/users/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                f_Username : this.f_Username.value,
                f_Password : this.f_Password.value,
                f_Name : this.f_Name.value,
                f_Email : this.f_Email.value,
                f_Permission : "0",
                f_NgayTaoTK : Now,
                f_DiaChi : this.f_DiaChi.value,
                f_Admin : "0",
            })
        }).then(console.log("Created"));
        this.setState({isHidden:'visible'});

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


                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Tên đăng nhập</label>
                        <input type="text" className="form-control" ref={input=>this.f_Username = input} id="txtTenDangNhap" name="txtTenDangNhap"
                               placeholder="PhungVanQuang"/>
                    </div>


                    <div className="form-group">
                        <label htmlFor="txtPassword">Password</label>
                        <input type="password" className="form-control" ref={input=>this.f_Password = input} id="txtPassword" name="txtPassword"
                               placeholder="******"/>
                    </div>



                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Địa chỉ</label>
                        <input type="text" className="form-control" ref={input=>this.f_DiaChi = input} id="txtDiaChi" name="txtDiaChi"
                               placeholder="Nguyễn Văn Cừ"/>
                    </div>


                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" ref={input=>this.f_Email = input}id="txtEmail" aria-describedby="emailHelp" name="Email"
                               placeholder="Enter email"/>
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
