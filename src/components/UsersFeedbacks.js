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
                <Table responsive>
                    <thead>
                    <tr>
                        <th style={{textAlign: "center"}}></th>
                        <th style={{textAlign: "center"}}>{Texts.NOM.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.LOGIN.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.EMAIL.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.DATE_DE_CREATION.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.NOM_SALLE.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.VERSION_DE_LAPPLICATION.text_fr}</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.props.users_feedbacks.map((item, index) => (
                            <tr key={item._id}>
                                <td style={{verticalAlign: "middle"}}>
                                    <Button onClick={this.handleFeedbackClick.bind(this, item)}>
                                        <Glyphicon glyph="eye-open" />
                                    </Button>
                                </td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>{item.user.first_name + " " + item.user.last_name}</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>{item.user.login}</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>{item.email}</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>{Dates.format(new Date(item.date).getTime())}</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                    {
                                        item.fitness_center !== undefined &&

                                        item.fitness_center.name + " (" + item.fitness_center.zip_code + ", " + item.fitness_center.city + ")"
                                    }
                                </td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                    {item.version}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

                {
                    this.props.showUserFeedback === true &&


                    <Modal show={this.props.showUserFeedback}
                           onHide={this.handleFeedbackDismiss.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"Feedback utilisateur"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl.Static>
                                <span style={{fontWeight: "bold"}}>{Texts.NOM.text_fr + " : "}</span>
                                {
                                    this.props.currentFeedback.user.first_name + " " +
                                    this.props.currentFeedback.user.last_name
                                }
                            </FormControl.Static>
                            <FormControl.Static>
                                <span style={{fontWeight: "bold"}}>{Texts.LOGIN.text_fr + " : "}</span>
                                {
                                    this.props.currentFeedback.user.login
                                }
                            </FormControl.Static>
                            <FormControl.Static>
                                <span style={{fontWeight: "bold"}}>{Texts.EMAIL.text_fr + " : "}</span>
                                {
                                    this.props.currentFeedback.email
                                }
                            </FormControl.Static>
                            <FormControl.Static>
                                <span
                                    style={{fontWeight: "bold"}}>{Texts.SALLE_SPORT.text_fr + " : "}</span>
                                {
                                    this.props.currentFeedback.fitness_center !== undefined &&

                                    this.props.currentFeedback.fitness_center.name + " (" +
                                    this.props.currentFeedback.fitness_center.zip_code + ", " +
                                    this.props.currentFeedback.fitness_center.city + ")"
                                }
                            </FormControl.Static>
                            <FormControl.Static>
                                    <span
                                        style={{fontWeight: "bold"}}>{Texts.DATE_DE_CREATION.text_fr + " : "}</span>
                                    {Dates.format(this.props.currentFeedback.date)}
                            </FormControl.Static>
                            <FormControl.Static>
                                    <span
                                        style={{fontWeight: "bold"}}>{Texts.VERSION_DE_LAPPLICATION.text_fr + " : "}</span>
                                    {this.props.currentFeedback.version}
                            </FormControl.Static>
                            <FormControl.Static>
                                <span
                                    style={{fontWeight: "bold"}}>{Texts.CONTENU.text_fr + " : "}
                                </span>
                                <br/>
                                <br/>
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