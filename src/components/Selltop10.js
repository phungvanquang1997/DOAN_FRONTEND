import React from 'react';
import { Link } from 'react-router-dom'

class Selltop10 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            list: [],
        }
        this.reload = this.reload.bind(this);
    }


    reload()
    {
        //gửi json nên để header 'Content-Type': 'application/json'
        var url = "http://localhost:3001/api/BanHang/BestSeller/";
        fetch(url,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Cache-Control": "no-cache",
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

    componentDidMount() {
        var url = "http://localhost:3001/api/BanHang/BestSeller/";
        //gửi json nên để header 'Content-Type': 'application/json'
        fetch(url,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Cache-Control": "no-cache",
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
        console.log(this.state.list);
    }


    render() {
        const {error, isLoaded, list} = this.state;
        console.log(this.state.list);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else
            return (
                <div>
                    <div className="paddingtop text-center  bg-light">
                        <h3 className="fontcolor">10 sản phẩm bán chạy nhất !</h3>
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
                                                    <a className="btn btn-default gliphicon glyphicion-market"> Đã bán : {item.SoLuongBan} </a>
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


export default Selltop10


