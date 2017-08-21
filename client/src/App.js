import React, {Component} from 'react';
import './App.css';
import Navigation from "./nav/Navigation";
import OpenButton from "./nav/OpenButton";
import SideNav from "./nav/SideNav";
import Client from "./ApiClient";
import Graph from './GraphComponents/Graph'

export let MenuStates = {MOS: "mos", DELAY: "qdelay_avg", RESOLUTION: "uiHeight", ERROR_PERCENT: "error_percentage"}

class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            MySideNavWidth: 0,
            visibility: "hidden",
            folders: [],
            xKey:"frame_num",
            yKey:"mos",
            dataPath: "",
            marginLeft:0
        };
        this.openCloseTray = this.openCloseTray.bind(this);
        this.submit = this.submit.bind(this);
        this.changeMenuState = this.changeMenuState.bind(this);
        Client.getFolderList((result) => {
            let folders = [];
            result.folders.forEach(f => folders.push(f.substring(f.lastIndexOf('/')+1)));
            this.setState({
                folders: folders,
                dataPath: folders[0]
            }, this.forceUpdate());

        });

    }

    openCloseTray(path) {
        let width = this.state.MySideNavWidth === 0 ? 250 : 0;
        let visible = this.state.visibility === "hidden" ? "visible" : "hidden";
        this.setState({
            MySideNavWidth: width,
            visibility: visible,
            marginLeft: width
        });
    }

    componentDidUpdate() {
        console.log(this.state);
        this.render();
    }

    submit(path) {
        console.log("RECEIVED PATH FROM CHILD COMPONENT" + path);
        this.openCloseTray(path);
        this.setState({dataPath:path});
    }

    changeMenuState(state) {
        let key = MenuStates[state]
        this.setState({yKey: key});
    }

    render() {
        return (
            <div className="App">
                <div className="App-Nav">
                    <div className="App-openButton">
                        <OpenButton openCloseTray={this.openCloseTray} visibility={this.state.visibility}/>
                    </div>
                    <div className="App-SideNav">
                        <SideNav width={this.state.MySideNavWidth} visibility={this.state.visibility}
                                 folders={this.state.folders}
                                 openCloseTray={this.openCloseTray} submit={this.submit}/>
                    </div>
                    <div className="App-Nav">
                        <Navigation items={Object.keys(MenuStates)} changeMenuState={this.changeMenuState}
                                    marginLeft={this.state.marginLeft}/>
                    </div>
                </div>
                {/*<div className="App-body">*/}
                    {/*<div className="graph"><Graph {...this.state}/></div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default App;
