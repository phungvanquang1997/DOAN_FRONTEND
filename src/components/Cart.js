import React from 'react'
import RouteError from "./RouteError"
import { Link } from 'react-router-dom'
class Cart extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            isLogin : false,
            Username : "",
            isAdmin : false,
            CartItem : [],
            isSuccess : "hidden",
            Quantity : "",
            IsPay : false,
        }

    }
    handlerGoToDeleteModal(ProID)
    {
        this.setState({IsPay:true});
    }

    EditItem(item)
    {
        this.setState({isEdit:true});


    }
    RemoveItem(item)
    {

        const CartItem = this.state.CartItem;
        var listCart = [{}];
        for(var i = 0 ; i  < CartItem.length ; i = i+4) {
            var Cart = {ProID: CartItem[i],ProName : CartItem[i+1],Price : CartItem[i+2] , Quantity: CartItem[i+3]}
            listCart.push(Cart);
        }
        listCart = listCart.filter(function(e) { return e !== listCart[0]}) // xóa item null
        var index = 0;
        for(var j = 0 ; j < listCart.length ;j++)
        {
            if(JSON.stringify(item)===JSON.stringify(listCart[j]))
            {
                index = j;
            }
        }
        listCart = listCart.filter(function (e) {
            return e !== listCart[index];
        })

        var listTemp = [];
        for(var k = 0 ; k < listCart.length ;k++)
        {
           listTemp.push(listCart[k].ProID.toString());
            listTemp.push(listCart[k].ProName.toString());
            listTemp.push(listCart[k].Price.toString());
            listTemp.push(listCart[k].Quantity.toString());
        }
      /*  this.setState({CartItem : listTemp});*/
     window.localStorage.setItem("SaveProduct",  JSON.stringify(listTemp));
        console.log(window.localStorage.getItem("SaveProduct"));
        this.setState({CartItem : JSON.parse(window.localStorage.getItem("SaveProduct"))});
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
                "Cache-Control": "no-cache",
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
        console.log(window.localStorage.getItem("SaveProduct"));
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
                <React.Fragment>
                <div className="col-md-12">
                    <div className="text-center" role="alert">
                        Giỏ hàng của bạn đang trống !!!
                    </div>
                </div>
                    {
                        this.state.isSuccess === "visible" ?
                            <div className={this.state.isSuccess} id="pdtop20">
                                <div className="alert alert-success" id="ThongBao" role="alert">
                                    <strong>Thanh toán thành công!</strong>.
                                </div>
                            </div>

                            :
                            null
                    }
                </React.Fragment>
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
                        <tr key={item.ProID}>
                            <td>{item.ProID}</td>
                            <td>{item.ProName}</td>
                            <td>{item.Price}</td>
                            <td>{item.Quantity}</td>
                            <td className="text-right">
                                <Link to={'/home/Cart/'+item.ProID}  onClick={this.EditItem.bind(this)} className="btn btn-default btn-xs" role="button">
                                    <span className="glyphicon glyphicon-pencil"></span>
                                </Link>
                                <button onClick={this.RemoveItem.bind(this,item)} className="btn btn-danger btn-xs" role="button">
                                    <span className="glyphicon glyphicon-remove"></span>
                                </button>
                            </td>
                        </tr>
                        ))}
                        </React.Fragment>
                        </tbody>
                    </table>

                    <div className="modal position paddingtop20" id="DeleteModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="fontcolor text-center ">Xác nhận thanh toán đơn hàng</div>
                                </div>
                                <p className="text-center">Bạn có muốn thanh toán đơn hàng này không ?? </p>
                                <div className="text-center">
                                    <button type="button" onClick={this.Pay.bind(this)} className="btn btn-success"
                                            data-dismiss="modal">Yes
                                    </button>
                                    <span className=" pdleft50"></span>
                                    <button type="button" className="btn btn-primary"
                                            data-dismiss="modal">No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                            <div className="text-right">

                                <button data-toggle="modal" data-target="#DeleteModal" className="btn btn-success" role="button" name="btnDatMua">
                                    <span className="glyphicon glyphicon-shopping-cart"></span>
                                    Thanh Toán
                                </button>

                            </div>
                    </div>

                </div>


            );
        }
    }

}

export default Cart

