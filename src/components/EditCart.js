import React from 'react';
import { Link } from 'react-router-dom'

class EditCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            list: [],
            ErrBuy : "hidden",
            ErrBuy1 : "hidden",
            ErrBuy2 : "hidden",
            Quantity : "hidden",
            CartItem: [],

        }
        /*   this.reload = this.reload.bind(this);*/
    }

    componentDidMount() {
        var ProID = this.props.match.params.number;
        var url = "http://localhost:3001/api/BanHang/ProductDetail/"+ProID;
        var token = window.localStorage.getItem('access_token');
        fetch(url,{
            "async": true,
            "method": "GET",
            "headers": {
                "Authorization": "bearer "+token.toString(),
                "Cache-Control": "no-cache",
                "Postman-Token": "32d031bc-43e9-4771-bcc9-acb5b7b0b737"},
        }).then(res=>res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result,
                        Quantity : result[0].Quantity
                    });
                })

    }

    handlerClick()
    {
        if(!this.Quantity.value)
        {
            this.setState({ErrBuy : "visible"});
            return;
        }
        if(isNaN(this.Quantity.value))
        {
            this.setState({ErrBuy : "visible"});
            return;
        }

        if(this.Quantity.value > this.state.Quantity)
        {
            this.setState({ErrBuy1:"visible"});
        }
        else
        {
            console.log((window.localStorage.getItem("SaveProduct")));
            var CartItem =  JSON.parse(window.localStorage.getItem("SaveProduct"));
            var ProID = this.props.match.params.number;
             if(CartItem[0]==ProID)
            {
                CartItem[3] = this.Quantity.value;
            }

            window.localStorage.setItem("SaveProduct",JSON.stringify(CartItem));
            this.Quantity.value = null;
            this.setState({ErrBuy2:"visible"});
        }
    }

    render() {
        const {error, isLoaded, list,Quantity} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }

        else
            return (
                <React.Fragment>
                <div className="col-md-6">
                    {list.map(item=>
                    <div className="thumbnail" key={item.ProID}>
                        <img src={item.img_link} alt="..."/>
                            <div className="caption" key={item.ProID}>
                                <p>Tên sản phẩm : <span className="bold">{item.ProName}</span></p>
                                <p>Giá : <span className="bold">{item.Price}</span></p>
                                <p>Mô tả : <span className="bold">{item.TinyDes}</span></p>
                                <br/>
                                    <p>
                                        <a  className="btn btn-danger fontwhite"
                                           role="button" name="btnDatMua">
                                            <span className="glyphicon glyphicon-shopping-cart"></span>
                                            Đặt mua
                                        </a>
                                        <a> </a>
                                        <a className="btn btn-default" role="button">
                                            <span className="glyphicon glyphicon-eye-open"></span>
                                            <b>Lượt xem : {item.View}</b>
                                        </a>
                                        <a className="btn btn-default" role="button">
                                            <span className="glyphicon glyphicon-ok-circle"></span>
                                            <b>Số lượng tồn : {item.Quantity}</b>
                                        </a>
                                    </p>
                            </div>
                    </div>
                    )}
                </div>

                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="txtUserName" className="text-center bold color-red">Chỉnh sửa số lượng sản phẩm</label>
                        <b className="bold">Số lượng</b> <input type="text" ref={input=>this.Quantity = input} className="form-control" id="txtSoLuong" name="txtSoLuong"
                               placeholder="Nhập số lượng cần mua"/>
                        <div className=" text-center pdtop30">
                          <button className="btn btn-success w100" onClick={this.handlerClick.bind(this)}> 	<span class="glyphicon glyphicon-hand-right"></span>
                                Xác nhận </button>
                        </div>
                    </div>

                    <div className={this.state.ErrBuy} id="pdtop20">
                        <div className="alert alert-danger" id="ThongBao" role="alert">
                            <strong>Vui lòng chỉ nhập số ! , thất bại !.</strong>.
                        </div>
                    </div>

                    <div className={this.state.ErrBuy1} id="pdtop20">
                        <div className="alert alert-danger" id="ThongBao" role="alert">
                            <strong>Số lượng nhập lớn hơn số lượng tồn , thất bại !.</strong>
                        </div>
                    </div>
                    <div className={this.state.ErrBuy2} id="pdtop20">
                        <div className="alert alert-success" id="ThongBao" role="alert">
                            <strong>Cập nhật thành công , vui lòng kiểm tra
                                <Link to ='/home/cart/'> giỏ hàng của bạn</Link>
                                !.</strong>
                        </div>
                    </div>
                </div>
                </React.Fragment>
            )
    }
}


export default  EditCart


