import React, { Component } from 'react'
import DataGridComponent from './DataGridComponent';
import SecureCallService from '../services/securecallservice';
import DashboardHeader from './DashboardHeader';
import SpinnerComponent from './SpinnerComponent';
import FooterComponent from './FooterComponent';

class ItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [],
            cartVal: '',
            isLoading: true
         }
        this.serv = new SecureCallService();
    }

    goToLogin(value) {
        if(value === true)  {
            this.props.history.push('/login');
        }
        else{
            this.props.history.push('/product/placedOrder');
        }
    }

    
    componentDidMount() {
        let itemId = this.props.match.params.itemId;
        this.serv.getItemsData(itemId)
        .then((result) => {
            this.setState({items: result.data.data});
            this.setState({isLoading: false});
        })
        .catch((error) => {
            console.log(`Error - ${error}`);
            this.props.history.push('/products/categories');
        });
        let cartName;
        if(sessionStorage.getItem('email') !== null)
            cartName = `${sessionStorage.getItem('email')}cart`;
        else
            cartName = 'cart';
        this.setState({cartVal: JSON.parse(localStorage.getItem(cartName)).length});
    }

    itemAdd(value)   {
        if(value === true)  {
            let cartName;
            if(sessionStorage.getItem('email') !== null)
                cartName = `${sessionStorage.getItem('email')}cart`;
            else
                cartName = 'cart';
            this.setState({cartVal: JSON.parse(localStorage.getItem(cartName)).length});
        }
    }

    render() { 
        if(this.state.isLoading === true)   {
            return (
            <SpinnerComponent loading={this.state.isLoading}></SpinnerComponent>
            );
        }
        return ( 
            <div>
            <DashboardHeader name="Item" cartValue={this.state.cartVal}></DashboardHeader>
            <h2 className="container text-success" style={{marginBottom: '2%'}}>Items</h2>
            <DataGridComponent id="ItemId" dataSource={this.state.items} login={this.goToLogin.bind(this)} addItem={this.itemAdd.bind(this)}></DataGridComponent>
            <FooterComponent></FooterComponent>
            </div>
         );
    }
}


 
export default ItemComponent;