import React,{Component} from 'react';
import SecureCallService from '../services/securecallservice';

class ValidationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            setValidId: true,
            setValidName: true,
            setValidPhone: true,
            setStrgPass: true,
            setEmailValid: true
        }
        this.serv = new SecureCallService();
    }

    

    validateForm(name, value)   {

    
        if(name === "Name")  {
            if(value.length > 30 || !value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g) && value !== '')   {
                if(false !== this.state.setValidName)   {
                    this.setState({setValidName: false});
                    this.props.Valid(false);
                }
            } 
            else{
                if(true !== this.state.setValidName)    {
                    this.setState({setValidName: true});
                this.props.Valid(true);
                }
            }
        }
        
        if(name === 'Phone') {
            if(!value.toString().match(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/g) && value.toString() !== '') {
                if(false !== this.state.setValidPhone)  {
                    this.setState({setValidPhone: false})
                    this.props.Valid(false);
                }
            }
            else{
                if(true !== this.state.setValidPhone)  {
                    this.setState({setValidPhone: true})
                    this.props.Valid(true);
                }
            }
        }

        if(name === 'Password') {
            
            if(!value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/g) && value !== '') {
                if(this.state.setStrgPass !== false)    {
                    this.setState({setStrgPass: false});
                    this.props.Valid(false);
                }
            }
            else{
                if(this.state.setStrgPass !== true) {
                    this.setState({setStrgPass: true});
                    this.props.Valid(true);
                }
            }
        }

    }

    

    render()    {
        this.validateForm(this.props.name, this.props.data);
        if(this.props.name === 'Phone') { 
            return (
                <div hidden={this.state.setValidPhone} className="alert alert-danger" style={{'width': '25%'}}>Phone Number is invalid </div>
            );
        }
        if(this.props.name === 'Name') { 
            return (
                <div hidden={this.state.setValidName} className="alert alert-danger" style={{'width': '25%'}}>Student Name should contain only alphabets </div>
            );
        }

        if(this.props.name === 'Email')  {
            return (
                <div hidden={this.props.data} style={{'width': '25%'}} className="alert alert-danger">Email Id already exist</div>
            );
        }
        
        if(this.props.name === 'Password')  {
            return (
                <div hidden={this.state.setStrgPass} style={{'width': '25%'}} className="alert alert-danger">Password - Minimum 6 character <br/> Minimum <br/> one uppercase alphabet <br/> one lowercase alphabet <br/> one number <br/> one special character </div>
            );
        }

    }
}

export default ValidationComponent;