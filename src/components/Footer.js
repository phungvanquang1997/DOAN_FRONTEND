
import { Link } from 'react-router-dom'
import React, {Component} from 'react';
class Footer extends Component {

    constructor() {
        super();

    }

    render()
    {
        return(
            <footer className="pdbottomFooter">
        {/*        <div className="splitter"></div>*/}
                <ul>
                    <li>
                        <div className="icon" data-icon="E"></div>
                        <div className="text">
                            <h4>About me</h4>
                            <div> Phùng Văn Quang - 1560443 - Hiện đang là sinh viên trường ĐH Khoa Học Tự Nhiên TPHCM <a href="#">Read
                                    more</a></div>
                        </div>
                    </li>
                    <li>
                        <div className="icon" data-icon="a"></div>
                        <div className="text">
                            <h4>Archive</h4>
                            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eu sollicitudin
                                pretium. Nam scelerisque arcu at dui porttitor, non viverra sapien pretium. Nunc nec dignissim nunc.
                                Sed eget est purus. Sed convallis, metus in dictum feugiat, odio orci rhoncus metus. <a href="#">Read
                                    more</a></div>
                        </div>
                    </li>
                    <li>
                        <div className="icon" data-icon="s"></div>
                        <div className="text">
                            <h4>Cloud</h4>
                            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eu sollicitudin
                                pretium. Nam scelerisque arcu at dui porttitor, non viverra sapien pretium. Nunc nec dignissim nunc.
                                Sed eget est purus. Sed convallis, metus in dictum feugiat, odio orci rhoncus metus. <a href="#">Read
                                    more</a></div>
                        </div>
                    </li>
                </ul>

                <div className="bar">
                    <div className="bar-wrap">
                        <ul className="links">
                            <li><Link to ='/'>Home</Link></li>
                            <li><Link to="#">License</Link></li>
                            <li><Link to="#">Contact Us</Link></li>
                            <li><Link to="#">Advertise</Link></li>
                            <li><Link to="#">About</Link></li>
                        </ul>

                        <div className="social">
                            <a href="https://www.facebook.com/unknow123456" className="fb">
                                <span data-icon="f" className="icon"></span>
                                <span className="info">
                                <span className="follow">Phùng Văn Quang</span>
                                <span className="num">9,999</span>
                            </span>
                            </a>

                            <a href="https://www.facebook.com/unknow123456" className="tw">
                                <span data-icon="T" className="icon"></span>
                                <span className="info">
                                <span className="follow">Follow us Twitter</span>
                                <span className="num">9,999</span>
                            </span>
                            </a>

                            <a href="https://www.facebook.com/unknow123456" className="rss">
                                <span data-icon="R" className="icon"></span>
                                <span className="info">
                                <span className="follow">Subscribe RSS</span>
                                <span className="num">9,999</span>
                            </span>
                            </a>
                        </div>
                        <div className="clear"></div>
                        <div className="copyright">&copy;  2018 All Rights Reserved</div>
                    </div>
                </div>
            </footer>

        );
    }
}


export default Footer

