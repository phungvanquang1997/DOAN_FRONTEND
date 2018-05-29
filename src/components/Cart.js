import React from 'react'
import RouteError from "./RouteError"
class Cart extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            isLogin : false,
            Username : "",
            isAdmin : false,
            CartItem : [],
            isSuccess : "hidden"
        }


    }

    Pay()
    {
        var d = new Date();
        var Now = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();

        var token = window.localStorage.getItem('access_token');
        var url = "http://localhost:3001/api/orders/pay";
        fetch(url,{
            async: true,
            crossDomain: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer " + token.toString(),
            },
            mode: 'cors',
            body: JSON.stringify({
                CurrentTime : Now,
               Username : window.localStorage.getItem('username'),
               SaveProduct : this.state.CartItem,
            })
        }).then(()=> {
                this.setState({isSuccess: "visible"});
                window.localStorage.removeItem("SaveProduct");
                this.setState({CartItem : null});
            }
        )

    }

    componentDidMount()
    {
        if(window.localStorage.getItem("SaveProduct"))
        {
            this.setState({CartItem : JSON.parse(window.localStorage.getItem("SaveProduct"))});
        }
        if(window.localStorage.getItem('username')) {
            this.setState({Username: window.localStorage.getItem('username'), isLogin: true});
        }
        if(window.localStorage.getItem('permission')==1) {
            this.setState({isAdmin: true , isLogin: true});
        }
    }

    render(){
        if(this.state.isLogin==false)
        {
            return(
                 <RouteError/>
            )
        }
        if(this.state.CartItem==null || this.state.CartItem.length==0)
        {
            return(
                <div className="col-md-12">
                    <div className="text-center" role="alert">
                        Giỏ hàng của bạn đang trống !!!
                    </div>
                </div>
            )
        }
        else {
            const CartItem = this.state.CartItem;
            var Total  = 0;

            for(var i = 0 ; i  < CartItem.length ; i = i+4)
            {
                Total += (CartItem[i+2]*CartItem[i+3]);
            }
            var listCart = [{}];
            for(var i = 0 ; i  < CartItem.length ; i = i+4) {
                var Cart = {ProID: CartItem[i],ProName : CartItem[i+1],Price : CartItem[i+2] , Quantity: CartItem[i+3]}
                listCart.push(Cart);
            }
            listCart = listCart.filter(function(e) { return e !== listCart[0] }) // xóa item null
            console.log(listCart);

            return (

                <div className="col-md-12">
                    <div className="alert alert-info text-center" role="alert">
                        Tổng tiền hóa đơn : {Total}
                    </div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Mã sản phẫm</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                        </tr>
                        </thead>
                        <tbody>

                        <React.Fragment>
                        {listCart.map(item=>(
                        <tr>
                            <td>{item.ProID}</td>
                            <td>{item.ProName}</td>
                            <td>{item.Price}</td>
                            <td>{item.Quantity}</td>
                            <td className="text-right">
                                <a className="btn btn-default btn-xs" role="button">
                                    <span className="glyphicon glyphicon-pencil"></span>
                                </a>
                                <a className="btn btn-danger btn-xs" role="button">
                                    <span className="glyphicon glyphicon-remove"></span>
                                </a>
                            </td>
                        </tr>
                        ))}
                        </React.Fragment>
                        </tbody>
                    </table>
                    <div className="col-md-12">
                            <div className="text-right">

                                <button onClick={this.Pay.bind(this)} className="btn btn-success" role="button" name="btnDatMua">
                                    <span className="glyphicon glyphicon-shopping-cart"></span>
                                    Thanh Toán
                                </button>

                            </div>
                    </div>

                    <div className={this.state.isSuccess} id="pdtop20">
                        <div className="alert alert-success" id="ThongBao" role="alert">
                            <strong>Thanh toán thành công!</strong>.
                        </div>
                    </div>
                    <span>Không có giỏ hàng nào cả </span>
                </div>


            );
        }
    }

}

export default Cart

