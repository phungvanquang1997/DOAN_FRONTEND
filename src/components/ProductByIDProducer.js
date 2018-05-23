import React from 'react';

class ProductByIDProducer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            list: [], // Lấy sản phẩm dựa theo id sản phẩm
        }
     /*   this.reload = this.reload.bind(this);*/
    }


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


export default  ProductByIDProducer


