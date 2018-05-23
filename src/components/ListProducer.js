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
            listID: [],
            IDnsx : 0,
            TenNSX : "",
        }
        this.reload = this.reload.bind(this);
        this.handlerChangeTenNSX = this.handlerChangeTenNSX.bind(this);
        this.handlerChangeID = this.handlerChangeID.bind(this);
    }

    handlerGetData(i)
    {
        var url = "http://localhost:3001/nsx/nsx/"+i;
        var token = window.localStorage.getItem('access_token');
        console.log(token);

        //gửi json nên để header 'Content-Type': 'application/json'

        fetch(url,{
            method: 'GET',
            headers: {
                "Authorization": "bearer "+token.toString(),
                'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        listID: result,
                        IDnsx : result[0].IDnsx,
                        TenNSX : result[0].TenNSX,

                    });

                },
            )
    }

    handleclick()
    {
        var token = window.localStorage.getItem('access_token');
        fetch("http://localhost:3001/nsx/nsx/", {
            method: 'POST',
            body: JSON.stringify({
                TenNSX : this.TenNSX.value,
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
            },
        }).catch(error => this.reload())
            .then(response => this.reload());
        // vẫn bị lỗi khi tạo JSON
    }

    handlerUpdate(i)
    {
        var token = window.localStorage.getItem('access_token');
        var req = "http://localhost:3001/nsx/nsx/"+i;
        fetch(req, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
            },
            mode: 'cors',
            body: JSON.stringify({
                IDnsx : this.IDnsxedit.value,
               TenNSX : this.TenNSXedit.value,
            })
        }).then(()=>this.reload());
    }



    handlerChangeID(event) {
        this.setState({
            IDnsx : event.target.value,

        });
    }

    handlerChangeTenNSX(event) {
        this.setState({
            TenNSX : event.target.value,
        });
    }

    componentDidMount()
    {
        var token = window.localStorage.getItem('access_token');
        var url = "http://localhost:3001/nsx/nsx";
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

        var token = window.localStorage.getItem('access_token');
        console.log(token);
        var url = "http://localhost:3001/nsx/nsx/";
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
        var url = "http://localhost:3001/nsx/nsx/"+i;
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
        const {error,isLoaded,list,listID} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else {

            return (

                <div>
                    <div className=" fontcolor text-center">
                        Danh sách nhà sản xuất
                    </div>

                    <div className="text-center pdtop30">
                        <div className="pdbottom">
                            <button type="button" className="btn btn-success" data-toggle="modal"
                                    data-target="#myModal">
                                Thêm nhà sản xuất
                            </button>
                        </div>



                        {/* Modal tạo sản phẩm */}
                        <div className="modal position" id="myModal">
                            <div className="modal-dialog">
                                <div className="modal-content">


                                    <div className="modal-header">
                                        <div className="fontcolor pdleft120"> Thêm nhà sản xuất</div>
                                        <button type="button" className="close"
                                                data-dismiss="modal">&times;</button>
                                    </div>


                                    <div className="modal-body">

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" className="bold">Tên nhà sản xuất</label>
                                            <input type="text" ref={input => this.TenNSX= input} className="form-control " name="txtTinyDes" placeholder="..."/>
                                        </div>
                                    </div>


                                    <div className="modal-footer">
                                        <button type="button" onClick={this.handleclick.bind(this)} className="btn btn-primary"
                                                data-dismiss="modal">Add
                                        </button>

                                        <button type="button" className="btn btn-danger"
                                                data-dismiss="modal">Close
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>




                    {/* Modal chỉnh sửa */}

                    <div className="modal position" id="EditModal">
                        <div className="modal-dialog">
                            <div className="modal-content">


                                <div className="modal-header">
                                    <div className="fontcolor pdleft120"> Chỉnh sửa nhà sản xuất</div>
                                    <button type="button" className="close"
                                            data-dismiss="modal">&times;</button>
                                </div>


                                {listID.map(item=>
                                    <div className="modal-body" key ={item.IDnsx}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" className="bold">Mã nhà sản xuất</label>
                                            <input ref={input => this.IDnsxedit = input} onChange={this.handlerChangeID} value={this.state.IDnsx}  type="text" readOnly className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" className="bold">Tên nhà sản xuất</label>
                                            <input ref={input => this.TenNSXedit = input}  onChange={this.handlerChangeTenNSX} value={this.state.TenNSX}  onChange={this.handlerChangeTenNSX} type="text" className="form-control" name="txtProName" placeholder="VietNamcorp"/>
                                        </div>


                                        <div className="text-center">
                                            <button type="button" onClick={this.handlerUpdate.bind(this,item.IDnsx)} className="btn btn-success"
                                                    data-dismiss="modal">Update
                                            </button>

                                            <button type="button" className="btn btn-danger"
                                                    data-dismiss="modal">Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>Mã nhà sản xuất</th>
                                <th>Tên nhà sản xuất</th>
                                <th>
                                    #
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.map(item => (
                                <tr>
                                    <td>{item.IDnsx}</td>
                                    <td>{item.TenNSX}</td>
                                    <td>
                                        {/*

                                             <Link to ="/roster" className="fas fa-times red-s20 pdleft" onClick={this.handlerDelete.bind(this,item.OrderID)}>
                                            Remove
                                             </Link>*/}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group  text-center">
                                                <button data-toggle="modal" onClick={this.handlerGetData.bind(this,item.IDnsx)} data-target="#EditModal" className="btn btn-info btn-s"><span className="glyphicon glyphicon-cog"> Update</span></button>

                                                <button  type="button"   onClick={this.handlerDelete.bind(this,item.IDnsx)}  className="btn btn-danger"
                                                >
                                                    <span className="glyphicon glyphicon-ban-circle"> Delete</span>
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
