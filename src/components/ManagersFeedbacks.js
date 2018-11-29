import React from 'react';

import {connect} from 'react-redux';

import {
    Button, FormGroup, Glyphicon, Grid, Modal,
    Table
} from 'react-bootstrap';

import {
    displayAlert,
    setManagersFeedbacksIsLoad,
    setFeedbackStatesIsLoad
} from "../actions/globalActions";

import {
    setManagersFeedbacks,
    displayFeedback,
    dismissFeedback,
    setFeedbackStates
} from "../actions/feedbacksActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";
import HttpMethods from "../utils/HttpMethods";
import FormControl from "react-bootstrap/es/FormControl";

import "../styles/Feedback.css";
import Col from "react-bootstrap/es/Col";

class ManagersFeedbacks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback_current_response: "",
            feedback_current_state_code: -1,
            feedback_current_state_id: ""
        }
    }

    componentWillMount() {
        if (this.props.managers_feedbacks_is_load === false) {
            this.getManagerFeedbacks();
        }
        if (this.props.feedback_states_is_load === false) {
            this.getFeedbackStates();
        }
    }

    addFeedbackResponse() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.CONTENT] = this.state.feedback_current_response;
        params[Fields.FEEDBACK_ID] = this.props.currentFeedback._id;
        params[Fields.FEEDBACK_STATE_CODE] = this.state.feedback_current_state_code;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.ADD_RESPONSE_FEEDBACK, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        let now = new Date();
                        me.props.addFeedbackResponse({
                            _id: me.props.currentFeedback._id,
                            feedback_state: me.state.feedback_current_state_code,
                            is_admin: true,
                            content: me.state.feedback_current_response,
                            date: now.getTime(),
                            author: response.data.administrator_name
                        });
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

    getManagerFeedbacks() {
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
                            me.props.setManagersFeedbacks(response.data.feedbacks);
                            // Si déjà chargé et donc ne pas faire les requetes à nouveau
                            me.props.setManagersFeedbacksIsLoad();
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

    getFeedbackStates() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.FEEDBACK_STATE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {
                        if (me !== undefined) {
                            me.props.setFeedbackStates(response.data.feedback_states);
                            // Récupère tous les états possibles d'un feedback state
                            // ==> etablir un select sur tous ces etats.
                            // Afficher un select de differents feedback_state / le set une fois confirmé
                            me.props.setFeedbackStatesIsLoad();
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
        this.props.dismissFeedback();
    }

    handleFeedbackClick(item) {
        this.props.displayFeedback({
            isManager: true,
            feedback: item
        });
    }

    setColor(feedback_state) {
        if (feedback_state === 1) {
            return {backgroundColor: "orange"};
        } else if (feedback_state === 2) {
            return {backgroundColor: "red"};
        } else if (feedback_state === 3) {
            return {backgroundColor: "green"};
        }
        return {backgroundColor: "white"};
    }

    setCursor() {
        return {cursor: "pointer"};
    }

    displayresponse(item) {

        return (
            <div key={item.date}>
                <div className={"showNewLine response"}>
                   <span style={{fontWeight: "bold"}}>
                       {
                           item.author + " - " +
                           (item.is_admin ? Texts.ADMIN.text_fr : Texts.GERANT.text_fr)
                       }
                   </span>
                    <br/>
                    <em>{Dates.format(item.date)}</em>
                    <br/>
                    <br/>
                    {item.content}
                </div>
            </div>
        );
    }

    handleFeedbackCurrentResponseChange(event) {
        this.setState({
            feedback_current_response: event.target.value
        })
    }

    handleFeedbackResponseSend() {
        if (this.state.feedback_current_response.length > 0) {

        }
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
                        this.props.managers_feedbacks.map((item, index) => (
                            <tr key={item._id} style={this.setCursor()}
                                onClick={this.handleFeedbackClick.bind(this, item)}>
                                <td>{item.title}</td>
                                <td>{item.fitness_manager_name}</td>
                                <td>{item.fitness_center.name + " (" + item.fitness_center.zip_code + ", " + item.fitness_center.city + ")"}</td>
                                <td>{item.feedback_state_name}</td>
                                <td style={this.setColor(item.feedback_state)}></td>
                            </tr>
                        ))
                    }

                    </tbody>
                </Table>

                {
                    this.props.showManagerFeedback === true &&


                    <Modal show={this.props.showManagerFeedback} bsSize={"large"}
                           onHide={this.handleFeedbackDismiss.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.currentFeedback.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl.Static>
                                {this.props.currentFeedback.description}
                            </FormControl.Static>
                            {
                                this.props.currentFeedback.responses !== undefined &&

                                this.props.currentFeedback.responses.map((item, index) => (
                                    this.displayresponse(item)
                                ))
                            }
                            <div className={"response"}>
                                <FormGroup>
                                    <FormControl
                                        componentClass="textarea"
                                        rows={2}
                                        placeholder={Texts.REPONSE.text_fr}
                                        value={this.state.feedback_current_response}
                                        onChange={this.handleFeedbackCurrentResponseChange.bind(this)}
                                    />
                                </FormGroup>
                                <Grid fluid>
                                    <Button
                                        className={"pull-right"}
                                        bsStyle={"primary"}
                                        onClick={this.handleFeedbackResponseSend.bind(this)}
                                    >
                                        <Glyphicon glyph="send"/> {Texts.REPONDRE.text_fr}
                                    </Button>
                                </Grid>
                            </div>
                            {console.log(this.props.feedback_states)}
                            <Col><h5>Modifier la valeur du ticket :</h5></Col>
                            <Col>
                                <select
                                    value={this.props.currentFeedback.feedback_state}>
                                    {
                                        this.props.feedback_states.map((item, index) => (
                                            <option
                                                key={item._id}
                                                value={item.code}
                                                //onClick={this.handleFeedbackStateSend.bind(this)}
                                            >{item.text_fr}</option>
                                        ))
                                    }
                                </select>
                            </Col>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleFeedbackDismiss.bind(this)}><Glyphicon
                                glyph="remove"/> {Texts.FERMER.text_fr}</Button>
                        </Modal.Footer>
                    </Modal>
                }

            </div>
        );


    }
}

function mapStateToProps(state) {
    return {
        managers_feedbacks_is_load: state.global.managers_feedbacks_is_load,
        feedback_states_is_load: state.global.feedback_states_is_load,

        managers_feedbacks: state.feedbacks.managers_feedbacks,
        feedback_states: state.feedbacks.feedback_states,
        showManagerFeedback: state.feedbacks.showManagerFeedback,
        currentFeedback: state.feedbacks.currentFeedback
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    setManagersFeedbacksIsLoad,
    setManagersFeedbacks,
    displayFeedback,
    dismissFeedback,
    setFeedbackStates,
    setFeedbackStatesIsLoad
})(ManagersFeedbacks);