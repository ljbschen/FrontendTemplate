import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from "./nav/Navigation";
import OpenButton from "./nav/OpenButton";
import SideNav from "./nav/SideNav";
import Client from './tools/ApiClient'


export let MenuStates = {MOS: 0, DELAY: 1, RESOLUTION:2, WHATEVER:3}
// let folders = ["folder1", "folder2", "folder3"]

class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            menuState: MenuStates.MOS,
            MySideNavWidth: 0,
            visibility: "hidden",
            folers:[]
        };
        this.openCloseTray = this.openCloseTray.bind(this);
        this.submit = this.submit.bind(this);
        this.changeMenuState = this.changeMenuState.bind(this);
    }

    componentDidMount() {
        Client.getFolderList((result) => {
            this.SetState({folders:result.folders});
        });
    }

    openCloseTray() {
        let width = this.state.MySideNavWidth === 0 ? 250 : 0;
        let visible = this.state.visibility === "hidden" ? "visible" : "hidden";
        this.setState({
            MySideNavWidth: width,
            visibility: visible
        });
    }

    submit() {
        this.openCloseTray();
    }

    changeMenuState(state) {
        this.setState({menuState: state});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <div className="App-Nav">
                    <div className="App-openButton">
                        <OpenButton openCloseTray={this.openCloseTray} visibility={this.state.visibility}/>
                    </div>
                    <div className="App-SideNav">
                        <SideNav width={this.state.MySideNavWidth} visibility={this.state.visibility} folders={this.state.folders}
                                 openCloseTray={this.openCloseTray} submit={this.submit}/>
                    </div>
                    <div className="App-Nav">
                        <Navigation items={Object.keys(MenuStates)} changeMenuState={this.changeMenuState}/>
                    </div>
                </div>
                <div className="App-body">
                    <Graph></Graph>
                </div>
            </div>
        );
    }
}

export default App;
