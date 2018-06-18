import React from 'react'
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
            isHidden : "hidden",
            value: '0',
            Address: "",
            Customer : "",
        }
        /*this.handlerUpdate = this.handlerUpdate.bind(this);*/
        this.handleChange = this.handleChange.bind(this);
        this.reload = this.reload.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }



    handlerUpdate()
    {
        this.setState({isHidden:'visible'});
        var id =  this.props.match.params.number;
        var url = "http://localhost:3001/api/orders/orders/"+id;
        var token = window.localStorage.getItem('access_token');
        console.log(token);

        //gửi json nên để header 'Content-Type': 'application/json'
        fetch(url,{
            body: JSON.stringify({
                Status: this.state.value,
                OrderID : id,
            }),
            method: "PUT",
            mode: 'cors',
            headers: {
                "Authorization": "bearer "+token.toString(),
                'Content-Type': 'application/json'},
        }).then(()=>this.reload());

        /*fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                Status : this.state.value,
                OrderID : id,
            })
        }).then(()=>this.reload());*/


    }

    reload()
    {
        var OrderID = parseInt(this.props.match.params.number, 10);
        var url = "http://localhost:3001/api/orders/orders/"+OrderID;
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
                        list: result
                    });
                    console.log(result);
                })
    }

    componentDidMount()
    {
        var OrderID = parseInt(this.props.match.params.number, 10);
        var url = "http://localhost:3001/api/orders/orders/"+OrderID;
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
                        Address : result[0].f_DiaChi,
                        Customer : result[0].f_Name,
                    });
                    console.log(result);
                })
  /*      fetch(url, {mode: "cors"})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result,

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
            )*/
    }


    render(){

        const {error, isLoaded, list,Address,Customer} = this.state;


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
                    <tr className="bold">
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Trạng thái hiện tại</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(item => (
                    <tr key={item.ProID}>
                        <th scope="row">{item.ProID}</th>
                        <td>{item.ProName}</td>
                        <td>{item.Price}</td>
                        <td>{item.Quantity}</td>
                        <td>{item.Status}</td>
                    </tr>
                        ))}
                    </tbody>
                </table>

                <div>
                    <span> Thông tin giao hàng / địa chỉ :</span> <b className="bold">{Address}</b><br/>
                    <span>Họ tên khách hàng : </span><b className="bold">{Customer}</b>
                </div>
                <div className="font-design">
                    Cập nhật trạng thái giao hàng :
                    <select value={this.state.value} onChange={this.handleChange} className="h20w120 text-center">
                        <option  value="0">Chưa giao</option>
                        <option   value="1">Đang giao</option>
                        <option   value="2">Đã giao</option>
                    </select>
                </div>
                <div className="pdtop30"></div>
                <Link to='/admin/order' className="btn btn-primary">Back</Link>
                <button type="button"  className="btn btn-success " onClick={this.handlerUpdate.bind(this)}
                >Cập nhật
                </button>
                <div className={this.state.isHidden} id="pdtop20">
                    <div className="alert alert-success" id="ThongBao" role="alert">
                        <strong>Cấp nhật trạng thái thành công!</strong>.
                    </div>
                </div>
            </div>
        )
    }

}



export default OrderDetail
