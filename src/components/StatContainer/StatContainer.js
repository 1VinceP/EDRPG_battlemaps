import React from 'react';
import { normalizeString } from '../../utils/helperMethods';

export default function StatContainer({ stats, border }) {
    let large = false;
    if( stats.length > 5) { large = true }

    let small = false;
    if( stats.length < 5 ) { small = true }

    const styles = {
        container: {
            height: '100%',
            width: '45%',
            display: 'flex',
            flexDirection: large ? 'row' : 'column',
            flexWrap: 'wrap',
            marginRight: large ? '1px' : 0 // correct the border aligning in item
        },

        item: {
            width: large ? '48%' : '100%',
            height: small ? '25%' : '20%',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            border: `1px solid ${border}`,
            borderRadius: '3px',
            marginTop: '-1px',
            marginRight: large ? '-1px' : 0,
            background: '#212121'
        }
    }

    let items = stats.map( (item, i) => {
        return <div key={i} style={styles.item}>{normalizeString(item)}</div>
    } )

    return (
        <div style={styles.container}>
            {items}
        </div>
    )
}