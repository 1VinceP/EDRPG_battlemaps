import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './header.css';

class Header extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div className='header-main'>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Header);