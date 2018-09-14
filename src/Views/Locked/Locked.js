import React from 'react';
import injectSheet from 'react-jss';
import styles from './lockedStyles';
import lockIcon from '../../assets/lock-icon.svg';
import Header from '../../components/Header/Header';

function Locked( props ) {
    const { main, lock, text } = props.classes

    return (
        <div className={main}>
            <Header />
            <img className={lock} src={lockIcon} />
            <div className={text}>This page is locked to you</div>
        </div>
    )
}

export default injectSheet(styles)(Locked);

