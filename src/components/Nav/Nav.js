import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleNav } from '../../redux/shipReducer';
import DiceRoller from './DiceRoller';
import './nav.css';

class Nav extends Component {
    state = {

    }


    render() {
        const { navOpen, handleNav } = this.props

        return (
            <div className={navOpen ? 'nav-main nav-show' : 'nav-main'}>
                <div className='nav-container'>
                    { !this.props.user.userid
                        ? <a href={process.env.REACT_APP_LOGIN} className='link'><button className='nav-link nav-auth'>Login</button></a>
                        : <a href={process.env.REACT_APP_LOGOUT} className='link'><button className='nav-link nav-auth'>Logout</button></a>
                    }
                    <div className='nav-spacer' />
                    <Link to='/' className='link'><div className='nav-link' onClick={() => handleNav(!navOpen)}>Combat Maps</div></Link>
                    <Link to='/createcharacter' className='link'><div className='nav-link' onClick={() => handleNav(!navOpen)}>Character Creator</div></Link>
                    <Link to='/playercharacters' className='link'><div className='nav-link' onClick={() => handleNav(!navOpen)}>Your Characters</div></Link>

                    <DiceRoller />
                </div>
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

export default connect( mapStateToProps, { handleNav } )(Nav);