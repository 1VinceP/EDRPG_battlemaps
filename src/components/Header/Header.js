import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleNav } from '../../redux/reducer';
import './header.css';

class Header extends Component {
    render() {
        const { handleNav, navOpen, children } = this.props

        return (
            <div className='header-main'>
                <nav className='menu-button' onClick={() => handleNav( !navOpen )}>Menu</nav>
                {children}
            </div>
        )
    }
}

function mapStateToProps( state ) {
    const { navOpen } = state;

    return {
        navOpen
    };
}

export default connect( mapStateToProps, { handleNav } )(Header);