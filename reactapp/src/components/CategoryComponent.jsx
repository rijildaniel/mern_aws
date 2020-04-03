import React, { Component } from 'react'
import DataGridComponent from './DataGridComponent';
import SecureCallService from '../services/securecallservice';
import DashboardHeader from './DashboardHeader';
import SpinnerComponent from './SpinnerComponent';
import FooterComponent from './FooterComponent';

class CategoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            categories: [],
            cartVal: 0,
            isLoading: true
         }
         this.serv = new SecureCallService();
    }

    componentDidMount() {
        this.serv.getCategoriesData()
        .then((result) => {
            if(result.data.statusCode === 200)  {
                this.setState({categories: result.data.data});
            }
            this.setState({isLoading: false});
        })
        .catch((error) => {
            console.log(`Error - ${error}`);
            this.props.history.push('/login');
        });
        let cartName;
        if(sessionStorage.getItem('email') !== null)
            cartName = `${sessionStorage.getItem('email')}cart`;
        else
            cartName = 'cart';
        this.setState({cartVal: JSON.parse(localStorage.getItem(cartName)).length});
    }
    getRowData(value)   {
        this.props.history.push(`/product/categories/${value}`);
    }


    render() { 
        if(this.state.isLoading === true)   {
            return (
            <SpinnerComponent></SpinnerComponent>
            );
        }
        return ( 
            <div>
            <DashboardHeader name="Category" cartValue={this.state.cartVal} ></DashboardHeader>
            <h2 className="container text-success" style={{marginBottom: '2%'}}>Category of Items</h2>
            <DataGridComponent id="CategoryId" dataSource={this.state.categories} rowData={this.getRowData.bind(this)}></DataGridComponent>
            <FooterComponent></FooterComponent>
            </div>
         );
    }
}
 
export default CategoryComponent;