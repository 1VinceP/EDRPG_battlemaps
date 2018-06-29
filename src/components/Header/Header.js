import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../redux/authReducer';
import { handleNav } from '../../redux/shipReducer';
import './header.css';

class Header extends Component {

    componentDidMount() {
        if( !this.props.user.userid ) {
            axios.get( '/auth/me' )
                .then( response => this.props.setUser( response.data ) )
        }
    }

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
    const { navOpen } = state.ship;
    const { user } = state.auth

    return {
        navOpen,
        user
    };
}

export default connect( mapStateToProps, { handleNav, setUser } )(Header);