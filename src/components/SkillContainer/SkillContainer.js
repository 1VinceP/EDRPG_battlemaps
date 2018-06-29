import React, { Component } from 'react';
import _ from 'lodash';
import './skillContainer.css';

class SkillContainer extends Component {
    state = {
        checkedArr: []
    }

    componentDidMount() {
        this.setState({ checkedArr: this.props.checkedArr })
    }

    componentDidUpdate( prevProps ) {
        if( prevProps.checkedArr !== this.props.checkedArr ) {
            // console.log( 'PROPS UPDATED!!' )
            this.setState({ checkedArr: this.props.checkedArr })
        }
    }

    normalizeString(str) {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    render() {
        const { title, skills, onCheck }  = this.props
        const { checkedArr } = this.state
        let skillsArr = []

        _.forIn( skills, ( value, key ) => {
            skillsArr.push({ name: key, value })
        } )

        let mappedArr = skillsArr.map( ( skill, i ) => {
            let checked = false
            let found = _.findIndex( checkedArr, s => s === skill.name )
            if( found >= 0 ) checked = true

            return (
                <div key={i} className='sb-skill'>
                    <div style={{flex: 2}}>{this.normalizeString(skill.name)}</div>
                    <div style={{flex: 1, textAlign: 'center'}}>{skill.value}</div>
                    <div style={{flex: 1, textAlign: 'right', color: '#eee'}}><b>{Math.floor(skill.value / 10)}</b></div>
                    <input className='sb-check' type='checkbox' onChange={() => onCheck(skill.name)} checked={checked} />
                </div>
            )
        } )

        return (
            <div className='skill-box'>
                <div className='sb-title'>{title}</div>
                {mappedArr}
            </div>
        )
    }
}

export default SkillContainer;