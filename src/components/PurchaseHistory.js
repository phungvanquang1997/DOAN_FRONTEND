import React from 'react'
import RouteError from "./RouteError"
class Purchase extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            isLogin : false,
            Username : "",
            isAdmin : false,
           List : [],
            ListOrderDetail : [],
            isSuccess : "hidden",
            totalOrder : "",
            OrderID : null
        }

    }

    ViewDetail(OrderID)
    {
        console.log(OrderID);
       var token = window.localStorage.getItem('access_token');
        this.setState({OrderID : OrderID});
        var url = "http://localhost:3001/api/orders/orders/"+OrderID;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
            },
        }).then(rs=>rs.json()).then((result)=>{
            this.setState({ListOrderDetail : result})
        })
    }

    componentDidMount()
    {
        if(window.localStorage.getItem('access_token'))
        {
        var token = window.localStorage.getItem('access_token');
        var Username = window.localStorage.getItem('username');
        var url = "http://localhost:3001/api/orders/PurchaseHistory";
        fetch(url,{
            method: 'POST',
            body: JSON.stringify({
                Username : Username,
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
            },
        }).then(rs=>rs.json()).then((rs)=>{
            this.setState({
                List : rs ,
                totalOrder : rs.length
            })
        })
        }
    }
    render()
    {
        if(!window.localStorage.getItem('access_token'))
        {
            return(
                <RouteError/>
            )
        }
        else {
        const list = this.state.List;
        const listOrderDetail = this.state.ListOrderDetail;
        for(let i = 0 ; i < list.length ; i++)
        {
            if(list[i].Status==0)
            {
                list[i].Status ="Chưa giao";
            }
            if (list[i].Status==1)
            {
                list[i].Status ="Đang giao";
            }
            if (list[i].Status==2)
            {
                list[i].Status ="Đã giao";
            }
        }
        return(
            <div>
            <div className="col-md-7">
                <div className="alert alert-success text-center ">
                    <span className="alert-link text-center">Bạn có {this.state.totalOrder} hóa đơn </span>
                </div>
                <table className="table table-hover spacing">
                    <thead>

                    <tr>
                        <th scope="col">Hóa đơn</th>
                        <th scope="col">Ngày lập</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Chi tiết</th>

                    </tr>
                    </thead>
                    <tbody>
                    {list.map(item=>(
                        <tr>
                            <th scope="row"> {item.OrderID}</th>
                            <td>{item.OrderDate}</td>
                            <td> {item.Status}
                            </td>
                            <td className="text-right">
                                <button onClick={this.ViewDetail.bind(this,item.OrderID)} className="btn btn-info btn-s "  name="btnXemChiTiet" role="button">
                                    <span className="glyphicon glyphicon-search"></span>
                                    Xem chi tiết
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                {this.state.OrderID != null ?
                <div className = "col-md-5" >
                    <div className="alert alert-success text-center">
                        <span className="alert-link text-center"> Thông tin chi tiết hóa đơn : {this.state.OrderID}  </span>
                    </div>
                    <table className="table table-hover text-center spacing">
                        <thead>

                        <tr>
                            <th scope="col">Mã sản phẩm</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Giá</th>
                            <th scope="col" className="text-center">Số lượng</th>

                        </tr>
                        </thead>

                        <tbody>
                        {listOrderDetail.map(item=>(
                            <tr className="bg-info bold">
                                <th scope="row"> {item.ProID}</th>
                                <td> {item.ProName}</td>
                                <td>{item.Price}</td>
                                <td> {item.Quantity}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                    :
                     null
                }
            </div>

        )
    }}


}

export default Purchase

