import React, { Component } from 'react'
import ListItem from "./ListItem.js";

export default class CommonList extends Component {
    constructor() {
        super(...arguments);
        this.state = {displayList: false}
    }
    render() {
        let items = this.props.children.map((item, index) =>
            <ListItem key={index}>{item}</ListItem>);

        return (<div>
                    <div>{items}</div>
                </div>);
    }
}