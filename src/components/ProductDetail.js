import React from 'react'
import { Link } from 'react-router-dom'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.

var value = 0;
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            list: [],
            list5item:[],
            list5:[],
            isHidden : "hidden",
            listIMG : [],
            value: this.props.match.number,
        }
        this.Get5ItemProduct = this.Get5ItemProduct.bind(this);
        this.Get5ItemProductTheSameType = this.Get5ItemProductTheSameType.bind(this);
        this.GetListIMG = this.GetListIMG.bind(this);

    }



    Get5ItemProductTheSameType() // lấy 5 sản phẩm cùng loại
    {

        var url = "http://localhost:3001/api/BanHang/product/5product/";
        fetch(url, {
            mode: "cors",
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        list5: result,

                    });
                }
            )
    }

    Get5ItemProduct() // lấy 5 sản phẩm cùng nhà sản xuất
    {

        var url2 = "http://localhost:3001/api/BanHang/producer/5product/"+this.state.list[0].NSX; // mã nhà sản xuất
        fetch(url2, {
            mode: "cors",
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list5item: result,

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

   /* shouldComponentUpdate(nextProps, nextState){
        if(this.props.match.params.number!==nextProps.match.params.number+1)
             return true ;
        return false;

    }*/

    /*componentDidUpdate()
    {

        var ID = this.props.match.params.number;
        var url = "http://localhost:3001/api/BanHang/ProductDetail/"+ID;
        fetch(url, {
            mode: "cors",
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        list: result,

                    });
                    this.Get5ItemProduct();

                },

                (error) => {
                    console.log("error cmnr");
                    this.setState({
                        error
                    });
                }
            );


    }*/


    GetListIMG()
    {
        var ID = this.props.match.params.number;
        var url = "http://localhost:3001/listImg/"+ID;
        fetch(url, {
            mode: "cors",
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        listIMG: result
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

    }


    componentDidMount()
    {
        var ID = this.props.match.params.number;
        var url = "http://localhost:3001/api/BanHang/ProductDetail/"+ID;
        fetch(url, {
            mode: "cors",
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result
                    });
                    console.log(this.state.list);
                    this.Get5ItemProduct();
                    this.Get5ItemProductTheSameType();
                    this.GetListIMG();
                },

                (error) => {
                    console.log("error cmnr");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    handlerView(i)
    {
        window.location.href = '/home/ProductDetail/'+i;
    }


    render()
    {
        const {list,list5item,list5,listIMG} = this.state;
        //             // Tạo thêm list img để tạo slide
            return(

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    {list.map(item=>(
                        <div>
                            <div id="myCarousel" className="carousel slide text-center" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#myCarousel" data-slide-to="1"></li>
                                    <li data-target="#myCarousel" data-slide-to="2"></li>
                                    <li data-target="#myCarousel" data-slide-to="3"></li>
                                </ol>

                                <div className="carousel-inner" role="listbox">

                                    <div className="item active">
                                        <img src={item.img_link} alt="Chania" width="400" height="350"/>
                                            <div className="carousel-caption">
                                                <h3>Chania</h3>
                                            </div>
                                    </div>
                               {listIMG.map(imgItem=>(
                                    <React.Fragment>
                                        <div className="item">
                                            <img width="500" height="345" src={imgItem.img_1} alt="Chania"/>

                                        </div>

                                       <div className="item " >
                                           <img  width="500" height="345" src={imgItem.img_2} alt="Chania"/>
                                       </div>
                                        <div className="item">
                                            <img  width="500" height="345" src={imgItem.img_3} alt="Chania"/>
                                        </div>
                                    </React.Fragment>

                                    ))}


                                </div>

                                <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="right carousel-control" href="#myCarousel" role="button"
                                   data-slide="next">
                                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>



                            <div className="caption">
                                <h4 className="text-center fontcolor">Thông tin sản phẩm</h4>
                                <h5>Tên sản phẩm : <span className="bold"> {item.ProName}  </span></h5>
                                <h5>Giá : <span className="bold">{item.Price}</span></h5>
                                <h5>Tên nhà sản xuất : <span className="bold">{item.TenNSX} </span></h5>
                                <h5>Xuất sứ : <span className="bold">{item.OriginName}</span></h5>
                                <h5>Loại : <span className="bold">Rượu</span></h5>
                                <h5>Mô tả chi tiết sản phẩm : </h5>
                                <div>{item.FullDes}</div>
                                <h3> Số lượng </h3>
                                <form method="post" action="">
                                    <div className="form-group col-md-3">
                                        <input type="text" className="form-control" id="txtSoLuong" name="txtSoLuong"
                                               placeholder="Nhập số lượng cần mua"/>
                                    </div>
                                    <button type="submit" className="btn btn-danger" name="btnDatMua">
                                        <span className="glyphicon glyphicon-shopping-cart"></span>
                                        Đặt mua
                                    </button>
                                    <a className="btn btn-default" role="button">
                                        <span className="glyphicon glyphicon-eye-open"></span>
                                        Lượt xem : {item.View}
                                    </a>
                                    <a className="btn btn-default" role="button">
                                        <span className="glyphicon glyphicon-ok-circle"></span>
                                        Đã Bán : {item.SoLuongBan}
                                    </a>
                                    <a className="btn btn-default" role="button">
                                        <span className="glyphicon glyphicon-ok-circle"></span>
                                        Số lượng tồn : {item.Quantity}
                                    </a>
                                </form>

                            </div>
                        </div>
                    ))}


                    <div className="panel-body pdtop60">
                        <h3 className="font">5 Sản phẩm cùng nhà sản xuất</h3>
                        <div className="row">
                            {list5item.map(item=>(

                                <div className="col-md-6" key={item.ProID}>
                                    <div className="thumbnail">
                                        <div className="caption">
                                            <img width="350"
                                                 height="350" src={item.img_link} alt={item.ProID}/>
                                            <br/>
                                            <p>
                                                <a onClick={this.handlerView.bind(this,item.ProID)} className="btn btn-primary fontwhite" role="button"><span className="fontwhite"> Chi tiết</span></a>

                                                <a onClick={this.handlerView.bind(this,item.ProID)} className="btn btn-danger text-center" role="button" name ="btnDatMua">

                                                    <span className="glyphicon glyphicon-shopping-cart fontwhite"></span>
                                                    <span className="fontwhite">Đặt mua</span>

                                                </a>

                                                <a className="btn btn-default"  role = "button">
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

                   <div className="panel-body pdtop60">
                        <h3 className="font">5 Sản phẩm cùng loại</h3>
                        <div className="row">
                            {list5.map(item=>(

                                <div className="col-md-6" key={item.ProID}>
                                    <div className="thumbnail">
                                        <div className="caption">
                                            <img width="350"
                                                 height="350" src={item.img_link} alt={item.ProID}/>
                                            <br/>
                                            <p>
                                                <a onClick={this.handlerView.bind(this,item.ProID)} className="btn btn-primary fontwhite" role="button"><span className="fontwhite"> Chi tiết</span></a>

                                                <a onClick={this.handlerView.bind(this,item.ProID)} className="btn btn-danger text-center" role="button" name ="btnDatMua">

                                                    <span className="glyphicon glyphicon-shopping-cart fontwhite"></span>
                                                    <span className="fontwhite">Đặt mua</span>

                                                </a>

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
            )
    }










}

export default ProductDetail

