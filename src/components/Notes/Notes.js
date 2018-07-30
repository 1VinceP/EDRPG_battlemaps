import React, { Component } from 'react';
import axios from 'axios';
import './notes.css';

class Notes extends Component {
    state = {
        displayNotes: '',
        saveNotes: ''
    }

    // componentDidMount() {
    //     this.setState({
    //         displayNotes: this.props.notes.replace( /^\<br\>$/g, '\n' ),
    //         saveNotes: this.props.notes
    //     })
    // }

    componentDidUpdate( prevProps ) {
        if( this.props.notes !== prevProps.notes ) {
            this.setState({
                displayNotes: this.props.notes.replace( /[<]\bbr\b[>]/g, '\n' ),
                saveNotes: this.props.notes
            })
        }
    }

    componentWillUnmount() {
        if( this.props.notes !== this.state.saveNotes ) {
            axios.put( `/api/smallNotesUpdate/${this.props.cid}`, { notes: this.state.saveNotes } )
        }

    }

    updateNotes( e ) {
        const { value } = e.target
        let saveFormat = value.replace( /\n/g, '<br>' )

        this.setState({
            displayNotes: value,
            saveNotes: saveFormat
        })
    }

    render() {
        return (
            <div className='notes-main'>
            <div className='notes-head'>
                <div className='notes-head-name'>Notes</div>
                <div className='notes-head-tri' />
            </div>
            {/* <div className='notes-data'>
                {notes}
            </div> */}
            <textarea className='notes-data' value={this.state.displayNotes} onChange={e => this.updateNotes(e)} />
        </div>
        )
    }
}

export default Notes;