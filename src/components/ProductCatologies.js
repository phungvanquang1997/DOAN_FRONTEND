import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.


class ProductCatologies extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            list : []
        };

    }

    componentDidMount() {
        var url = "http://localhost:3001/nsx/nsx/"

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

    render()
    {
        const {error, isLoaded, list,listID} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else
            return(
                <nav className="col-md-2 d-none d-md-block border-inset sidebar">
                    <div className="sidebar-sticky border-inset">
                        <div className="panel panel-default">
                            <div className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                                <h3 className="navbar-brand">Nhà sản xuất</h3>
                            </div>
                        {list.map(item=>
                                <div className="list-group">
                                    <Link to={"/home/producer/"+item.IDnsx} className="list-group-item">{item.TenNSX}
                                        <span className="badge badge-light">{item.num}</span>
                                    </Link>
                          {/*          <Link to='/admin' className="list-group-item">{item.TenNSX}</Link>*/}

                                </div>
                            )}
                        </div>
                    </div>
                </nav>

        )
    }
}
export default ProductCatologies
