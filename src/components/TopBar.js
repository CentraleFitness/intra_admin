import React from 'react';
import {
    Navbar,
    Nav,
    MenuItem,
    NavDropdown,
    Glyphicon,
    Modal,
    FormControl,
    Button,
    ControlLabel,
    Form,
    FormGroup,
    Col,
    HelpBlock,
    Image
} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';

import {
    displayAlert,
    dismissAlert
} from "../actions/globalActions";

import '../styles/TopBar.css';
import Texts from "../utils/Texts";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Status from "../utils/Status";
import Validator from "../utils/Validator";
import Communication from "../utils/Communication";
import HttpMethods from "../utils/HttpMethods";

class TopBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalTitle: "",
            old_password: "",
            password: "",
            confirm_password: "",
            showAlert: false,
            alertTitle: "",
            alertText: ""
        };
    }

    handleLogoutClick() {
        localStorage.removeItem("token");
        //this.props.resetProfileInfo();

        //this.props.setStatisticsIsNotLoad();

        browserHistory.replace("/auth");
    }

    handleChangePasswordClick() {
        this.setState({
            showModal: true,
            modalTitle: Texts.CHANGE_MDP_TITRE.text_fr
        });
    }

    handleKeyPressed(event) {
        if (event.key === 'Enter') {
            this.handleConfirmChangePassword();
        }
    }

    handleModalDismiss() {
        this.setState({
            showModal: false,
            modalTitle: "",
            old_password: "",
            password: "",
            confirm_password: ""
        });
    }

    handleAlertDismiss() {
        this.setState({
            showAlert: false,
            alertTitle: "",
            alertText: ""
        });
    }

    handleConfirmChangePassword() {

        if (!Validator.password(this.state.old_password) ||
            !Validator.password(this.state.password) ||
            !Validator.password(this.state.confirm_password)) {

            this.setState({
                showAlert: true,
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        if (this.state.confirm_password !== this.state.password) {

            this.setState({
                showAlert: true,
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_CONFIRM_MDP.text_fr
            });

            return;
        }

        this.changePassword();
    }

    changePassword() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.PASSWORD] = this.state.old_password;
        params[Fields.NEW_PASSWORD] = this.state.password;

        let me = this;

        let communication = new Communication(HttpMethods.POST, Paths.HOST + Paths.PASSWORD, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.handleModalDismiss();

                        localStorage.setItem('token', response.data.token);

                        me.setState({
                            showAlert: true,
                            alertTitle: Texts.CHANGE_MDP_TITRE.text_fr,
                            alertText: Texts.MDP_A_BIEN_ETE_MIS_A_JOUR.text_fr
                        });

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        me.setState({
                            showAlert: true,
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: message
                        });
                    }
                } else {
                    me.setState({
                        showAlert: true,
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            },
            function (error) {
                me.setState({
                    showAlert: true,
                    alertTitle: Texts.ERREUR_TITRE.text_fr,
                    alertText: Texts.ERR_RESEAU.text_fr
                });
            }
        );
    }

    getValidationState(field) {

        let value;
        switch (field) {
            case "old_password":
                value = this.state.old_password;
                break;
            case "password":
                value = this.state.password;
                break;
            case "confirm_password":
                value = this.state.confirm_password;
                break;
            default:
                return "warning";
        }

        if (Validator.password(value)) {
            return "success";
        }
        return "warning";
    }

    handleOldPasswordChange(event) {
        this.setState({
            old_password: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleConfirmPasswordChange(event) {
        this.setState({
            confirm_password: event.target.value
        });
    }

    render() {
        return (
            <div>

                <Navbar collapseOnSelect className={"topBar"} fixedTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/home">
                                <Image src="/img/logo_cf_white.png" />
                                {Texts.CENTRALE_FITNESS_ADMIN.text_fr}
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavDropdown eventKey={3} title={<Glyphicon glyph="cog" />} id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1} onClick={this.handleChangePasswordClick.bind(this)}>
                                    <Glyphicon glyph="pencil" />&nbsp;{Texts.MODIFIER_MDP.text_fr}
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.2} onClick={this.handleLogoutClick.bind(this)}>
                                    <Glyphicon glyph="log-out" />&nbsp;{Texts.SE_DECONNECTER.text_fr}
                                </MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Modal show={this.state.showModal} onHide={this.handleModalDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalOldPassword" validationState={this.getValidationState('old_password')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    {Texts.MDP_ACTUEL.text_fr}
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        value={this.state.old_password}
                                        type="password"
                                        placeholder={Texts.MDP_ACTUEL.text_fr}
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                        onChange={this.handleOldPasswordChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState('password')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    {Texts.NOUVEAU_MDP.text_fr}
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        value={this.state.password}
                                        type="password"
                                        placeholder={Texts.NOUVEAU_MDP.text_fr}
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                        onChange={this.handlePasswordChange.bind(this)}
                                    />
                                    <HelpBlock>{Texts.REGLE_MDP.text_fr}</HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalConfirmPassword" validationState={this.getValidationState('confirm_password')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    {Texts.CONFIRM_MDP.text_fr}
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        value={this.state.confirm_password}
                                        type="password"
                                        placeholder={Texts.CONFIRM_MDP.text_fr}
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                        onChange={this.handleConfirmPasswordChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleModalDismiss.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
                        <Button bsStyle={"primary"} onClick={this.handleConfirmChangePassword.bind(this)}><Glyphicon glyph="ok" /> {Texts.CONFIRMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.showAlert} bsSize={"small"} onHide={this.handleAlertDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.alertTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {this.props.alertText}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAlertDismiss.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert
})(TopBar);