import React, {Component} from 'react'

export default class OpenButton extends Component {
    render() {
        let visible = this.props.visibility === "hidden" ? "visible" : "hidden";
        const divStyle = {
            visibility:visible
        }
        return (
            <span onClick={this.props.openCloseTray} style={divStyle}>&#9776;</span>
        );
    }
}
