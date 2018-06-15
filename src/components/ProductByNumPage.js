import React from 'react';
import { Link } from 'react-router-dom'
var current_page;
var nextPage;
var PreviousPage;
class ProductByNumPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            list: [],
            numPages : 0,
            ArrNumPages : []
        }
    }

    /*GetNumPages()
    {
        var url = "http://localhost:3001/api/BanHang/GetNumPage/";
        fetch(url,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'},
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        numPages : result[0].num
                    });
                    console.log(result);
                },

                (error) => {
                    console.log("error cmnr");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
        for(var i = 0 ; i < this.state.numPages ; i++)
        {
            this.state.ArrNumPages.push(i+1);
        }
        console.log(this.state.numPages);
    }*/

/*    shouldComponentUpdate(nextProps, nextState){
        return this.props != nextProps;
    }*/

    handlerClick(i)
    {
        document.location.href = "/home/page/"+i;
    }

    componentDidMount() {
        if(!this.props.match.params.number)
        {
            document.location.href = "/home/page/"+1;
        }
        current_page =  this.props.match.params.number;



        var url = "http://localhost:3001/api/BanHang/Pagination/"+current_page;

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

        var url1 = "http://localhost:3001/api/BanHang/Page/GetNumPage/";
        fetch(url1,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'},
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,

                    });
                    var arrtemp = [];
                    for(var i = 0 ; i < result[0].num; i++)
                    {
                        arrtemp.push(i+1);
                    }
                    this.setState({
                        ArrNumPages : arrtemp,
                        numPages : result[0].num
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
        const {error, isLoaded, list , ArrNumPages} = this.state;

        nextPage = parseInt(current_page) + 1;
        PreviousPage = current_page-1;
        if(PreviousPage == 0)
        {
            PreviousPage = 1;
        }
        if(nextPage > this.state.numPages)
        {
            nextPage = this.state.numPages;
        }

        if(current_page <= 0)
        {
            document.location.href = "/home/page/1";
        }


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
                                        {item.ProID}
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
                    <div className="text-center ">
                        <nav aria-label="Page navigation example ">
                            <ul className="pagination wh-pagination ">
                                <li className="page-item"><a className="page-link h40 text-center" href={"/home/page/"+PreviousPage}>Previous</a></li>
                                {ArrNumPages.map(item => (
                                    <li className="page-item " key={item}>
                                        {item == this.props.match.params.number ?
                                            <a className="page-link h40 text-center fontblue highlight" onClick={this.handlerClick.bind(this,item)}>{item}</a>
                                            :
                                            <a className="page-link h40 text-center fontblue" onClick={this.handlerClick.bind(this,item)}>{item}</a>
                                        }

                                       {/* <a className="page-link fontblue" onClick={this.handlerClick.bind(this,item)}>{item}</a>*/}
                                        </li>
                                ))}
                                <li className="page-item"><a className="page-link h40 text-center" href={"/home/page/"+nextPage}>Next</a></li>
                            </ul>
                        </nav>
                    </div>
                    <a href="#" className="go-top">Back to top</a>
                </div>
            )
    }
}


export default ProductByNumPage


