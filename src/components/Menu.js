import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {
    Panel,
    Nav,
    NavItem,
    Glyphicon,
    Col
} from 'react-bootstrap';

import Texts from "../utils/Texts";

import "../styles/Menu.css"

class Menu extends React.Component {

    render() {
        return (
            <Col xs={0} sm={0} md={0} lg={0}>
                <Panel className={"menu"}>
                    <Nav bsStyle="pills" stacked activeKey={1}>

                        <LinkContainer to={"/home"}>
                            <NavItem eventKey={"home"}>
                                <Glyphicon glyph="home" />&nbsp;&nbsp;{Texts.ACCUEIL.text_fr}
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to={"/managers"}>
                            <NavItem eventKey={"managers"}>
                                <Glyphicon glyph="user" />&nbsp;&nbsp;{Texts.GERANT.text_fr + "s"}
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to={"/feedback"}>
                            <NavItem eventKey={"feedback"}>
                                <Glyphicon glyph="envelope" />&nbsp;&nbsp;{Texts.FEEDBACK.text_fr}
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to={"/modules"}>
                            <NavItem eventKey={"modules"}>
                                <Glyphicon glyph="list" />&nbsp;&nbsp;{Texts.MODULES.text_fr}
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to={"/administrators"}>
                            <NavItem eventKey={"administrators"}>
                                <Glyphicon glyph="lock" />&nbsp;&nbsp;{Texts.ADMINISTRATEURS.text_fr}
                            </NavItem>
                        </LinkContainer>

                    </Nav>
                </Panel>
            </Col>
        );
    }
}

export default Menu;