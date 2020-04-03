import React, { Component } from 'react'
import HeaderComponent from './headercomponent';
import SecureCallService from '../services/securecallservice';
import ValidationComponent from './ValidationComponent';


class RegisterComponent extends Component   {
    constructor(props)   {
        super(props);
        this.state = {
            Email: '',
            UserName: '',
            Password: '',
            PhoneNo: '',
            Address: '',
            uniqueEmail:true,
            strgpass: false,
            nameValid: true,
            phoneValid: false,
            disableSave: true
         };
         this.serv = new SecureCallService();
    }

    clearInputs=() => {
        this.setState({Email: ''});
        this.setState({Password: ''});
        this.setState({UserName: ''});
        this.setState({PhoneNo: ''});
        this.setState({Address: ''});

    }

    RegisterUser=()=>{
        if(!this.state.Email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm))    {
            alert('Email Invalid');
            console.log(this.state.Email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/g))
            return;
        }
        const user = {
            Email: this.state.Email,
            Password: this.state.Password,
            Name: this.state.UserName,
            PhoneNo: parseInt(this.state.PhoneNo),
            Address: this.state.Address
        };
        this.serv.register(user)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
                console.log(JSON.stringify(response.data));
                alert('Added the record successfully');
                this.clearInputs();
                this.props.history.push('/login');
            }
            else{
                alert('Something went wrong');
            }
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
        });

    }

    handleInput=(evt) => {
        this.setState({[evt.target.id]: evt.target.value}, () => {
            if(this.state.Email !== '' && this.state.Password !== '' && this.state.UserName !== '' && this.state.PhoneNo !== 0
        && this.state.Address !== '')   {
            this.setDisableSave(false);
        }
        else 
            this.setDisableSave(true);
        });
        
    }

    setDisableSave(value)    {
        if(this.state.uniqueEmail === true && this.state.nameValid === true && this.state.phoneValid === true && this.state.strgpass === true)  {
            this.setState({disableSave: value});
        }
    }

    checkForEmailID(evt)  {

        let emailInfo = {
            Email: this.state.Email
        };
        
        this.serv.checkForUniqueId(emailInfo)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
            console.log(JSON.stringify(response.data));
            this.setState({uniqueEmail: false});

            }
            else{
                this.setState({uniqueEmail: true});
            }
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
        });
    }


    checkName(value)  {
        console.log(value);
        if(this.state.nameValid !== value)   {
            this.setState({nameValid: value});
        }
    }

    checkPwd(value)  {
        if(this.state.strgpass !== value)   {
            this.setState({strgpass: value});
        }
    }

    checkPhoneNum(value) {
        if(this.state.phoneValid !== value)   {
            this.setState({phoneValid: value});
        }
    }

    render()    {
        return (
        <div>
        <HeaderComponent name="Register"></HeaderComponent>
        <div className="container">
        <h3 style={{'font-weight': 'bold'}}>SIGN UP</h3>
           <div className="form-group">
              <input type="email" placeholder="Email *" className="form-control" style={{'width': '25%'}} value={this.state.Email} onChange={this.handleInput.bind(this)} onBlur={this.checkForEmailID.bind(this)} id="Email"  required/>
              <ValidationComponent name="Email" data={this.state.uniqueEmail}></ValidationComponent>
           </div>
           <div className="form-group">
              <input type="password" placeholder="Password *" className="form-control" style={{'width': '25%'}} value={this.state.Password} onChange={this.handleInput.bind(this)} id="Password"  required/>
              <ValidationComponent name="Password" data={this.state.Password} Valid={this.checkPwd.bind(this)}></ValidationComponent>
           </div>
           <div className="form-group">
              <input type="text" placeholder="Name *" className="form-control" style={{'width': '25%'}} value={this.state.UserName} onChange={this.handleInput.bind(this)} id="UserName"  required/>
              <ValidationComponent name="Name" data={this.state.UserName} Valid={this.checkName.bind(this)}></ValidationComponent>
           </div>
           <div className="form-group">
              <input type="text" placeholder="Phone No. *" className="form-control" style={{'width': '25%'}} value={this.state.PhoneNo} onChange={this.handleInput.bind(this)} id="PhoneNo"  required/>
              <ValidationComponent name="Phone" data={this.state.PhoneNo} Valid={this.checkPhoneNum.bind(this)}></ValidationComponent>
           </div>
           <div className="form-group">
              <textarea type="textarea" placeholder="Address *" className="form-control" style={{'width': '25%'}} value={this.state.Address} onChange={this.handleInput.bind(this)} id="Address" rows="5" cols="30" required></textarea>
           </div>
           <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-primary" onClick={this.RegisterUser} name="submit" disabled={this.state.disableSave}/>
           </div> 
        </div>
        </div>
        );
    }
}

export default RegisterComponent;