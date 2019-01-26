import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { handleNav } from '../../redux/shipReducer';
import DiceRoller from './DiceRoller';
import { OutlineButton } from '../common';
import styles from './navStyles';

function Nav({ classes, navOpen, handleNav, user }) {
   const { navShow, navHide, navContainer } = classes;

   return (
      <div className={navOpen ? navShow : navHide}>
         <div className={navContainer}>
            {!user.userid
               ? <a href={process.env.REACT_APP_LOGIN} className='link'><OutlineButton isNav>Login</OutlineButton></a>
               : <div className='username'>{user.username}</div>
            }

            <div className='spacer' />
            <Link to='/' className='link'>
               <OutlineButton isNav onClick={() => handleNav(!navOpen)}>Combat Maps</OutlineButton>
            </Link>
            <Link to='/createcharacter' className='link'>
               <OutlineButton isNav onClick={() => handleNav(!navOpen)}>Character Creator</OutlineButton>
            </Link>
            <Link to='/playercharacters' className='link'>
               <OutlineButton isNav onClick={() => handleNav(!navOpen)}>Your Characters</OutlineButton>
            </Link>

            {user.userid
               && <>
                  <div className='spacer' />
                  <a href={process.env.REACT_APP_LOGOUT} className='link'>
                     <OutlineButton isNav border='#f44e42' color='red'>
                        Logout
                     </OutlineButton>
                  </a>
               </>
            }

            <DiceRoller />
         </div>
      </div>
   )
}

function mapStateToProps(state) {
   const { navOpen } = state.ship;
   const { user } = state.auth

   return {
      navOpen,
      user
   };
}

export default injectSheet(styles)(connect(mapStateToProps, { handleNav })(Nav));