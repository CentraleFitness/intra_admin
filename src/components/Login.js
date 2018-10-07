import React from 'react';
import {
    Modal,
    Button,
    FormGroup,
    Col,
    FormControl,
    ControlLabel,
    Form,
    Image,
    Glyphicon
} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';

import {
    displayAlert,
    dismissAlert
} from "../actions/globalActions";

import Communication from '../utils/Communication';
import Paths from '../utils/Paths';
import Fields from '../utils/Fields';
import Status from '../utils/Status';
import Texts from '../utils/Texts';
import Validator from "../utils/Validator";

import '../styles/Login.css';
import HttpMethods from "../utils/HttpMethods";

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
    }

    componentWillMount() {
        this.checkAuthToken();
    }

    checkAuthToken() {
        let token = localStorage.getItem('token');

        if (token === null) {
            return;
        }

        let params = {};

        params[Fields.TOKEN] = token;

        let communication = new Communication(HttpMethods.POST, Paths.HOST + Paths.AUTHENTICATION_TOKEN, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200 && response.data.code === Status.AUTH_SUCCESS.code) {
                    browserHistory.replace("/");
                }
            },
            function (error) {
            }
        );
    }

    handleLoginClick() {

        if (!Validator.email(this.state.email) ||
            !Validator.password(this.state.password)) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        this.login();
    }

    login() {
        let params = {};

        params[Fields.EMAIL] = this.state.email;
        params[Fields.PASSWORD] = this.state.password;

        let me = this;

        let communication = new Communication(HttpMethods.POST, Paths.HOST + Paths.AUTHENTICATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.AUTH_SUCCESS.code) {

                        me.props.displayAlert({
                            alertTitle: Texts.CONNEXION_TITRE.text_fr,
                            alertText: Status.AUTH_SUCCESS.message_fr
                        });

                        localStorage.setItem('token', response.data.token);

                        setTimeout(function() {
                            me.props.dismissAlert();
                            browserHistory.replace('/');
                        }, 750);
                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        me.props.displayAlert({
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: message
                        });
                    }
                } else {

                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            },
            function (error) {

                me.props.displayAlert({
                    alertTitle: Texts.ERREUR_TITRE.text_fr,
                    alertText: Texts.ERR_RESEAU.text_fr
                });
            }
        );
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleKeyPressed(event) {
        if (event.key === 'Enter') {
            this.handleLoginClick();
        }
    }

    render() {
        return (

            <div>
                <Modal className="wrapper" show={true}>
                    <Modal.Header>
                        <Modal.Title>{Texts.CENTRALE_FITNESS.text_fr + " - " + Texts.INTRA_ADMIN.text_fr}</Modal.Title>
                        <Modal.Title>{Texts.CONNEXION_TITRE.text_fr}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Image
                            src={"/img/logo_cf.svg"}
                            rounded
                            responsive={true}

                            className={"center-block logo"}
                        />

                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail" >
                                <Col componentClass={ControlLabel} sm={3}>
                                    {Texts.EMAIL.text_fr}
                                </Col>
                                <Col sm={9}>
                                    <FormControl
                                        value={this.state.email}
                                        type="email"
                                        placeholder={Texts.EMAIL.text_fr}
                                        onChange={ this.handleEmailChange.bind(this) }
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" >
                                <Col componentClass={ControlLabel} sm={3}>
                                    {Texts.MDP.text_fr}
                                </Col>
                                <Col sm={9}>
                                    <FormControl
                                        value={this.state.password}
                                        type="password"
                                        placeholder={Texts.MDP.text_fr}
                                        onChange={ this.handlePasswordChange.bind(this) }
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                    />
                                </Col>
                            </FormGroup>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button><Glyphicon glyph="warning-sign" /> {Texts.MDP_OUBLIE.text_fr}</Button>
                        <Button bsStyle="primary" onClick={this.handleLoginClick.bind(this)}>
                            <Glyphicon glyph="log-in" /> {Texts.CONNEXION_TITRE.text_fr}
                        </Button>
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
})(Login);