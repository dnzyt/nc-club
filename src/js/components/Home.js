import React from 'react';
import { Link, IndexLink } from 'react-router';


const NavLink = (props) => {
    return (
        <Link {...props} activeStyle={{ color: '#FFFFFF' }} />
    )
}

const Links = () => {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mainNavBar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <IndexLink to="/" className="navbar-brand" activeStyle={{ color: '#FFFFFF' }}>HERBALIFE</IndexLink>
                </div>

                <div className="collapse navbar-collapse" id="mainNavBar">
                    <ul className="nav navbar-nav">
                        <li><NavLink to="/customers">Customers</NavLink></li>
                        <li><NavLink to="/orders">Orders</NavLink></li>
                        <li><NavLink to="/sales">Sales</NavLink></li>
                        <li><NavLink to="/inventory">Inventory</NavLink></li>
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}




const Home = (props) => {
    return <div><Links />{props.children}</div>
}


export default Home;
