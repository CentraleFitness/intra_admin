import React from 'react';

import {connect} from 'react-redux';

import {
    Button, Col, ControlLabel, Form, FormGroup, Glyphicon,
    Modal, Panel,
    Table
} from 'react-bootstrap';

import {
    displayAlert,
    setUsersFeedbacksIsLoad
} from "../actions/globalActions";

import {
    dismissFeedback,
    displayFeedback,
    setUsersFeedbacks,
    setInitialUsersFeedbacks,
    setUsersFilterKeywords
} from "../actions/feedbacksActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";
import HttpMethods from "../utils/HttpMethods";
import FormControl from "react-bootstrap/es/FormControl";

class UsersFeedbacks extends React.Component {

    componentWillMount() {
        if (this.props.users_feedbacks_is_load === false) {
            this.getUserFeedbacks();
        }
    }

    getUserFeedbacks() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.MOBILE_FEEDBACK, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {
                        if (me !== undefined) {
                            me.props.setUsersFeedbacks(response.data.feedbacks);
                            me.props.setInitialUsersFeedbacks(response.data.feedbacks);
                            me.props.setUsersFeedbacksIsLoad();
                        }

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        if (me !== undefined) {
                            me.props.displayAlert({
                                alertTitle: Texts.ERREUR_TITRE.text_fr,
                                alertText: message
                            });
                        }
                    }
                } else {
                    if (me !== undefined) {
                        me.props.displayAlert({
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: Texts.ERR_RESEAU.text_fr
                        });
                    }
                }
            },
            function (error) {
                console.log(error);
                if (me !== undefined) {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            }
        );
    }

    handleFeedbackDismiss() {
        this.props.dismissFeedback();
    }

    handleFeedbackClick(item) {
        this.props.displayFeedback({
            isManager: false,
            feedback: item
        });
    }

    keyWordFilterChange(event) {
        this.props.setUsersFilterKeywords(event.target.value);
        this.filterKeyWord(event.target.value);
    }

    filterKeyWord(value) {
        let updatedFeedbacks = this.props.initial_users_feedbacks;
        updatedFeedbacks = updatedFeedbacks.filter(function(item){
            return ((item.user.first_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
                (item.user.last_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
                (item.user.login.toLowerCase().search(value.toLowerCase()) !== -1) ||
                (item.email.toLowerCase().search(value.toLowerCase()) !== -1) ||
                (item.content.toLowerCase().search(value.toLowerCase()) !== -1)
            );
        });
        this.props.setUsersFeedbacks(updatedFeedbacks);
    }

    render() {
        return (
            <Panel>
                <Panel header={<div><Glyphicon glyph="filter" /> {Texts.FILTRE.text_fr}</div>}>
                    <Form horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} xs={12} sm={12} md={2} lg={2}>
                                {Texts.MOTS_CLEFS.text_fr}
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <FormControl
                                    type="text"
                                    placeholder={Texts.LOGIN_NOM_EMAIL.text_fr}
                                    value={this.props.users_filter_keywords}
                                    onChange={this.keyWordFilterChange.bind(this)}
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Nom de l'utilisateur</th>
                        <th>Login de l'utilisateur</th>
                        <th>Email de l'utilisateur</th>
                        <th>Date d'émission</th>
                        <th>Nom de la salle</th>
                        <th>Version de l'application</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.props.users_feedbacks.map((item, index) => (
                            <tr key={item._id} style={{cursor: "pointer"}} onClick={this.handleFeedbackClick.bind(this, item)}>
                                <td>{item.user.first_name + " " + item.user.last_name}</td>
                                <td>{item.user.login}</td>
                                <td>{item.email}</td>
                                <td>{Dates.format(new Date(item.date).getTime())}</td>
                                <td>
                                    {
                                        item.fitness_center !== undefined &&

                                        item.fitness_center.name + " (" + item.fitness_center.zip_code + ", " + item.fitness_center.city + ")"
                                    }
                                </td>
                                <td>{item.version}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

                {
                    this.props.showUserFeedback === true &&


                    <Modal show={this.props.showUserFeedback} bsSize={"large"}
                           onHide={this.handleFeedbackDismiss.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"Feedback utilisateur : " + this.props.currentFeedback.user.login}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl.Static>
                                {this.props.currentFeedback.content}
                            </FormControl.Static>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleFeedbackDismiss.bind(this)}><Glyphicon
                                glyph="remove"/> {Texts.FERMER.text_fr}</Button>
                        </Modal.Footer>
                    </Modal>
                }
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        users_feedbacks_is_load: state.global.users_feedbacks_is_load,

        users_feedbacks: state.feedbacks.users_feedbacks,
        initial_users_feedbacks: state.feedbacks.initial_users_feedbacks,
        users_filter_keywords: state.feedbacks.users_filter_keywords,
        showUserFeedback: state.feedbacks.showUserFeedback,
        currentFeedback: state.feedbacks.currentFeedback
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    setUsersFeedbacksIsLoad,
    setUsersFeedbacks,
    displayFeedback,
    dismissFeedback,
    setInitialUsersFeedbacks,
    setUsersFilterKeywords
})(UsersFeedbacks);