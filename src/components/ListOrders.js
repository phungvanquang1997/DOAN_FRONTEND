import React from 'react'
//import PlayerAPI from '../api'
import { Link } from 'react-router-dom'
import Footer from './Footer'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
class ListOrders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            list: [],
            OrderIDconfirm : "",
        }
            this.reload = this.reload.bind(this);
    }
    handlerGoToDeleteModal(OrderID)
    {
        this.setState({OrderIDconfirm : OrderID});
    }
    componentDidMount()
    {
        this.sendToKen();
      /*  fetch("http://localhost:3001/api/orders/orders",{mode:"cors"})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result
                    });
                    console.log(result);
                },

                (error) => {
                    console.log("error cmnr");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )*/
    }


    sendToKen()
    {
        var token = window.localStorage.getItem('access_token');
        var url = "http://localhost:3001/api/orders/orders";
        fetch(url,{
            "async": true,
            "method": "GET",
            "headers": {
                "Authorization": "bearer "+token.toString(),
                "Cache-Control": "no-cache",
                "Postman-Token": "32d031bc-43e9-4771-bcc9-acb5b7b0b737"},
        }).then(res=>res.json())
            .
        then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    list: result
                });
                console.log(result);
            })

    }

    reload()
    {
        //lấy ds celeb
        var token = window.localStorage.getItem('access_token');
        console.log(token);
        var url = "http://localhost:3001/api/orders/orders";
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
                        list: result
                    });
                    console.log(result);
                })
    }

    handlerDelete(i)
    {
        var url = "http://localhost:3001/api/orders/orders/"+i;
        var token = window.localStorage.getItem('access_token');
        fetch(url,{
            "async": true,
            "method": "DELETE",
            "headers": {
                "Authorization": "bearer "+token.toString(),
                "Cache-Control": "no-cache",
                "Postman-Token": "32d031bc-43e9-4771-bcc9-acb5b7b0b737"},
        }).then(()=>this.reload());
    }

    render() {
        const {error,isLoaded,list} = this.state;
        console.log(this.state.list);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else {
            for(var i = 0 ; i < list.length; i++)
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
            return (

                <div>
                    <div className=" fontcolor text-center">
                        Danh sách đơn hàng
                    </div>

                    <div className="modal position paddingtop20" id="DeleteModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="fontcolor text-center ">Xác nhận thao tác</div>
                                </div>
                                <p className="text-center">Bạn có muốn xóa mã hóa đơn <span className="color-red">{this.state.OrderIDconfirm}</span> không ?</p>
                                <div className="text-center">
                                    <button type="button" onClick={this.handlerDelete.bind(this,this.state.OrderIDconfirm)} className="btn btn-danger"
                                            data-dismiss="modal">Delete
                                    </button>
                                    <span className=" pdleft50"></span>
                                    <button type="button" className="btn btn-primary"
                                            data-dismiss="modal">Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr className="bold">
                                <th>Mã hóa đơn</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Tên khách hàng</th>
                                <th>Số điện thoại</th>
                                <th>
                                   #
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.map(item => (
                                <tr>
                                    <td>{item.OrderID}</td>
                                    <td>{item.Amount}</td>
                                    <td>{item.Status}</td>
                                    <td>{item.f_Name}</td>
                                    <td>{item.f_SDT}</td>
                                    <td>
                                           {/*

                                             <Link to ="/roster" className="fas fa-times red-s20 pdleft" onClick={this.handlerDelete.bind(this,item.OrderID)}>
                                            Remove
                                             </Link>*/}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group pdleft text-center">

                                                <Link to ={"/admin/order/"+item.OrderID} className=" glyphicon glyphicon-eye-open btn btn-primary"> Detail</Link>
                                                <button type="button"  data-toggle="modal" data-target="#DeleteModal" onClick={this.handlerGoToDeleteModal.bind(this,item.OrderID)} className="btn btn-danger glyphicon glyphicon-close"
                                                >Delete
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <div>

                            </div>
                            </tbody>
                        </table>
                    </div>




                    <a href="#" className="go-top">Back to top</a>
                </div>
            )
        }
    }
}

export default  ListOrders
