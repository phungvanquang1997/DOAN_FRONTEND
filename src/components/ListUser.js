import React from 'react'
//import PlayerAPI from '../api'
import { Link } from 'react-router-dom'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
class ListUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            list: [],
            f_ID : "",
        }
        this.reload = this.reload.bind(this);
    }

    handlerGoToDeleteModal(f_ID)
    {
        this.setState({f_ID : f_ID});
    }

    componentDidMount()
    {
        var token = window.localStorage.getItem('access_token');
        fetch("http://localhost:3001/api/users/users/",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
                "Cache-Control": "no-cache",
            },
            mode:"cors"
        })
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
        var token = window.localStorage.getItem('access_token');
        fetch("http://localhost:3001/api/users/users/",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
                "Cache-Control": "no-cache",
            },
            mode:"cors"
        })
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

    handlerDelete(i)
    {
        var token = window.localStorage.getItem('access_token');
        var req = "http://localhost:3001/api/users/users/"+i;
        fetch(req, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
                "Cache-Control": "no-cache",
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
        else
        {
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
                    <div className=" fontcolor text-center">
                        Danh sách khách hàng
                    </div>
                   {/* <div className="modal position paddingtop20" id="DeleteModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="fontcolor text-center ">Xác nhận thao tác</div>
                                </div>
                                <p className="text-center">Bạn có muốn xóa UID : <span className="color-red">{this.state.f_ID}</span> không ?</p>
                                <div className="text-center">
                                    <button type="button" onClick={this.handlerDelete.bind(this,this.state.f_ID)} className="btn btn-danger"
                                            data-dismiss="modal">Delete
                                    </button>
                                    <span className=" pdleft50"></span>
                                    <button type="button" className="btn btn-primary"
                                            data-dismiss="modal">Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                    <div className="hover-yellow">
                        <table className="table table-sm table-hover">
                            <thead>
                            <tr className="bold">
                                <th>UID</th>
                                <th>Username </th>
                                <th>Họ tên</th>
                                <th>Quyền hạn</th>
                                <th>
                                    #
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.map(item => (
                                <tr>
                                    <td>{item.f_ID}</td>
                                    <td>{item.f_Username}</td>
                                    <td>{item.f_Name}</td>
                                    <td>{item.f_Permission}</td>
                                    <td>
                                        {/*

                                             <Link to ="/roster" className="fas fa-times red-s20 pdleft" onClick={this.handlerDelete.bind(this,item.OrderID)}>
                                            Remove
                                             </Link>*/}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group pdleft text-center">
                                                <Link to ={"/admin/listUser/"+item.f_ID} className=" glyphicon glyphicon-eye-open btn btn-primary"> Detail</Link>
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

export default  ListUser
