import React, { Component } from 'react';
import SecureCallService from '../services/securecallservice';
import SpinnerComponent from './SpinnerComponent';



class DataGridComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [],
            selectedPrds: [],
            disabledBuySelected: false,
            disableBuy: [],
            view: 'none',
            isLoading: false
         }
        this.serv = new SecureCallService();
    }

    addToCart(data) {
        if(sessionStorage.getItem('email') !== null)    {
            let items = JSON.parse(localStorage.getItem(`${sessionStorage.getItem('email')}cart`));
            items.push(data);
            localStorage.setItem(`${sessionStorage.getItem('email')}cart`, JSON.stringify(items));
            alert('Added to cart');
            this.props.addItem(true);
            return;
        }
        if(localStorage.getItem('cart') !== null)   {
            let items = JSON.parse(localStorage.getItem('cart'));
            items.push(data);
            localStorage.setItem('cart', JSON.stringify(items));
            alert('Added to cart');
            this.props.addItem(true);
        }
    }

    deleteItem(evt)    {
        let selectedValue = this.state.selectedPrds;
        for(var i in selectedValue)  {
            selectedValue[i] = false;
        }
        this.props.price(-this.state.items[parseInt(evt.target.value)].Price);
        this.setState({selectedPrds: selectedValue});
        if(sessionStorage.getItem('email') !== null)    {
            let items = JSON.parse(localStorage.getItem(`${sessionStorage.getItem('email')}cart`));
            items.splice(parseInt(evt.target.value), 1);
            if(items.length === 0)
                this.setState({view: 'none'});
            localStorage.setItem(`${sessionStorage.getItem('email')}cart`, JSON.stringify(items))
            this.setState({items: items});
            this.props.addItem(false);
        }
        else
        if(localStorage.getItem('cart') !== null)   {
            let items = JSON.parse(localStorage.getItem('cart'));
            items.splice(parseInt(evt.target.value), 1);
            if(items.length === 0)
                this.setState({view: 'none'});
            localStorage.setItem('cart', JSON.stringify(items))
            this.setState({items: items});
            this.props.addItem(false);
        }
    }

    buyNow(evt, request, option="buy")    {
        if(sessionStorage.getItem('email') === null)    {
            alert('Login to buy Items');
            return;
        }
        
        this.setState({isLoading: true});
        if(option === "buySelected")    {
            this.setState({disabledBuySelected: true});
            let orders = [];
            let order;
            let value = 0;
            for(var i in this.state.selectedPrds)   {
                
                if(this.state.selectedPrds[i] === true) {
                    value += request[i].Price;
                    order = {
                        Email: sessionStorage.getItem('email'),
                        CategoryId: request[i].CategoryId,
                        ItemId: request[i].ItemId,
                        Price: request[i].Price
                    };
                    orders.push(order);
                }
            }
            this.props.price(-value);

            console.log(orders);
            
            this.serv.placeOrders({orders: orders})
            .then((result) => {
                console.log(result);
                if(result.data.statusCode === 200)  {
                    alert('Order Accpeted for selected products');
                }
                this.setState({isLoading: false});
                this.setState({disabledBuySelected: false});
                
            })
            .catch((error) => {
                console.log(error);
                alert('Error Placing order');
                this.setState({isLoading: false});
                this.setState({disabledBuySelected: false});
            })
        }
        else {
           
        let order = {
            Email: sessionStorage.getItem('email'),
            CategoryId: request.CategoryId,
            ItemId: request.ItemId,
            Price: request.Price
        }
    
        let tempDisable = this.state.disableBuy;
        tempDisable[parseInt(evt.target.value)] = false;
        this.setState({disableBuy: tempDisable})

        this.serv.placeOrder(order)
        .then((result) => {
            console.log(result);
            if(result.data.statusCode === 200)  {
                if(option === 'buy')    {
                    this.props.login(false);
                }
                alert('Order Accepted');
                this.setState({isLoading: false});
            }
            
        })
        .catch((error) => {
            console.log(error);
            alert('Error Placing order');
            this.setState({isLoading: false});
        })
        }
        let selectedValue = this.state.selectedPrds;
        for(var i in selectedValue)  {
            selectedValue[i] = false;
        }
        this.setState({selectedPrds: selectedValue});
    }

    mainCheckBox(evt, prds)  {
        let value = 0;
        let selectedValue = this.state.selectedPrds;
        if(evt.target.checked === true) {
            for(var i in prds)  {
                if(selectedValue[i] !== true)   {
                    selectedValue[i] = true;
                    value += prds[i].Price;
                }
            }
            this.setState({selectedPrds: selectedValue});
            this.props.price(value);
        }
        else {
            for(var i in prds)  {
                if(selectedValue[i] !== false)  {
                    selectedValue[i] = false;
                    value += prds[i].Price;
                }
            }
            this.setState({selectedPrds: selectedValue});
            this.props.price(-value);
        }
    }

    rowClick(data, option)  {
        if(option === "CategoryId") {
            this.props.rowData(data.CategoryId);
        }
        if(option === "Order") {
            this.props.rowData(data.ItemId);
        }
    }

    componentDidMount() {
        let cartName;
        if(sessionStorage.getItem('email') !== null)    {
            cartName = `${sessionStorage.getItem('email')}cart`;
        }
        else
            cartName = 'cart'
        if(localStorage.getItem(cartName) !== null)   {
            let items = JSON.parse(localStorage.getItem(cartName));
            if(items.length !== 0)
                this.setState({view: 'table'});
            let selectedValue = [];
            let buttonValues = [];
            for(var i in items) {
                selectedValue.push(false);
                buttonValues.push(false);
            }
            this.setState({disableBuy: buttonValues});
            this.setState({selectedPrds: selectedValue});
            this.setState({items: items});
        }
    }

    handleCheckBox(evt, price)    {
        let selectedValue = this.state.selectedPrds;
        selectedValue[parseInt(evt.target.value)] = evt.target.checked;
        this.setState({selectedPrds: selectedValue});
        if(evt.target.checked === true) {
            this.props.price(price);
        }
        else {
            this.props.price(-price);
        }
    }


    render() { 
        let columns =[];
        for(let c in this.props.dataSource[0])  {
            columns.push(c);
        }
        let data = this.props.dataSource;
        if(this.state.isLoading === true)   {
            return (
                <SpinnerComponent></SpinnerComponent>
            );
        }
        if(this.props.id === "CategoryId" || this.props.id === "Orders")  {
            return ( 
            <div className="container">
            <table className="table table-bordered table-hover table-active">
                <thead>
                <tr>
                    {
                        columns.map((c,i) => (
                            <th key={i}>{c}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    data.map((d,j) => (
                        <tr key={j} onClick={() => this.rowClick(d, this.props.id)}>
                            {
                                
                                columns.map((c,i) => (
                                    <td key={i}>{d[c]}</td>
                                ))
                            }
                        </tr>
                            
                        ))
                }
                </tbody>
            </table>
            </div>
            );
    }
    if(this.props.id === "ItemId")  {
        
        return ( 
            <div className="container">
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    {
                        columns.map((c,i) => (
                            <th key={i}>{c}</th>
                        ))
                    }
                    <th>Delete</th>
                    <th>Buy</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((d,j) => (
                        <tr key={j} >
                            {

                                columns.map((c,i) => (
                                    <td key={i}>{d[c]}</td>
                                ))
                            }
                            <td><button className="btn btn-primary" onClick={() => this.addToCart(d)}>Add to Cart</button></td>
                            <td><button className="btn btn-warning" onClick={(evt) => this.buyNow(evt,d)}>Buy Now</button></td>
                        </tr>
                            
                        ))
                }
                </tbody>
            </table>
            </div>
            );
            }
            if(this.props.id === "Cart")  {
                let columns =[];
                for(let c in this.state.items[0])  {
                    columns.push(c);
                }
                return ( 
                    <div className="container" style={{display: this.state.view}}>
                    <button className="btn btn-warning" style={{marginBottom: '2%'}} onClick={(evt) => this.buyNow(evt,this.state.items, "buySelected")} disabled={this.state.disabledBuySelected}>Buy Selected</button>
                    <table className="table table-bordered table-striped table-dark">
                        <thead>
                        <tr>
                            <th><input type="checkbox" className="custom-control custom-checkbox"  onClick={(evt) => this.mainCheckBox(evt, this.state.items)}/></th>
                            {
                                columns.map((c,i) => (
                                    <th key={i}>{c}</th>
                                ))
                            }
                            <th>Cart</th>
                            <th>Buy</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                                this.state.items.map((d,j) => (
                                <tr key={j} >
                                    <td><input type="checkbox" className="custom-control custom-checkbox" value={j} onClick={(evt) => this.handleCheckBox(evt, d.Price)} checked={this.state.selectedPrds[j]}/></td>
                                    {
        
                                        columns.map((c,i) => (
                                            <td key={i}>{d[c]}</td>
                                        ))
                                    }
                                    <td><button className="btn btn-danger" value={j} onClick={(evt) => this.deleteItem(evt)} disabled={this.state.disableBuy[j]}>Delete</button></td>
                                    <td><button className="btn btn-warning" value={j} onClick={(evt) => this.buyNow(evt,d, 'cart')}>Buy Now</button></td>
                                </tr>
                                    
                                ))
                        }
                        </tbody>
                    </table>
                    </div>
                    );
            }
    }

}



 
export default DataGridComponent;