import React from 'react';

import { connect } from 'react-redux';

import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button, Form, Col, FormGroup, ControlLabel, Table, OverlayTrigger, Tooltip
} from 'react-bootstrap';

import Select from 'react-select';

import {
    displayAlert,
    dismissAlert,
    setUsersIsLoad,
    setFitnessCentersIsLoad
} from "../actions/globalActions";

import {
    setFitnessCenters
} from '../actions/managersActions';

import {
    setUsers,
    setInitialUsers,
    usersResetFilters,
    setUsersFilterName,
    setUsersFilterSelectFitnessCenter
} from "../actions/usersActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";
import HttpMethods from "../utils/HttpMethods";

import 'react-select/dist/react-select.css';

class Users extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.users_is_load === false) {
            this.getUsers();
        }
        if (this.props.fitness_centers_is_load === false) {
            this.getFitnessCenters();
        }
    }

    getUsers() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.USER, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setUsers(response.data.users);
                            me.props.setInitialUsers(response.data.users);
                            me.filterName(me.props.filter_name);
                            me.props.setUsersIsLoad();
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

    getFitnessCenters() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.FITNESS_CENTER, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setFitnessCenters(response.data.fitness_centers);
                            me.props.setFitnessCentersIsLoad();
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

    resetFilters() {
        this.props.usersResetFilters();
        this.props.setUsers(this.props.initial_users);
    }

    nameFilterChange(event) {
        this.props.setUsersFilterName(event.target.value);
        this.filterName(event.target.value);
    }

    fitnessCenterFilterChange(selected) {
        this.props.setUsersFilterSelectFitnessCenter(selected.value);
        this.filterFitnessCenter(selected === undefined ? "" : selected.value);
    }

    filterName(value) {

        let me = this;
        let updatedUsers = this.props.initial_users;
        updatedUsers = updatedUsers.filter(function (item) {
            return me.getNameBool(value, item) &&
                me.getFitnessCenterBool(me.props.filter_select_fitness_center, item);
        });
        this.props.setUsers(updatedUsers);
    }

    filterFitnessCenter(value) {

        let me = this;
        let updatedUsers = this.props.initial_users;
        updatedUsers = updatedUsers.filter(function (item) {
            return me.getNameBool(me.props.filter_name, item) &&
                me.getFitnessCenterBool(value, item);
        });
        this.props.setUsers(updatedUsers);
    }

    getNameBool(value, item) {
        return ((item.first_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.last_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.login.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.email_address.toLowerCase().search(value.toLowerCase()) !== -1));
    }

    getFitnessCenterBool(value_select, item) {
        return (value_select === undefined || value_select === "" || value_select === item.fitness_center._id);
    }

    getDetailsOverlay(item) {
        return (
            <Tooltip id={"tooltip_details"}>
                {Texts.AFFICHER_LA_FICHE_COMPLETE.text_fr}
            </Tooltip>
        );
    }

    detailsClick(item) {

    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="phone" /> {Texts.UTILISATEURS.text_fr}</div>} bsStyle="primary">

                <Panel>
                    <Panel header={<div><Glyphicon glyph="filter" /> {Texts.FILTRE.text_fr}</div>}>
                        <Form horizontal>
                            <Col xs={12} sm={12} md={6} lg={6}>

                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={12} sm={12} md={3} lg={3}>
                                        {Texts.PAR_NOM.text_fr}
                                    </Col>
                                    <Col xs={12} sm={12} md={9} lg={9}>
                                        <FormControl
                                            type="text"
                                            placeholder={Texts.NOM_LOGIN.text_fr}
                                            value={this.props.filter_name}
                                            onChange={this.nameFilterChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>

                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6}>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={12} sm={12} md={3} lg={3}>
                                        {Texts.PAR_SALLE.text_fr}
                                    </Col>

                                    <Col xs={12} sm={12} md={9} lg={9}>
                                        <Select
                                            clearable={false}
                                            value={this.props.filter_select_fitness_center}
                                            onChange={this.fitnessCenterFilterChange.bind(this)}
                                            options={this.props.fitness_centers}
                                        />
                                    </Col>
                                </FormGroup>

                            </Col>
                        </Form>
                    </Panel>
                    <Button
                        className={"pull-left"}
                        onClick={this.resetFilters.bind(this)}
                    >
                        <Glyphicon glyph="refresh" /> {Texts.REINITIALISER_LES_FILTRES.text_fr}
                    </Button>
                </Panel>

                <Table responsive>
                    <thead>
                    <tr>
                        <th></th>
                        <th>{Texts.PRENOM.text_fr}</th>
                        <th>{Texts.NOM.text_fr}</th>
                        <th>{Texts.LOGIN.text_fr}</th>
                        <th>{Texts.EMAIL.text_fr}</th>
                        <th>{Texts.SALLE_SPORT.text_fr}</th>
                        <th>{Texts.SIGNALEMENTS.text_fr}</th>
                        {/*<th style={{textAlign: "center"}}>{Texts.VALIDATION.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.ACTIVITE.text_fr}</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.users !== undefined && this.props.users.map((item) => (
                            <tr key={item._id}>
                                <td style={{verticalAlign: "middle"}}>
                                    <OverlayTrigger placement="bottom" overlay={this.getDetailsOverlay(item)}>
                                        <Button onClick={this.detailsClick.bind(this, item)}>
                                            <Glyphicon glyph="eye-open" />
                                        </Button>
                                    </OverlayTrigger>
                                </td>
                                <td style={{verticalAlign: "middle"}}>{item.first_name}</td>
                                <td style={{verticalAlign: "middle"}}>{item.last_name}</td>
                                <td style={{verticalAlign: "middle"}}>{item.login}</td>
                                <td style={{verticalAlign: "middle"}}>{item.email_address}</td>
                                <td style={{verticalAlign: "middle"}}>
                                    {
                                        item.fitness_center !== undefined ?

                                        item.fitness_center.name + " (" + item.fitness_center.city + ")"

                                            :

                                        Texts.PAS_DE_SALLE.text_fr
                                    }
                                </td>
                                <td style={{verticalAlign: "middle"}}>{item.nb_report}</td>

                                {/*<td style={{verticalAlign: "middle", textAlign: "center"}}>
                                    {
                                        item.is_refused === false && item.is_validated === false &&

                                        (<OverlayTrigger placement="bottom" overlay={this.getValidateOverlay(item)}>
                                            <Button onClick={this.validateClick.bind(this, item)}>
                                                <span style={{color: "green"}}>
                                                    <Glyphicon glyph="ok" />
                                                </span>&nbsp;
                                                {Texts.VALIDER.text_fr}
                                            </Button>
                                        </OverlayTrigger>)
                                    }
                                    {
                                        item.is_refused === false && item.is_validated === false &&
                                        (
                                            <span>&nbsp;</span>
                                        )
                                    }
                                    {
                                        item.is_refused === false && item.is_validated === false &&

                                        (<OverlayTrigger placement="bottom" overlay={this.getRefuseOverlay(item)}>
                                            <Button onClick={this.refuseClick.bind(this, item)}>
                                                &nbsp;
                                                <span style={{color: "red"}}>
                                                    <Glyphicon glyph="remove" />
                                                </span>&nbsp;
                                                {Texts.REFUSER.text_fr}
                                            </Button>
                                        </OverlayTrigger>)
                                    }
                                    {
                                        item.is_validated === true &&

                                        <OverlayTrigger placement="bottom" overlay={this.getValidatedOverlay(item)}>
                                            <span style={{color: "green"}}>
                                                {Texts.VALIDE.text_fr + " ( " + Dates.formatDateOnly(item.validation_date) + " )"}
                                            </span>
                                        </OverlayTrigger>
                                    }
                                    {
                                        item.is_refused === true &&

                                        <OverlayTrigger placement="bottom" overlay={this.getRefusedOverlay(item)}>
                                            <span style={{color: "red"}}>
                                                {Texts.REFUSE.text_fr + " ( " + Dates.formatDateOnly(item.validation_date) + " )"}
                                            </span>
                                        </OverlayTrigger>
                                    }
                                </td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                    {
                                        item.is_validated === true && item.is_active === false &&

                                        (<OverlayTrigger placement="bottom" overlay={this.getSetActiveOverlay(item)}>
                                            <Button onClick={this.setActiveClick.bind(this, item)}>
                                                <span style={{color: "blue"}}>
                                                    <Glyphicon glyph="off" />
                                                </span>&nbsp;
                                                {Texts.RENDRE_ACTIF.text_fr}
                                            </Button>
                                        </OverlayTrigger>)
                                    }
                                    {
                                        item.is_validated === true && item.is_active === true &&

                                        (<OverlayTrigger placement="bottom" overlay={this.getSetInactiveOverlay(item)}>
                                            <Button onClick={this.setInactiveClick.bind(this, item)}>
                                                <span style={{color: "red"}}>
                                                    <Glyphicon glyph="off" />
                                                </span>&nbsp;
                                                {Texts.RENDRE_INACTIF.text_fr}
                                            </Button>
                                        </OverlayTrigger>)
                                    }
                                </td>*/}
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

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

            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,
        users_is_load: state.global.users_is_load,
        fitness_centers_is_load: state.global.fitness_centers_is_load,

        fitness_centers: state.managers.fitness_centers,

        users: state.users.users,
        initial_users: state.users.initial_users,
        filter_select_fitness_center: state.users.filter_select_fitness_center,
        filter_name: state.users.filter_name
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,

    setUsersIsLoad,
    setFitnessCentersIsLoad,

    setFitnessCenters,

    setUsers,
    setInitialUsers,
    usersResetFilters,
    setUsersFilterName,
    setUsersFilterSelectFitnessCenter
})(Users);