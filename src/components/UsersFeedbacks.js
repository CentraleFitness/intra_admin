import React from 'react';

import {connect} from 'react-redux';

import {
    Button, Glyphicon,
    Modal,
    Table
} from 'react-bootstrap';

import {
    displayAlert,
    setUsersFeedbacksIsLoad
} from "../actions/globalActions";

import {
    setUsersFeedbacks
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
            // this.getUserFeedbacks();
        }
    }

    getUserFeedbacks() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.MANAGER_FEEDBACK, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {
                        if (me !== undefined) {
                            console.log(response.data.feedbacks);
                            me.props.setUsersFeedbacks(response.data.feedbacks);
                            // Si déjà chargé et donc ne pas faire les requetes à nouveau
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
                    console.log("hello");
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
       // this.props.dismissFeedback();
    }

    handleFeedbackClick(item) {
        // this.props.displayFeedback(item);
    }

    setColor(feedback_state) {
        if (feedback_state === 1) {
            return {backgroundColor: "orange"};
        }
        else if (feedback_state === 2) {
            return {backgroundColor: "red"};
        }
        else if (feedback_state === 3) {
            return {backgroundColor: "green"};
        }
        return {backgroundColor: "white"};
    }

    render() {
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Sujet</th>
                        <th>Nom du gérant</th>
                        <th>Nom de la salle</th>
                        <th>Etat du ticket</th>
                        <th>°</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.props.users_feedbacks.map((item, index) => (
                            <tr onClick={this.handleFeedbackClick.bind(this, item)}>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                            </tr>
                        ))
                    }

                    </tbody>
                </Table>

                <Modal show={this.props.showFeedback} bsSize={"medium"} onHide={this.handleFeedbackDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.currentFeedback.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {this.props.currentFeedback.description}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleFeedbackDismiss.bind(this)}><Glyphicon
                            glyph="remove"/> {Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users_feedbacks_is_load: state.global.users_feedbacks_is_load,

        users_feedbacks: state.feedbacks.users_feedbacks,
        showFeedback: state.feedbacks.showFeedback,
        currentFeedback: state.feedbacks.currentFeedback
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    setUsersFeedbacksIsLoad,
    setUsersFeedbacks
})(UsersFeedbacks);