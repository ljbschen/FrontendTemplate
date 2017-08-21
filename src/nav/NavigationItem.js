import React, { Component } from 'react'

export default class NavigationItem extends Component {
    constructor() {
        super();
        this.updateState = this.updateState.bind(this);
        this.state = {
            active: false
        }
    }

    updateState() {
        this.props.updateState(this.props.children);
        this.setState({active:true});
    }

    render() {
        return (<div className="navigationButton" onClick={this.updateState}>{this.props.children}</div>);
    }
}