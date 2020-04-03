import React, { Component } from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import LoginComponent from './login';
import RegisterComponent from './signup';
import CategoryComponent from './CategoryComponent';
import ItemComponent from './ItemComponent';
import CartComponent from './CartComponent';
import PlaceOrderComponent from './PlacedOrderComponent';



class MainComponent extends Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem('cart') === null || '')   {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        this.state = {  }
    }
    render() { 
        return (           
              
            <Switch>
                <Route exact path="/login" component={LoginComponent}></Route>
                <Route exact path="/register" component={RegisterComponent}></Route>
                <Route exact path="/product/categories" component={CategoryComponent}></Route>
                <Route exact path="/product/categories/:itemId" component={ItemComponent}></Route>
                <Route exact path="/product/mycart" component={CartComponent}></Route>
                <Route exact path="/product/placedOrder" component={PlaceOrderComponent}></Route>
                <Redirect to="/login"/>
            </Switch>
          );
    }
}
 
export default MainComponent;