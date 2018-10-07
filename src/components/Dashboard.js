import React from 'react';

import Menu from './Menu'
import TopBar from "./TopBar";

import "../styles/Dashboard.css"

class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <TopBar/>
                <Menu/>
                <div className={"center-container"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Dashboard;