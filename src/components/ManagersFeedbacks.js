import React from 'react';

import {connect} from 'react-redux';

import {
    Button,
    FormGroup,
    Glyphicon,
    Grid,
    Modal,
    Table,
    Col, Label, Panel, Form, ControlLabel, ToggleButtonGroup, ToggleButton
} from 'react-bootstrap';
import Select from 'react-select';

import {
    displayAlert,
    setManagersFeedbacksIsLoad,
    setFeedbackStatesIsLoad
} from "../actions/globalActions";

import {
    setManagersFeedbacks,
    setInitialManagersFeedbacks,
    displayFeedback,
    dismissFeedback,
    setFeedbackStates,
    setFeedbackState,
    addFeedbackResponse,
    setManagerFilterStatus,
    setManagerFilterKeywords
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

import 'react-select/dist/react-select.css';

class ManagersFeedbacks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback_current_response: "",
            feedback_current_state_code: -1,
            initial_feedback_current_state_code: -1,
            feedback_current_state_name: ""
        };
        this.handleFeedbackStateChange = this.handleFeedbackStateChange.bind(this);
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
        if (this.state.feedback_current_response !== null &&
            this.state.feedback_current_response !== "") {

            params[Fields.CONTENT] = this.state.feedback_current_response;
        }
        params[Fields.FEEDBACK_ID] = this.props.currentFeedback._id;
        params[Fields.FEEDBACK_STATE_CODE] = this.state.feedback_current_state_code;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.ADD_RESPONSE_FEEDBACK, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        let now = new Date();
                        if (me.state.feedback_current_response !== null &&
                            me.state.feedback_current_response !== "") {

                            me.props.addFeedbackResponse({
                                _id: me.props.currentFeedback._id,
                                feedback_state: me.state.feedback_current_state_code,
                                feedback_state_name: me.state.feedback_current_state_name,
                                is_admin: true,
                                content: me.state.feedback_current_response,
                                date: now.getTime(),
                                author: response.data.administrator_name
                            });
                        } else {
                            me.props.setFeedbackState({
                                _id: me.props.currentFeedback._id,
                                feedback_state: me.state.feedback_current_state_code,
                                feedback_state_name: me.state.feedback_current_state_name,
                                date: now.getTime()
                            });
                        }
                        me.filterStatus(me.props.manager_filter_status);
                        me.setState({
                            initial_feedback_current_state_code: me.state.feedback_current_state_code,
                            feedback_current_response: ""
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
                console.log(error);
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
                            me.props.setManagersFeedbacks(response.data.feedbacks);
                            me.props.setInitialManagersFeedbacks(response.data.feedbacks);
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
                    if (me !== undefined) {
                        me.props.displayAlert({
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: Texts.ERR_RESEAU.text_fr
                        });
                    }
                }
            },
            function (error) {

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
                    if (me !== undefined) {
                        me.props.displayAlert({
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: Texts.ERR_RESEAU.text_fr
                        });
                    }
                }
            },
            function (error) {

                if (me !== undefined) {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            }
        );
    }

    handleFeedbackStateChange(selected) {
        this.setState({
            feedback_current_state_code: selected.value,
            feedback_current_state_name: selected.label
        });
    }


    handleFeedbackDismiss() {
        this.props.dismissFeedback();
    }

    handleFeedbackClick(item) {
        this.props.displayFeedback({
            isManager: true,
            feedback: item
        });
        this.setState({
            feedback_current_state_code: item.feedback_state,
            initial_feedback_current_state_code: item.feedback_state,
            feedback_current_state_name: item.feedback_state_name
        });
    }

    setColor(feedback_state) {
        if (feedback_state === 1) {
            return {backgroundColor: "#5BBFDE"};
        } else if (feedback_state === 2) {
            return {backgroundColor: "orange"};
        } else if (feedback_state === 3) {
            return {backgroundColor: "green"};
        }
        return {backgroundColor: "white"};
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
        if (this.state.feedback_current_response.length > 1 ||
            this.state.feedback_current_state_code !== this.state.initial_feedback_current_state_code) {
            this.addFeedbackResponse();
        }
    }

    getStatusStyle(feedback_state) {
        let style = "";
        switch (feedback_state) {
            case 1:
                style = "info";
                break;
            case 2:
                style = "warning";
                break;
            case 3:
                style = "success";
                break;
            case 4:
                style = "danger";
                break;
            default:
                style = "danger";
                break;
        }
        return style;
    }

    keyWordFilterChange(event) {
        this.props.setManagerFilterKeywords(event.target.value);
        this.filterKeyWord(event.target.value);
    }

    filterKeyWord(value) {
        let me = this;
        let updatedFeedbacks = this.props.initial_managers_feedbacks;
        updatedFeedbacks = updatedFeedbacks.filter(function(item){
            return (((item.title.toLowerCase().search(value.toLowerCase()) !== -1) ||
                (item.fitness_manager_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
                (item.description.toLowerCase().search(value.toLowerCase()) !== -1)) &&
                (me.props.manager_filter_status === 0 || item.feedback_state === me.props.manager_filter_status));
        });
        this.props.setManagersFeedbacks(updatedFeedbacks);
    }

    statusFilterChange(value) {
        this.props.setManagerFilterStatus(value);
        this.filterStatus(value);
    }

    filterStatus(value) {
        let me = this;
        let updatedFeedbacks = this.props.initial_managers_feedbacks;
        if (updatedFeedbacks !== undefined) {
            updatedFeedbacks = updatedFeedbacks.filter(function (item) {
                return ((value === 0 || item.feedback_state === value) &&
                    ((item.title.toLowerCase().search(me.props.manager_filter_keywords.toLowerCase()) !== -1) ||
                        (item.description.toLowerCase().search(me.props.manager_filter_keywords.toLowerCase()) !== -1)));
            });
        }
        this.props.setManagersFeedbacks(updatedFeedbacks);
    }

    render() {
        return (
            <Panel>
                <Panel header={<div><Glyphicon glyph="filter" /> {Texts.FILTRE.text_fr}</div>}>
                    <Form horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} xs={12} sm={12} md={2} lg={2}>
                                {Texts.PAR_MOTS_CLEFS.text_fr}
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <FormControl
                                    type="text"
                                    placeholder={Texts.OBJET_NOM_CONTENU.text_fr}
                                    value={this.props.manager_filter_keywords}
                                    onChange={this.keyWordFilterChange.bind(this)}
                                />
                            </Col>

                            <Col componentClass={ControlLabel} xs={12} sm={12} md={2} lg={2}>
                                {Texts.PAR_STATUS.text_fr}
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <ToggleButtonGroup
                                    type="radio"
                                    name="status"
                                    value={this.props.manager_filter_status}
                                    defaultValue={0}
                                    onChange={this.statusFilterChange.bind(this)}
                                >
                                    <ToggleButton value={0}>{Texts.TOUS.text_fr}</ToggleButton>
                                    {
                                        this.props.feedback_states && this.props.feedback_states.map((item) => (
                                            <ToggleButton
                                                key={item.code}
                                                bsStyle={this.getStatusStyle(item.code)}
                                                value={item.code}
                                            >
                                                {item.text_fr}
                                            </ToggleButton>
                                        ))
                                    }
                                </ToggleButtonGroup>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel>
                <Table responsive>
                    <thead>
                    <tr>
                        <th style={{textAlign: "center"}}></th>
                        <th style={{textAlign: "center"}}>{Texts.OBJET.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.NOM_DU_GERANT.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.NOM_SALLE.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.STATUS_DU_TICKET.text_fr}</th>
                        <th style={{textAlign: "center"}}>-</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        (this.props.updateManager === true || this.props.updateManager === false) &&

                        this.props.managers_feedbacks.map((item, index) => (
                            <tr key={item._id}>
                                <td style={{verticalAlign: "middle"}}>
                                    <Button onClick={this.handleFeedbackClick.bind(this, item)}>
                                        <Glyphicon glyph="eye-open" />
                                    </Button>
                                </td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>{item.title}</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>{item.fitness_manager_name}</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>{item.fitness_center.name + " (" + item.fitness_center.zip_code + ", " + item.fitness_center.city + ")"}</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>{item.feedback_state_name}</td>
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
                            <Modal.Title>
                                {Texts.TICKET.text_fr + " "}
                                <Label
                                    bsStyle={this.getStatusStyle(this.state.feedback_current_state_code)}
                                >
                                    {this.state.feedback_current_state_name}
                                </Label>
                            </Modal.Title>
                        </Modal.Header>
                        {
                            (this.props.updateManager === true || this.props.updateManager === false) &&

                            <Modal.Body>
                                <FormControl.Static hidden={this.props.feedback_id === ""}>
                                    <span style={{fontWeight: "bold"}}>{Texts.GERANT.text_fr + " : "}</span>
                                    {this.props.currentFeedback.fitness_manager_name}
                                </FormControl.Static>
                                <FormControl.Static hidden={this.props.feedback_id === ""}>
                                    <span
                                        style={{fontWeight: "bold"}}>{Texts.DERNIERE_MODIFICATION.text_fr + " : "}</span>
                                    {Dates.format(this.props.currentFeedback.update_date)}
                                </FormControl.Static>
                                <FormControl.Static>
                                    <span style={{fontWeight: "bold"}}>{Texts.OBJET.text_fr + " : "}</span>
                                    {this.props.currentFeedback.title}
                                </FormControl.Static>
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
                                        <Col xs={5} md={5} lg={5} xl={5}>
                                            <span style={{fontWeight: "bold"}}>
                                                {Texts.MODIFIER_LETAT_DU_TICKET.text_fr + " : "}
                                            </span>
                                            <Select
                                                value={this.state.feedback_current_state_code}
                                                onChange={this.handleFeedbackStateChange}
                                                clearable={false}
                                                options={this.props.feedback_states}
                                            />
                                        </Col>
                                        <Button
                                            className={"pull-right"}
                                            bsStyle={"primary"}
                                            style={{marginTop: "18px"}}
                                            onClick={this.handleFeedbackResponseSend.bind(this)}
                                        >
                                            <Glyphicon glyph="send"/> {Texts.REPONDRE.text_fr}
                                        </Button>
                                    </Grid>
                                </div>
                            </Modal.Body>
                        }
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
        managers_feedbacks_is_load: state.global.managers_feedbacks_is_load,
        feedback_states_is_load: state.global.feedback_states_is_load,

        managers_feedbacks: state.feedbacks.managers_feedbacks,
        initial_managers_feedbacks: state.feedbacks.initial_managers_feedbacks,
        manager_filter_keywords: state.feedbacks.manager_filter_keywords,
        manager_filter_status: state.feedbacks.manager_filter_status,
        updateManager: state.feedbacks.updateManager,
        feedback_states: state.feedbacks.feedback_states,
        showManagerFeedback: state.feedbacks.showManagerFeedback,
        currentFeedback: state.feedbacks.currentFeedback
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    setManagersFeedbacksIsLoad,
    setManagersFeedbacks,
    setInitialManagersFeedbacks,
    displayFeedback,
    dismissFeedback,
    setFeedbackStates,
    setFeedbackState,
    addFeedbackResponse,
    setFeedbackStatesIsLoad,
    setManagerFilterStatus,
    setManagerFilterKeywords
})(ManagersFeedbacks);