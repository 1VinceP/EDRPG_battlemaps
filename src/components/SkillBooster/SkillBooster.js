import React from 'react';
import _ from 'lodash';
import injectSheet from 'react-jss';

function SkillBooster({ skills, index, val, selected, change, classes }) {
    const { boosterContainer, boosterValue } = classes;

    let skillOptions = _.orderBy( skills ).map( ( skill, i ) => <option key={i} value={skill}>{skill}</option> )

    return (
        <div className={boosterContainer}>
            <div className={boosterValue}>{val}</div>
            <select name={`learning ${val}`} onChange={e => change(e, val, index)} selected={selected}>
                {skillOptions}
            </select>
        </div>
    )
}

const styles = theme => ({
    boosterContainer: {
        display: 'flex',
        marginBottom: '-1px',

        '& select': {
            width: '100%'
        }
    },

    boosterValue: {
        width: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${theme.eliteOrange}`,
        borderRadius: '3px',
        borderRight: 'none',
        background: theme.darkBg
    },
});

export default injectSheet(styles)(SkillBooster);