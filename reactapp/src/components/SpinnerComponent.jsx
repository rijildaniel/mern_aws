import React, { Component } from 'react'


class SpinnerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="d-flex justify-content-center" style={{marginTop: '20%'}}>
            <div className="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
            </div>
         );
    }
}
 
export default SpinnerComponent;