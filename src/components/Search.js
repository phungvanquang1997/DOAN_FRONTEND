import React from 'react';
import { Link } from 'react-router-dom'

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            list: [],
            value:0,// Lấy sản phẩm dựa theo id sản phẩm
        }
        /*   this.reload = this.reload.bind(this);*/
    }

    componentDidMount() {
        var QueryStr =  this.props.match.params.QueryStr;

        var url = "http://localhost:3001/api/BanHang/Search/"+QueryStr;
        console.log(url);
        //gửi json nên để header 'Content-Type': 'application/json'
        fetch(url,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
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
    /*   shouldComponentUpdate(nextProps, nextState){
           return this.props !== nextProps;
       }*/
/*

    componentDidUpdate() {


        var id =  this.props.match.params.number;
        var url = "http://localhost:3001/api/BanHang/producer/"+id;
        console.log(url);
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

*/


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
                        <div>
                            <p>Từ khóa vừa tìm kiếm : <span className="bold size18">{ this.props.match.params.QueryStr}</span></p>
                            <p>Có <span className="bold size18">{list.length}</span> kết quả tìm thấy </p>
                        </div>
                        <div className="album py-5 bg-light bg-black">
                            <div className="row">
                                {list.length === 0?
                                    <React.Fragment>
                                        <div className="col-md-6">
                                                <div className="caption">
                                                        Không có sản phẩm nào thỏa điều kiện
                                                </div>
                                            </div>
                                    </React.Fragment>
                                :
                                    <React.Fragment>
                                {list.map(item=>(

                                    <div className="col-md-6" key={item.ProID}>
                                        <div className="thumbnail">
                                            <div className="caption">
                                                <img width="350"
                                                     height="350" src={item.img_link} alt={item.ProID}/>
                                                <br/>
                                                <p>
                                                    <Link to={"/home/ProductDetail/"+item.ProID} className="btn btn-primary fontwhite" role="button"><span className="fontwhite"> Chi tiết</span></Link>

                                                    <a className="btn btn-danger text-center" role="button" name ="btnDatMua">

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
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                    <a href="#" className="go-top">Back to top</a>
                </div>
            )
    }
}


export default  Search


