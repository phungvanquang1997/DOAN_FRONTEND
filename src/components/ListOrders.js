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
        }
            this.reload = this.reload.bind(this);
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
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>Mã hóa đơn</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Tên khách hàng</th>
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
                                    <td>
                                           {/*

                                             <Link to ="/roster" className="fas fa-times red-s20 pdleft" onClick={this.handlerDelete.bind(this,item.OrderID)}>
                                            Remove
                                             </Link>*/}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group pdleft text-center">
                                                <Link to ={"/admin/order/"+item.OrderID} className="fas fa-edit btn btn-primary">Detail</Link>
                                                <button type="button"  onClick={this.handlerDelete.bind(this,item.OrderID)} className="btn btn-danger"
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
