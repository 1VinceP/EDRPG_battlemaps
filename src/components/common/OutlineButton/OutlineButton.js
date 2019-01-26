import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import styles from './outlineButtonsStyles';

const OutlineButton = ({ classes, children, onClick, isNav }) => {
   const buttonStyle = isNav
      ? classes.navButton
      : classes.button

   return (
      <button className={buttonStyle} onClick={onClick}>{children}</button>
   )
}

OutlineButton.propTypes = {
   onClick: PropTypes.func,
   isNav: PropTypes.bool,
   // jss styles //
   color: PropTypes.string,
   border: PropTypes.string,
   size: PropTypes.objectOf(
      PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.number,
      ])
   ),
}

OutlineButton.defaultProps = {
   onClick: () => { },
   isNav: false,
   // jss styles //
   color: '',
   border: '',
   size: { w: '', h: '' },
}

export default injectSheet(styles)(OutlineButton);