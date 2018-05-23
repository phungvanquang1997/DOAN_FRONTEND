import React from 'react';

class ListProductClient extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            list: [],
            listID: [], // Lấy sản phẩm dựa theo id sản phẩm
            ProName : "abc",
            TinyDes : "",
            FullDes : "",
            Price : "",
            Quantity : "",
            NSX : "",
            img_link : "",
        }
        this.reload = this.reload.bind(this);
        this.handlerChangeProName = this.handlerChangeProName.bind(this);
        this.handlerChangeImg = this.handlerChangeImg.bind(this);
        this.handlerChangeNSX = this.handlerChangeNSX.bind(this);
        this.handlerChangeQuantity = this.handlerChangeQuantity.bind(this);
        this.handlerChangePrice = this.handlerChangePrice.bind(this);
        this.handlerChangeFullDes=this.handlerChangeFullDes.bind(this);
        this.handlerChangeTinyDes = this.handlerChangeTinyDes.bind(this);
    }

    handleclick()
    {
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
                OriginID:'1',
                View:'0',
                SoLuongBan:'0',
                NgayNhap: Now.toString(),
                NSX : this.nsx.value,
                img_link : this.img_link.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(error => this.reload())
            .then(response => this.reload());
        // vẫn bị lỗi khi tạo JSON
    }


    reload()
    {
        //gửi json nên để header 'Content-Type': 'application/json'
        var url = "http://localhost:3001/api/BanHang/";
        fetch(url,{
            method: "GET",
            headers: {
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
        var url = "http://localhost:3001/api/BanHang/"

        //gửi json nên để header 'Content-Type': 'application/json'
        fetch(url,{
            method: "GET",
            headers: {
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
        const {error, isLoaded, list,listID} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else
            return (
                <div>
                    <div className="paddingtop text-center  bg-light">
                        <div className="album py-5 bg-light bg-black">
                            <div className="row">
                                {list.map(item=>(

                                    <div className="col-md-6" key={item.id}>
                                        <div className="thumbnail">
                                        <div className="caption">
                                            <img width="350"
                                                 height="350" src={item.img_link} alt={item.id}/>
                                        <br/>
                                        <p>
                                        <a className="btn btn-primary" role="button">Chi tiết</a>
    
                                        <a className="btn btn-danger" role="button" name ="btnDatMua">
                                        <span className="glyphicon glyphicon-shopping-cart"></span>
                                        Đặt mua
                                        </a>
    
                                        <a className="btn btn-default" role = "button">
                                        <span className="glyphicon glyphicon-eye-open" ></span>
                                        Xem : {item.View}
                                            </a>
                                                <a className="btn btn-default" role = "button">
                                                <span className="glyphicon glyphicon-ok-circle"></span>
                                                Bán : {item.Quantity}
                                                </a>
                                            </p>
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


export default ListProductClient


