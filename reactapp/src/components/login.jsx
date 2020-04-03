import React, { Component } from 'react'
import HeaderComponent from './headercomponent';
import SecureCallService from '../services/securecallservice';
import { Link } from 'react-router-dom';
import SpinnerComponent from './SpinnerComponent';


class LoginComponent extends Component  {
    constructor(props)  {
        super(props);
        this.state = {
            Email: '',
            Password: '',
            isLoading: false
        };
        this.serv = new SecureCallService();
    }

    handleInput=(evt) => {
        this.setState({[evt.target.id]: evt.target.value})
    }

    

    logIn() {
        if(this.state.Email === '' || this.state.Password === '')    {
            alert('All input fields are required');
            return;
        }

        if(!this.state.Email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm))    {
            alert('Email Invalid');
            return;
        }

        if(!this.state.Password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/g))    {
            alert('Password not correct');
            return;
        }
        
        const user = {
            Email: this.state.Email,
            Password: this.state.Password
        }
        
        this.setState({isLoading: true});
        this.serv.login(user)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
                sessionStorage.setItem('email', this.state.Email);
                if(localStorage.getItem(`${this.state.Email}cart`) === null)
                    localStorage.setItem(`${this.state.Email}cart`, JSON.stringify([]));
                this.props.history.push('/product/categories');
            }
            else{
                alert('Unauthorized user');
            }
            this.setState({isLoading: false});
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
            this.setState({isLoading: false});
        });
    }

    componentDidMount() {
        if(sessionStorage.getItem('email') !== null)    {
            this.props.history.goBack();
        }
    }
   

    render()    {
        if(this.state.isLoading === true)   {
            return (
            <SpinnerComponent></SpinnerComponent>
            );
        }
        return (  
        <div>
            <HeaderComponent name="Login"></HeaderComponent>
        <div className="container">
          <center>
           <div className="panel-header">
                <p className="text-warning">Login to portal</p>
           </div>
           </center>
           <div className="panel-body">
              <center>
               <div className="form-group">
                  <input type="text"  id="Email" className="form-control"  style={{'width': '25%'}} placeholder="Email *" value={this.state.Email} onChange={this.handleInput.bind(this)} required/>            
               </div>
               <div className="form-group">
                  <input type="password" id="Password" className="form-control" style={{'width': '25%'}} value={this.state.Password} onChange={this.handleInput.bind(this)} placeholder="Password *" required/>
               </div> 
               <div className="form-group">
                   <input type="submit" name="submit" value="Sign in" className="btn btn-primary" onClick={this.logIn.bind(this)}/>
               </div>
               </center>
               <center>
               <div className="panel-footer">
                   Don't have an account? <Link to='/register'>Register</Link>
               </div>  
              </center> 
           </div>
        </div>
        </div> 
        );
    }
}

export default LoginComponent;