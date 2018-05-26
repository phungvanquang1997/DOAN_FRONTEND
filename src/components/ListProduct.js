import React from 'react';
 
class ListProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            list: [],
            listID: [], // Lấy sản phẩm dựa theo id sản phẩm
            listProducer : [],
            listOrigin: [],
            ProName : "abc",
            TinyDes : "",
            FullDes : "",
            Price : "",
            Quantity : "",
            NSX : "",
            img_link : "",
            OriginID : "",

        }
        this.reload = this.reload.bind(this);
        this.handlerChangeProName = this.handlerChangeProName.bind(this);
        this.handlerChangeImg = this.handlerChangeImg.bind(this);
        this.handlerChangeNSX = this.handlerChangeNSX.bind(this);
        this.handlerChangeQuantity = this.handlerChangeQuantity.bind(this);
        this.handlerChangePrice = this.handlerChangePrice.bind(this);
        this.handlerChangeFullDes=this.handlerChangeFullDes.bind(this);
        this.handlerChangeTinyDes = this.handlerChangeTinyDes.bind(this);
        this.GetListProducer = this.GetListProducer.bind(this);
        this.handlerChangeOrigin = this.handlerChangeOrigin.bind(this);
    }

    GetListProducer()
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
                        listProducer : result
                    });
                    console.log(result);
                })
    }

    handleclick()
    {

        var token = window.localStorage.getItem('access_token');
        var d = new Date();
        var Now = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();
        fetch("http://localhost:3001/api/BanHang/", {
            method: 'POST',
            body: JSON.stringify({
                ProName : this.ProName.value,
                TinyDes : this.Tinydes.value,
                FullDes : this.Fulldes.value,
                Price : this.Price.value,
                Quantity : this.Quantity.value,
                OriginID: this.OriginID.value,
                View:'0',
                SoLuongBan:'0',
                NgayNhap: Now.toString(),
                NSX : this.NSX.value,
                img_link : this.img_link.value,
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
            },
        }).catch(error => this.reload())
            .then(response => this.reload());
        // vẫn bị lỗi khi tạo JSON
        this.ProName.value = this.Tinydes.value = this.Fulldes.value = this.Price.value=  this.Quantity.value = this.img_link.value =null ;


    }


    reload()
    {
        var url = "http://localhost:3001/api/BanHang/"
        var token = window.localStorage.getItem('access_token');
        console.log(token);

        //gửi json nên để header 'Content-Type': 'application/json'
        fetch(url,{
            method: "GET",
            headers: {
                "Authorization": "bearer "+token.toString(),
                'Content-Type': 'application/json'},
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result
                    });
                },

                (error) => {
                    console.log("error cmnr");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
    }

    componentDidMount() {
        var token = window.localStorage.getItem('access_token');
        var url1 = "http://localhost:3001/nsx/nsx";

        fetch(url1,{
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
                        listProducer : result
                    });
                    console.log(result);
                });
        //-------------------------------------------------

        var url2 = "http://localhost:3001/Origin/";
        fetch(url2,{
            "async": true,
            "method": "GET",
            "headers": {
                "Cache-Control": "no-cache",
                "Postman-Token": "32d031bc-43e9-4771-bcc9-acb5b7b0b737"},
        }).then(res=>res.json())
            .
            then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        listOrigin : result
                    });
                    console.log(result);
                });

        //-------------------------------------------------


        var url = "http://localhost:3001/api/BanHang/"
        console.log(token);

        //gửi json nên để header 'Content-Type': 'application/json'
        fetch(url,{
            method: "GET",
            headers: {
                "Authorization": "bearer "+token.toString(),
                'Content-Type': 'application/json'},
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result
                    });
                },

                (error) => {
                    console.log("error cmnr");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })



    }


    handlerUpdate(i)
    {
        this.GetListProducer();
        var token = window.localStorage.getItem('access_token');
        var req = "http://localhost:3001/api/BanHang/"+i;
        fetch(req, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer "+token.toString(),
            },
            mode: 'cors',
            body: JSON.stringify({
                ProID : this.ProID.value,
                ProName : this.ProNameEdit.value,
                TinyDes : this.TinydesEdit.value,
                FullDes : this.FulldesEdit.value,
                Price : this.PriceEdit.value,
                Quantity : this.QuantityEdit.value,
                NSX : this.NSXedit.value,
                img_link : this.img_linkEdit.value,
                OriginID : this.OriginIDedit.value,
            })
        }).then(console.log("OK"))
    }


    handlerGetData(i)
    {

        var url = "http://localhost:3001/api/BanHang/"+i;
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
                        ProName : result[0].ProName,
                        TinyDes : result[0].TinyDes,
                        FullDes : result[0].FullDes,
                        Price : result[0].Price,
                        Quantity : result[0].Quantity,
                        NSX : result[0].NSX,
                        img_link : result[0].img_link,
                        OriginID : result[0].OriginID,
                    });

                }
                )

    }


    handlerDelete(i)
    {

        var url = "http://localhost:3001/api/BanHang/"+i;
        var token = window.localStorage.getItem('access_token');
        console.log(token);

        //gửi json nên để header 'Content-Type': 'application/json'
        fetch(url,{
            method: 'DELETE',
            headers: {
                "Authorization": "bearer "+token.toString(),
                'Content-Type': 'application/json'},
        }).then(()=>this.reload());

    }

    handlerChangeProName(event) {
        this.setState({
            ProName : event.target.value,

        });
    }

    handlerChangeQuantity(event) {
        this.setState({
            Quantity : event.target.value,
        });
    }
    handlerChangePrice(event) {
        this.setState({
            Price : event.target.value,
        });
    }

    handlerChangeOrigin(event) {
        this.setState({
            OriginID : event.target.value,
        });
    }

    handlerChangeNSX(event) {
        this.setState({
            NSX : event.target.value,
        });
    }

    handlerChangeImg(event) {
        this.setState({
            img_link : event.target.value,
        });
    }

    handlerChangeFullDes(event) {
        this.setState({
            FullDes : event.target.value,
        });
    }
    handlerChangeTinyDes(event) {
        this.setState({
            TinyDes : event.target.value,
        });
    }

    render() {
        const {error, isLoaded, list,listID,listProducer,listOrigin} = this.state;
        console.log(listOrigin);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else
            return (
                <div>
                    <h5 className="fontcolor text-center">Danh sách sản phẩm</h5>
                    <div className="text-center pdtop30">
                            <div className="pdbottom">
                                <button type="button" className="btn btn-success" data-toggle="modal"
                                        data-target="#myModal">
                                    Thêm sản phẩm
                                </button>
                            </div>



                        {/* Modal tạo sản phẩm */}
                            <div className="modal position" id="myModal">
                                <div className="modal-dialog">
                                    <div className="modal-content">


                                        <div className="modal-header">
                                            <div className="fontcolor pdleft120"> Thêm sản phẩm</div>
                                            <button type="button" className="close"
                                                    data-dismiss="modal">&times;</button>
                                        </div>


                                        <div className="modal-body">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1" className="bold">Tên sản phẩm</label>
                                                <input ref={input => this.ProName = input}  type="text" className="form-control" name="txtProName" placeholder="Rượu vang"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1" className="bold">Mô tả nhỏ</label>
                                                <input type="text" ref={input => this.Tinydes = input} className="form-control " name="txtTinyDes" placeholder="..."/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="txtFullDes"  className="control-label bold">Chi tiết</label>
                                                <div className="col-sm-12">
                                          <textarea rows="4" id="txtFullDes" name="txtFullDes" ref={input => this.Fulldes = input}
                                          className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1" className="bold">Giá sản phẩm</label>
                                                <input  ref={input => this.Price = input} type="text" className="form-control" name="txtPrice" placeholder="100000"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1"className="bold">Số lượng</label>
                                                <input ref={input => this.Quantity = input} type="text" className="form-control" name="txtQuantity" placeholder="10"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1"className="bold">Quốc gia</label>

                                                <br/>
                                                <select id="select" ref={select => this.OriginID = select}>
                                                    {listOrigin.map(itemOrigin=>(

                                                        <option className="text-center   " key={itemOrigin.OriginID} value={itemOrigin.OriginID}>{itemOrigin.OriginName}</option>

                                                    ))}
                                                </select>


                                            </div>
                                           <div className="form-group">
                                                <label htmlFor="exampleInputEmail1"className="bold">Nhà sản xuất</label>

                                                <br/>
                                               <select id="select" ref={select => this.NSX = select}>
                                                   {listProducer.map(items=>(

                                                       <option className="text-center   " key={items.IDnsx} value={items.IDnsx}>{items.TenNSX}</option>
                                                   ))}
                                               </select>


                                           </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1"className="bold">Link hình sản phẩm</label>
                                                <input ref={input => this.img_link = input} type="text" className="form-control" name="txtNSX" placeholder="..."/>
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
                                    <div className="fontcolor pdleft120"> Chỉnh sửa sản phẩm</div>
                                    <button type="button" className="close"
                                            data-dismiss="modal">&times;</button>
                                </div>


                                {listID.map(item=>
                                    <div className="modal-body" key ={item.ProID}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" className="bold">Mã sản phẩm</label>
                                            <input ref={input => this.ProID = input} value={item.ProID}  type="text" readOnly className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" className="bold">Tên sản phẩm</label>
                                            <input ref={input => this.ProNameEdit = input} value={this.state.ProName}  onChange={this.handlerChangeProName} type="text" className="form-control" name="txtProName" placeholder="Rượu vang"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" className="bold">Mô tả nhỏ</label>
                                            <input type="text" ref={input => this.TinydesEdit = input} onChange={this.handlerChangeTinyDes} value={this.state.TinyDes} className="form-control " name="txtTinyDes" placeholder="..."/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="txtFullDes" className="control-label bold">Chi tiết</label>
                                            <div className="col-sm-12">
                                              <textarea rows="4" id="txtFullDes" name="txtFullDes"
                                                        className="form-control" ref={input => this.FulldesEdit = input} onChange={this.handlerChangeFullDes} value={this.state.FullDes} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" className="bold">Giá sản phẩm</label>
                                            <input  ref={input => this.PriceEdit = input} value={this.state.Price} type="text"onChange={this.handlerChangePrice} className="form-control" name="txtPrice" placeholder="100000"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1"className="bold">Số lượng</label>
                                            <input ref={input => this.QuantityEdit = input}  value={this.state.Quantity} onChange={this.handlerChangeQuantity} type="text" className="form-control" name="txtQuantity" placeholder="10"/>
                                        </div>
                                       {/* <div className="form-group">
                                            <label htmlFor="exampleInputEmail1"className="bold">Nhà sản xuất</label>
                                            <input type="text" ref={input => this.nsxEdit = input} value={this.state.NSX}onChange={this.handlerChangeNSX} className="form-control" name="txtNSX" placeholder="..."/>
                                        </div>*/}

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1"className="bold">Quốc gia</label>
                                            <select id="select" ref={select => this.OriginIDedit = select}>

                                                {listOrigin.map(itemOri=>(
                                                    <React.Fragment>
                                                        {itemOri.OriginID === this.state.OriginID  ?
                                                            <option selected className="text-center" value={itemOri.OriginID}> {itemOri.OriginName}</option>
                                                            :
                                                            null
                                                        }
                                                        <option className="text-center" key={itemOri.OriginID} value={itemOri.OriginID}> {itemOri.OriginName}</option>
                                                    </React.Fragment>

                                                ))}
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1"className="bold">Nhà sản xuất</label>
                                            <select id="select" ref={select => this.NSXedit = select}>


                                                {listProducer.map(itemnsx=>(
                                                    <React.Fragment>
                                                    {itemnsx.IDnsx === this.state.NSX  ?
                                                        <option selected className="text-center" value={itemnsx.IDnsx}> {itemnsx.TenNSX}</option>
                                                            :
                                                        null
                                                    }
                                                        <option className="text-center" key={itemnsx.IDnsx} value={itemnsx.IDnsx}> {itemnsx.TenNSX}</option>
                                                    </React.Fragment>

                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1"className="bold">Link hình sản phẩm</label>
                                            <input ref={input => this.img_linkEdit = input} type="text" value={this.state.img_link}onChange={this.handlerChangeImg} className="form-control" name="txtNSX" placeholder="..."/>
                                        </div>

                                        <div className="text-center">
                                            <button type="button" onClick={this.handlerUpdate.bind(this,item.ProID)} className="btn btn-success"
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



                <div className="paddingtop text-center fontcolor bg-black">
                        <div className="album py-5 bg-light bg-black">
                            <div className="row">
                                {list.map(item=>(
                                    <div className="col-md-4" key={item.id} >
                                        <img className="card-img-top " src={item.img_link} alt={item.id}
                                             width="350"
                                             height="350"/>
                                        <div className="card-body">
                                            <p className="card-text text-center fontcolor" >
                                                {item.ProName}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group pdleft text-center">
                                                    <button type="button"  onClick={this.handlerDelete.bind(this,item.ProID)} className="btn btn-danger"
                                                    >Delete
                                                    </button>
                                                    <button type="button" className="btn btn-primary" data-toggle="modal"
                                                            data-target="#EditModal" onClick={this.handlerGetData.bind(this,item.ProID)}>
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <a href="#" className="go-top">Back to top</a>
                </div>
            )
    }
}


export default ListProduct


