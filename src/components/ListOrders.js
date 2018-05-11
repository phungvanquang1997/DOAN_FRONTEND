import React from 'react'
//import PlayerAPI from '../api'
import { Link } from 'react-router-dom'

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

        fetch("http://localhost:3001/api/orders/orders",{mode:"cors"})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result
                    });
                    console.log(result);// Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
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


    reload()
    {
        //lấy ds celeb
        fetch("http://localhost:3001/api/orders/orders/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result
                    });
                },
            )
    }

    handlerDelete(i)
    {
        console.log(i);
        var req = "http://localhost:3001/api/orders/orders/"+i;
        fetch(req, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(()=>this.reload());
    }

    render() {
        const {error,isLoaded,list} = this.state;
        console.log(list);

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
                                                <Link to ={"/roster/"+item.OrderID} className="fas fa-edit btn btn-primary">Detail</Link>
                                                <button type="button"  onClick={this.handlerDelete.bind(this,item.OrderID)} className="btn btn-danger"
                                                >Delete
                                                </button>

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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
