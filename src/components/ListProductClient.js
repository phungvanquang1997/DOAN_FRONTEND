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
                    <div id="myCarousel" className="carousel slide text-center" data-ride="carousel">
                        <ol className="carousel-indicators ">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                            <li data-target="#myCarousel" data-slide-to="3"></li>
                        </ol>

                        <div className="carousel-inner" role="listbox">

                            <div className="item active">
                                <img src="http://www.warehouse-asia.com/wp-content/uploads/2013/12/Shop-panorama-HQ-resized-1000x3001-1000x300.jpg"  width="400" height="350"/>
                          {/*      <div className="carousel-caption">
                                    <h3>Chania</h3>
                                </div>*/}
                            </div>
                                <React.Fragment>
                                    <div className="item">
                                        <img src="http://www.warehouse-asia.com/wp-content/uploads/2013/12/banner_SZ-1000x300.jpg" alt="Acb"/>
                                    </div>

                                    <div className="item " >
                                        <img  src="http://www.warehouse-asia.com/wp-content/uploads/2013/12/Untitled-2-01-1000x300.png" />
                                    </div>
                                    <div className="item">
                                        <img  src="http://www.warehouse-asia.com/wp-content/uploads/2013/12/Untitled-21-1000x300.jpg"/>
                                    </div>
                                    <div className="item">
                                        <img  src="http://www.warehouse-asia.com/wp-content/uploads/2013/12/Evian-Badoit-bannerresize-1000x300.jpg"/>
                                    </div>
                                </React.Fragment>

                        </div>

                        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" role="button"
                           data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right " aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

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


