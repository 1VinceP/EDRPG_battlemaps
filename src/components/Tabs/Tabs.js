import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {
    static defaultProps = {
        titles: []
    }
    static propTypes = {
        titles: PropTypes.arrayOf(PropTypes.string).isRequired,
        default: PropTypes.string.isRequired,
        sendTab: PropTypes.func,

        backgroundColor: PropTypes.string.isRequired,
        borderColor: PropTypes.string
    }

    state = {
        active: ''
    }

    componentDidMount() {
        this.setState({
            active: this.props.default
        })
        this.props.sendTab( this.props.default )
    }

    handleSwitch( tabName ) {
        this.setState({
            active: tabName
        })
        this.props.sendTab( tabName )
    }

    renderTabs() {
        const { active } = this.state
        const { titles } = this.props

        const tab = {
            maxWidth: '180px',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #888',
            borderRadius: '3px 3px 0 0',
            background: '#fff2',
            marginBottom: '-1px',
            padding: '10px',
            overflowX: 'hidden',
            overflowY: 'hidden',
            cursor: 'pointer'
        }
        const activeTab = {
            borderBottom: 'none',
            background: this.props.backgroundColor
        }

        return titles.map( ( title, i ) => {
            return (
                <div key={i}
                    style={ title === active ? {...tab, ...activeTab} : tab }
                    onClick={() => this.handleSwitch(title)}
                >
                    {title}
                </div>
            )
        } )
    }

    render() {

        const styles = {
            main: {
                height: '30px',
                width: '100%',
                background: this.props.background,
                display: 'flex',
                borderBottom: `1px solid ${this.props.borderColor || '#888'}`,
                padding: '0 10%',
                marginBottom: '20px'
            }
        }

        return (
            <div style={styles.main}>
                {this.renderTabs()}
            </div>
        )
    }
}

export default Tabs;