import React, {Component} from 'react'

export default class SideNav extends Component {
    render() {
        const divStyle = {
            width: this.props.width + "px",
            visibility:this.props.visibility
        }
        let folders =  this.props.folders.map((folder, index) =>
            <option key={index} value={folder}>{folder}</option>);
        return (
            <div className='SideNav' style={divStyle}>
                <a className='closebtn' onClick={this.props.openCloseTray}>&times;</a>
                <select>{folders}</select>
                <button className="submitButton" onClick={this.props.submit}>Submit</button>
            </div>
        );
    }
}