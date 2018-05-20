import React from 'react'
import { Link } from 'react-router-dom'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
class UserDetail extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            list: [],
            isHidden : "hidden",
            value: '0',
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
        var token = window.localStorage.getItem('access_token');
        this.setState({isHidden:'visible'});
        var id =  this.props.match.params.number;
        var url = "http://localhost:3001/api/users/users/"+id;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
            },
            mode: 'cors',
            body: JSON.stringify({
                Status : this.state.value,
                UserID : id,
            })
        }).then(()=>this.reload());


    }

    reload()
    {
        var token = window.localStorage.getItem('access_token');
        var ID = parseInt(this.props.match.params.number, 10);
        var url = "http://localhost:3001/api/users/users/"+ID;

        fetch(url, {
            mode: "cors",
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
            },
        })
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
            )
    }

    componentDidMount()
    {
        var token = window.localStorage.getItem('access_token');

        var ID = parseInt(this.props.match.params.number, 10);
        var url = "http://localhost:3001/api/users/users/"+ID;
        fetch(url, {
            mode: "cors",
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
            },
        })
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
            )
    }


    render() {

        const {error, isLoaded, list} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else {
            for (var i = 0 ; i < list.length ; i++)
            {
                if(list[i].f_Permission === 0)
                {
                    list[i].f_Permission = "Thành viên";
                }
                else
                    list[i].f_Permission = "Quản trị viên";
            }
            return (
                <div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>UID</th>
                            <th>Username</th>
                            <th>Tên khách hàng</th>
                            <th>Địa chỉ</th>
                            <th>Quyền hạn hiện tại</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map(item => (
                            <tr>
                                <th scope="row">{item.f_ID}</th>
                                <td>{item.f_Username}</td>
                                <td>{item.f_Name}</td>
                                <td>{item.f_DiaChi}</td>
                                <td>{item.f_Permission}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="font-design">
                        Cập nhật quyền hạn người dùng :
                        <select value={this.state.value} onChange={this.handleChange} className="h20w120 text-center">
                            <option value="0">Thành viên</option>
                            <option value="1">Quản trị viên</option>
                        </select>
                    </div>
                    <Link to='/admin/listUser' className="btn btn-primary"><span className="fas fa-backward"></span></Link>
                    <button type="button" className="btn btn-success" onClick={this.handlerUpdate.bind(this)}
                    >Cập nhật
                    </button>
                    <div className={this.state.isHidden} id="pdtop20">
                        <div className="alert alert-success" id="ThongBao" role="alert">
                            <strong>Cập nhật quyền hạn thành công!</strong>.
                        </div>
                    </div>
                </div>
            )
        }
    }
}



export default UserDetail
