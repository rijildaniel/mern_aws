import React, { Component } from 'react'
import DataGridComponent from './DataGridComponent';
import {connect} from 'react-redux';
import DashboardHeader from './DashboardHeader';
import { addPrice } from '../redux/actions/actions';
import DisplayPriceComponent from './DisplayPriceComponent';
import FooterComponent from './FooterComponent';


class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [],
            cartVal: JSON.parse(localStorage.getItem('cart')).length
         }
    }

    componentDidMount() {
        
        let cartName;
        if(sessionStorage.getItem('email') !== null)
            cartName = `${sessionStorage.getItem('email')}cart`;
        else
            cartName = 'cart';
        this.setState({cartVal: JSON.parse(localStorage.getItem(cartName)).length});
    }

    delItem(value) {
        if(value === false) {
            let cartName;
            if(sessionStorage.getItem('email') !== null)
                cartName = `${sessionStorage.getItem('email')}cart`;
            else
                cartName = 'cart';
            this.setState({cartVal: JSON.parse(localStorage.getItem(cartName)).length});
        }
    }


    render() { 
        return ( 
            <div>
            <DashboardHeader cartValue={this.state.cartVal}></DashboardHeader>
            <DisplayPriceComponent></DisplayPriceComponent>
            <DataGridComponent id="Cart" dataSource={this.state.items} price={(price) => this.props.priceValue(price)} addItem={this.delItem.bind(this)}></DataGridComponent>
            <FooterComponent></FooterComponent>
            </div>
         );
    }
}

const mapDispatchToProps = dispatch => {
    return {
    priceValue: (item) => dispatch(addPrice(item))
    };
}
 

export default connect(null, mapDispatchToProps)(CartComponent);