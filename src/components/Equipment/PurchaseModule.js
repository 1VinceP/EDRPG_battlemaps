import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { importCharacter } from '../../redux/characterReducer';
import ranged from '../../data/ranged_weapons.json';
import melee from '../../data/melee_weapons.json';
import grenades from '../../data/grenades.json';
import './purchaseModule.css';

class PurchaseModule extends Component {
    state = {
        cost: 0,
        equipId: 0,
        alias: ''
    }

    setEquipment( e ) {
        let value = e.target.value.split(',')

        this.setState({
            equipId: value[0] * 1,
            cost: value[1] * 1,
            ammo: value[2]
        })
    }

    handleMoney( e ) {
        this.setState({ cost: e.target.value * 1 })
    }
    handleAlias( e ) {
        this.setState({ alias: e.target.value })
    }

    buyEquipment() {
        const { type, userid, uid, cid, name, credits } = this.props;
        const { equipId, cost } = this.state;
        let alias = this.state.alias ? this.state.alias : ''
        let ammo = this.state.ammo !== 'N/A' ? this.state.ammo : null
        let url = type === 'ranged' ? '/api/addRanged'
                    : type === 'melee' ? '/api/addMelee'
                    : type === 'grenades' && '/api/addGrenade'

        if( equipId >= 1 ) {
            let value = credits - cost;
            axios.post( `${url}/${userid}/${cid}`, { userid: uid, id: equipId, value, alias, ammo } )
                .then( () => {
                    this.props.importCharacter( cid, name )
                    this.props.handlePurchase()
                } )
        }
    }

    render() {
        const { type, userid, uid, characterIsSaved } = this.props;

        let equipment = type === 'ranged' ? _.orderBy( ranged, ['name'] )
                        : type === 'melee' ? _.orderBy( melee, ['name'] )
                        : type === 'grenades' ? _.orderBy( grenades, ['name'] ) : null

        let equipOptions = equipment.map( (equip, i) => {
            const { id, cost, name } = equip
            let ammo = equip.ammo ? equip.ammo : ''
            return <option key={i} value={[id, cost, ammo]}>{name}</option>
        } )

        return (
            <div className='pm-main'>
                <select onChange={e => this.setEquipment(e)}>
                    {equipOptions}
                </select>

                <input value={this.state.cost} onChange={e => this.handleMoney(e)} />

                { type !== 'grenades' && <input value={this.state.alias} onChange={e => this.handleAlias(e)} /> }

                <button onClick={() => this.buyEquipment()} disabled={!characterIsSaved}>Purchase</button>
            </div>
        )
    }
}

function mapStateToProps( state ) {
    const { userid } = state.auth.user;
    const { userid: uid, cid, name, credits } = state.character.character;
    const { characterIsSaved } = state.character;


    return {
        userid,
        uid,
        cid,
        name,
        credits,
        characterIsSaved
    };
}

export default connect( mapStateToProps, { importCharacter } )(PurchaseModule);