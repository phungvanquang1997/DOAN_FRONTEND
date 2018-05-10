import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.


class Header extends React.Component
{

    constructor(props) {
        super(props);

    }
    render()
    {
        return(
        <div>

            <div className="text-center font-design">
                                <span className="panel-title" ><Link to='/'>Danh sách sản phẩm</Link></span>

                                <span className="panel-title pdleft"><Link to='/roster'>Danh sách đơn hàng</Link></span>

                                <span className="panel-title pdleft"><Link to='/schedule'>Danh sách nhà sản xuất</Link></span>
            </div>
        </div>)
    }
}
export default Header
