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
        else

            return (

            <div>
                <div className=" fontcolor text-center">
                    Danh sách đơn hàng
                </div>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Mã hóa đơn</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col"> # </th>
                    </tr>
                    </thead>
                    <tbody>

                    {list.map(item=>(
                    <tr>
                        <th scope="row">{item.OrderID}</th>
                        <td>{item.Amount}</td>
                        <td>{item.Status}</td>
                        <td>{item.f_Name}</td>
                    </tr>
                    ))}

                    </tbody>
                </table>
                <a href="#" className="go-top">Back to top</a>
            </div>
        )
    }
}

export default FullRoster
