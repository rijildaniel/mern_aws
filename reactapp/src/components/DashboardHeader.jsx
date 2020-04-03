import React, { Component } from 'react'


class DashboardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    logOut()    {
        sessionStorage.clear();
    }

    render() { 
        return ( 
            <nav className="navbar navbar-inverse nav-tabs navbar-fixed-top" style={{marginBottom: '5%', backgroundColor: 'black'}}>
            <div className="container">
                <div className="navbar-text" style={{'font-weight': 'bold'}}>
                    <a className="navbar-brand" href="/product/categories">Grocery Store</a>
                </div>
                <div className=" navbar-text" id="myNavbar" style={{'font-weight': 'bold'}}>
                        <div style={{'float': 'left', 'margin-right': '20px'}}><a className="navbar-brand" href="/product/placedOrder"><span className="glyphicon glyphicon-tag"></span> My Orders</a></div>
                        <div style={{'float': 'left', 'margin-right': '20px'}}><a className="navbar-brand" href="/product/mycart"><span className="glyphicon glyphicon-shopping-cart"></span> Cart - <font style={{color: 'red'}}>{this.props.cartValue}</font></a></div>
                        <div style={{'float': 'left', 'margin-right': '20px'}}><a className="navbar-brand" href="/login" onClick={() => this.logOut()}><span className="glyphicon glyphicon-log-in"></span> Logout</a></div>
                </div>
            </div>
        </nav>

         );
    }
}
 
export default DashboardHeader;