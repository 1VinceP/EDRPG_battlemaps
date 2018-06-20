import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleNav } from '../../redux/reducer';
import './nav.css';

class Nav extends Component {
    state = {

    }


    render() {
        const { navOpen, handleNav } = this.props

        return (
            <div className={navOpen ? 'nav-main nav-show' : 'nav-main'}>
                <Link to='/' className='link'><div className='nav-link' onClick={() => handleNav(!navOpen)}>Combat Maps</div></Link>
                <Link to='/character' className='link'><div className='nav-link' onClick={() => handleNav(!navOpen)}>Character Creator</div></Link>
                <Link to='/playercharacters' className='link'><div className='nav-link' onClick={() => handleNav(!navOpen)}>Your Characters</div></Link>
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

export default connect( mapStateToProps, { handleNav } )(Nav);