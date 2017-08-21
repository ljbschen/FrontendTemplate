import React, {Component} from 'react'
import Client from '../ApiClient'

export default class SideNav extends Component {
    constructor() {
        super();
        this.state = {
            folders: []
        }
        this.selectedOption = this.selectedOption.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState(props);
    }

    selectedOption(event) {
        this.props.submit(event.target.value)
    }

    render() {
        const divStyle = {
            width: this.props.width + "px",
            visibility:this.props.visibility
        }

        if (this.state.folders !== undefined) {
            let folders =  this.state.folders.map((folder, index) =>
                <option key={index} value={folder}>{folder}</option>);

            return (
                <div className='SideNav' style={divStyle}>
                    <a className='closebtn' onClick={this.props.openCloseTray}>&times;</a>
                    <select onChange={this.selectedOption}>{folders}</select>
                </div>
            );
        } else {
            return (
                <div className='SideNav' style={divStyle}>
                    <a className='closebtn' onClick={this.props.openCloseTray}>&times;</a>
                    <select onChange={this.selectedOption}></select>
                </div>
            )
        }
    }
}