import React from 'react';
import { Link } from 'react-router-dom'

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
        var url = "http://localhost:3001/api/BanHang/";

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
                        <h3 className="fontcolor">Tất cả sản phẩm hiện có</h3>
                        <div className="album py-5 bg-light bg-black">
                            <div className="row">
                                {list.map(item=>(

                                    <div className="col-md-6" key={item.ProID}>
                                        <div className="thumbnail">
                                        <div className="caption">
                                            <img width="350"
                                                 height="350" src={item.img_link} alt={item.ProID}/>
                                        <br/>
                                        <p>
                                            <Link to={"/home/ProductDetail/"+item.ProID} className="btn btn-primary fontwhite" role="button"><span className="fontwhite"> Chi tiết</span></Link>
    
                                        <Link to={'/home/ProductDetail/'+item.ProID} className="btn btn-danger text-center" role="button" name ="btnDatMua">

                                            <span className="glyphicon glyphicon-shopping-cart fontwhite"></span>
                                            <span className="fontwhite">Đặt mua</span>

                                        </Link>
    
                                        <a className="btn btn-default" role = "button">
                                        <span className="glyphicon glyphicon-eye-open" ></span>
                                        Xem : {item.View}
                                            </a>
                                                <a className="btn btn-default" role = "button">
                                                <span className="glyphicon glyphicon-ok-circle"></span>
                                                Hiện còn : {item.Quantity}
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


