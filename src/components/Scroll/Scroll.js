import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { useKarma } from '../../redux/characterReducer';
import { normalizeString } from '../../utils/helperMethods';

function Scroll({
    type, item, border, selected, onSelect, useKarma, index, data, small, // component props
    userid, uid, current_karma // redux props
}) {
    let styles = {
        head: {
            height: '24px',
            width: '100%',
            fontSize: '12px',
            border: `1px solid ${border || '#faa500'}`,
            borderRadius: '3px',
            background: '#212121',
            color: '#fff',
            display: 'flex',
            justifyContent: small ? 'center' : 'space-between',
            alignItems: 'center',
            marginBottom: '-1px',
            padding: '0 10px',
            position: 'relative',
            cursor: 'pointer',

            // styles based on if selected
            transform: selected ? 'scale(1.1)' : 'scale(1)',
            zIndex: selected ? 3 : 1,
            boxShadow: selected ? '6px 6px 10px #0008' : '3px 3px 6px #0008',
            animation: selected ? 'scrollSelect .25s' : 'scrollDeselect .5s'
        },

        drop: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            fontSize: '14px',
            position: 'absolute',
            left: 0,
            padding: '10px',
            paddingBottom: '6px',
            border: `1px solid ${border || '#faa500'}`,
            borderTop: 'none',
            borderRadius: '0 0 3px 3px',
            color: '#eee',
            background: 'linear-gradient(to bottom, #000000 0%,#212121 6%)',
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#212121',GradientType=0 )",
            zIndex: 2,
            cursor: 'default',
            overflow: 'hidden',

            // styles based on if selected
            height: selected ? '160px' : '0px',
            top: selected ? '19.5px' : '23px',
            visibility: selected ? 'visible' : 'hidden',
            transform: selected ? 'scale(.96)' : 'scale(1)',
            boxShadow: selected && '6px 6px 20px #0008',
            animation: selected ? 'dropSelect .45s' : 'dropDeselect .35s'
        },

        minorText: {
            fontStyle: 'italic',
            color: '#f0f'
        },

        button: {
            width: '100%',
            height: '24px',
            border: `1px solid ${border || '#faa500'}`,
            borderRadius: '3px',
            background: '#313132',
            color: '#fff',
            cursor: 'pointer'
        }
    }

    let scrollData = data || {
        cost: '', effect: '', situation: '', type: ''
    }

    return (
        <div style={styles.head} onClick={() => onSelect(index)}>
            <div>{normalizeString(item)}</div>
            <div>{scrollData.cost}</div>
            <div style={styles.drop}>
                <div>{scrollData.effect}</div>
                { type === 'karma' && // display karma type if exists
                    <div style={styles.minorText}>
                        {normalizeString(scrollData.situation)} - {normalizeString(scrollData.type)}
                    </div>
                }
                { userid === uid * 1 && type === 'karma' // display use karma if exists
                    ? <button style={styles.button} onClick={() => useKarma(current_karma, scrollData.cost)}>Use this ability</button>
                    : null
                }
            </div>
        </div>
    )
}

function mapStateToProps( state ) {
    const { userid } = state.auth.user;
    const { userid: uid, current_karma } = state.character.character;

    return {
        userid,
        uid, current_karma
    };
}

export default connect( mapStateToProps, { useKarma } )(Scroll)