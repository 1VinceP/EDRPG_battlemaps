import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import Scroll from './Scroll';
import './scroll.css';

class ScrollContainer extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        border: PropTypes.string,
        type: PropTypes.string,
        small: PropTypes.bool
    }

    state = {
        selectedItem: null,
        data: []
    }

    styles = {
        main: {
            width: this.props.small ? '45%' : '100%',
            display: 'flex',
            flexDirection: 'column'
        }
    }

    componentDidMount() {
        const { type } = this.props
        let dataUrl = type === 'karma' ? dataUrl = '/api/getKarma'
                    : type === 'enhance' ? dataUrl = '/api/getEnhance'
                    : ''

        if( dataUrl ) {
            axios.get( dataUrl )
                .then( response => this.setState({ data: response.data }) )
        }
    }

    setSelected( id ) {
        if( this.state.selectedItem !== id )
            this.setState({ selectedItem: id });
        else
            this.setState({ selectedItem: null });
    }

    render() {
        const { list, border, small, type, scrollClick } = this.props;
        const { selectedItem, data } = this.state;

        let items = type !== 'karma' ? list.sort((a, b) => a.length - b.length) : list

        let scrolls = items.map( (item, i) => {
            let details
            for( let key in data ) {
                if( _.camelCase(data[key].name) === _.camelCase(item) )
                    details = data[key]
            }

            return (
                <Scroll
                    key={i}
                    border={border}
                    data={details}
                    index={i}
                    item={item}
                    long={items.length > 5}
                    onSelect={id => this.setSelected(id)}
                    onUse={scrollClick}
                    selected={selectedItem === i}
                    small={small || false}
                    type={type}
                />
            )
         } )

        return (
            <div style={this.styles.main}>
                {scrolls}
            </div>
        )
    }

}

export default ScrollContainer;