import React from 'react'
//import PlayerAPI from '../api'
import { Link } from 'react-router-dom'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
class FullRoster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error:false,
            isLoaded:false,
            list:[],}
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
                                <th>#</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.map(item => (

                                <tr>
                                    <td>{item.OrderID}</td>
                                    <td>{item.Amount}</td>
                                    <td>{item.Status}</td>
                                    <td>{item.f_Name}</td>
                                    <td>sit</td>
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

export default FullRoster
