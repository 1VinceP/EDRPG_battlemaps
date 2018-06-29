import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {
    static defaultProps = {
        titles: []
    }
    static propTypes = {
        titles: PropTypes.arrayOf(PropTypes.string).isRequired, // The list of tabs
        default: PropTypes.string.isRequired, // The starting tab
        sendTab: PropTypes.func, // The function passed by the parent. The current tab will be passed up through this function

        backgroundColor: PropTypes.string.isRequired, // The color of the active tab
        borderColor: PropTypes.string // The color of the border
    }

    state = {
        active: ''
    }

    componentDidMount() {
        // Set the default tab here and on the parent
        this.setState({ active: this.props.default })
        this.props.sendTab( this.props.default )
    }

    handleSwitch( tabName ) {
        // Switch the tab here and on the parent
        this.setState({ active: tabName })
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