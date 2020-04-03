import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const stylefooter = {
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '2%',
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center'
          }
        return ( 
            <div className="footer modal-footer" style={stylefooter}></div>
         );
    }
}
 
export default FooterComponent;