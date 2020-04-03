import React, { Component } from 'react'
import SecureCallService from '../services/securecallservice';
import DataGridComponent from './DataGridComponent';
import DashboardHeader from './DashboardHeader';
import SpinnerComponent from './SpinnerComponent';
import FooterComponent from './FooterComponent';

class PlaceOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orders: [],
            cartVal: 0,
            price: 0,
            isLoading: true
         }
        this.serv = new SecureCallService();
    }

    componentDidMount() {
        let email = sessionStorage.getItem('email');
        let cartName;
        if(sessionStorage.getItem('email') !== null)
            cartName = `${sessionStorage.getItem('email')}cart`;
        else
            cartName = 'cart';
        this.setState({cartVal: JSON.parse(localStorage.getItem(cartName)).length});
        if(email !== null)  {
            this.serv.getOrders(email)
            .then((result) => {
                let orderList = result.data.data;
                let value= 0;
                this.setState({orders: orderList});
                for(var i in orderList)  {
                    value += orderList[i].Price;
                }
                this.setState({isLoading: false})
                this.setState({price: value})
            })
            .catch((error) => {
                console.log(error);
                alert('Error');
                this.props.history.push('/login');
            })
        }
        else {
            alert('Please login and buy item');
            this.props.history.push('/login');
        }
    }
    selectedData(value) {
        this.props.history.push('/product/getItemInfo');
    }

    render() { 
        if(this.state.isLoading === true)   {
            return (
            <SpinnerComponent loading={this.state.isLoading}></SpinnerComponent>
            );
        }
        return ( 
            <div>
                <DashboardHeader cartValue={this.state.cartVal}></DashboardHeader>
                <h2 className="container text-success" style={{marginBottom: '2%'}}>My Orders: </h2>
                <DataGridComponent id="Orders" dataSource={this.state.orders} rowData={this.selectedData.bind(this)}></DataGridComponent>
                <div className="container">
                <div className="jumbotron" style={{paddingTop: '2%', paddingBottom: '2%', paddingLeft: '60%'}}>
                <h3 className="text text-primary" style={{fontWeight: 'bold', marginLeft: '130px'}}>
                Total Price -  {this.state.price}
                </h3>
                </div>
                </div>
                <FooterComponent></FooterComponent>
            </div>
         );
    }
}
 
export default PlaceOrderComponent;