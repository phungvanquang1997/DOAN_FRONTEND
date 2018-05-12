import React from 'react';
 
class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            list: [],
        }
        this.reload = this.reload.bind(this);
    }

    handleclick()
    {
        var d = new Date();
        var Now = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();
        fetch("http://localhost:3001/api/BanHang/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                ProName : this.ProName.value,
                TinyDes : this.Tinydes.value,
                FullDes : this.Fulldes.value,
                Price : this.Price.value,
                Quantity : this.Quantity.value,
                OriginID:'1',
                View:'0',
                SoLuongBan:'0',
                NgayNhap: Now.toString(),
                NSX : this.nsx.value,
                img_link : this.img_link.value,
            })
        }).then(res => res.json())
            .catch(error => this.reload())
            .then(response => this.reload());
        // vẫn bị lỗi khi tạo JSON
    }


    reload()
    {
        //lấy ds celeb

        fetch("http://localhost:3001/api/BanHang/",{mode: "cors"})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result
                    });
                },
            )
        console.log(this.state.list);
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/BanHang/", {mode: "cors"})
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
        console.log(i);
        var req = "http://localhost:3001/api/BanHang/"+i;
        fetch(req, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(()=>this.reload());
    }

    render() {
        const {error, isLoaded, list} = this.state;
        console.log(list);
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


                            <div className="modal position" id="myModal">
                                <div className="modal-dialog">
                                    <div className="modal-content">


                                        <div className="modal-header">
                                            <h4 className="modal-title"> Thêm sản phẩm</h4>
                                            <button type="button" className="close"
                                                    data-dismiss="modal">&times;</button>
                                        </div>


                                        <div className="modal-body">
                                            <span>Tên sản phẩm </span><input ref={input => this.ProName = input} name="imagelink" id="image-link"/><br/>
                                            <span>Mô tả ngắn </span><input ref={input => this.Tinydes = input} name="name" id="name"/><br/>
                                            <span>Mô tả đầy đủ </span><input ref={input => this.Fulldes = input} name="description" id="description"/><br/>
                                            <span>Giá  </span><input ref={input => this.Price = input} name="imagelink" id="image-link"/><br/>
                                            <span>Số lượng  </span><input ref={input => this.Quantity = input} name="name" id="name"/><br/>
                                            <span>Nhà sản xuất </span><input ref={input => this.nsx = input} name="description" id="description"/><br/>
                                            <span>Hình ảnh sản phẩm </span><input ref={input => this.img_link = input} name="imagelink" id="image-link"/><br/>
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
                                                    <button type="button" className="btn btn-primary"
                                                            data-toggle="modal"
                                                    >Edit
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


export default Home


