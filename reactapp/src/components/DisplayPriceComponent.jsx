import React, { Component } from 'react'
import {connect} from 'react-redux';

class DisplayPriceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container">
            <div className="jumbotron" style={{paddingTop: '2%', paddingBottom: '2%'}}>
            <h3 className="text text-primary" style={{fontWeight: 'bold', marginLeft: '130px'}}>
               Total Price -  {this.props.priceValue}
            </h3>
            </div>
            </div>
         );
    }
}

const mapStateToProps=state => {
    return {
        priceValue: state.priceReducer
    }
}
 
export default connect(mapStateToProps)(DisplayPriceComponent);