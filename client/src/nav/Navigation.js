import React, {Component} from 'react'
import NavigationItem from "./NavigationItem";

export default class Navigation extends Component {
    constructor() {
        super();
        this.updateState = this.updateState.bind(this);
    }

    updateState(state) {
        this.props.changeMenuState(state);
    }

    render() {
        const divStyle = {
            marginLeft: this.props.marginLeft
        }
        let items = this.props.items.map((item, index) =>
            <NavigationItem key={index} updateState={this.updateState}>{item}</NavigationItem>);

        return (
            <div className="navigation" style={divStyle}>{items}</div>);
    }
}