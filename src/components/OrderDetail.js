import React from 'react'
import PlayerAPI from '../api'
import { Link } from 'react-router-dom'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
class OrderDetail extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            list: [],
        }
    }



    componentDidMount()
    {
        var OrderID = parseInt(this.props.match.params.number, 10);
        var url = "http://localhost:3001/api/orders/orders/"+OrderID;
        fetch(url, {mode: "cors"})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result
                    });
                    console.log(result)
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


    render(){
        const {error, isLoaded, list} = this.state;
        console.log(list);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else
        return(
            <div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Trạng thái hiện tại</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(item => (
                    <tr>
                        <th scope="row">{item.ProID}</th>
                        <td>{item.ProName}</td>
                        <td>{item.Price}</td>
                        <td>{item.Quantity}</td>
                        <td>{item.Status}</td>
                    </tr>
                        ))}
                    </tbody>
                </table>
                <Link to='/roster'>Back</Link>
            </div>
        )
    }

}



export default OrderDetail
