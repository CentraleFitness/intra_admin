import React from 'react';

import { connect } from 'react-redux';

import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button,
    Form,
    Col,
    ControlLabel,
    FormGroup,
    Table,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import Select from 'react-select';

import {
    displayAlert,
    dismissAlert,
    setFitnessCentersIsLoad,
    setManagersIsLoad
} from "../actions/globalActions";

import {
    setManagers,
    setInitialManagers,
    setManagerActivity,
    setValidateManager,
    setUndoRefuseManager,
    setFitnessCenters,

    setManagersFilterName,
    setManagersFilterSelectFitnessCenter,
    managersResetFilters,

    displayManagerUpdateConfirm,
    dismissManagerUpdateConfirm,
    displayManagerDetailsModal,
    dismissManagerDetailsModal
} from "../actions/managersActions"

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import HttpMethods from "../utils/HttpMethods";
import Dates from "../utils/Dates";

import 'react-select/dist/react-select.css';

class Managers extends React.Component {

    componentWillMount() {
        if (this.props.managers_is_load === false) {
            this.getManagers();
        }
        if (this.props.fitness_centers_is_load === false) {
            this.getFitnessCenters();
        }
    }

    getManagers() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.MANAGER, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setManagers(response.data.managers);
                            me.props.setInitialManagers(response.data.managers);
                            me.filterName(me.props.filter_name);
                            me.props.setManagersIsLoad();
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

                if (me !== undefined) {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            }
        );
    }

    setActivity(item) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.FITNESS_CENTER_MANAGER_ID] = item._id;
        params[Fields.IS_ACTIVE] = !item.is_active;

        let me = this;

        let communication = new Communication(HttpMethods.PUT, Paths.HOST + Paths.MANAGER_ACTIVITY, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setManagerActivity({
                                _id: item._id,
                                is_active: !item.is_active,
                                time: new Date().getTime(),
                                last_update_admin_id: response.data.administrator_id,
                                last_update_admin_name: response.data.administrator_name
                            });
                            me.filterName(me.props.filter_name);
                            me.props.dismissManagerUpdateConfirm();
                            me.forceUpdate();
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

    setValidation(item, is_validated) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.FITNESS_CENTER_MANAGER_ID] = item._id;
        params[Fields.IS_VALIDATED] = is_validated;

        let me = this;

        let communication = new Communication(HttpMethods.PUT, Paths.HOST + Paths.MANAGER, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setValidateManager({
                                _id: item._id,
                                is_validated: is_validated,
                                time: new Date().getTime(),
                                validator_admin_id: response.data.administrator_id,
                                validator_admin_name: response.data.administrator_name
                            });
                            me.filterName(me.props.filter_name);
                            me.props.dismissManagerUpdateConfirm();
                            me.forceUpdate();
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

    undoRefuse(item) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.FITNESS_CENTER_MANAGER_ID] = item._id;

        let me = this;

        let communication = new Communication(HttpMethods.PUT, Paths.HOST + Paths.MANAGER_UNDO_REFUSE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setUndoRefuseManager({
                                _id: item._id
                            });
                            me.filterName(me.props.filter_name);
                            me.props.dismissManagerUpdateConfirm();
                            me.forceUpdate();
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

    resetFilters() {
        this.props.managersResetFilters();
        this.props.setManagers(this.props.initial_managers);
    }

    nameFilterChange(event) {
        this.props.setManagersFilterName(event.target.value);
        this.filterName(event.target.value);
    }

    fitnessCenterFilterChange(selected) {
        this.props.setManagersFilterSelectFitnessCenter(selected.value);
        this.filterFitnessCenter(selected === undefined ? "" : selected.value);
    }

    filterName(value) {

        let me = this;
        let updatedManagers = this.props.initial_managers;
        updatedManagers = updatedManagers.filter(function (item) {
            return me.getNameBool(value, item) &&
                me.getFitnessCenterBool(me.props.filter_select_fitness_center, item);
        });
        this.props.setManagers(updatedManagers);
    }

    filterFitnessCenter(value) {

        let me = this;
        let updatedManagers = this.props.initial_managers;
        updatedManagers = updatedManagers.filter(function (item) {
            return me.getNameBool(me.props.filter_name, item) &&
                me.getFitnessCenterBool(value, item);
        });
        this.props.setManagers(updatedManagers);
    }

    getNameBool(value, item) {
        return ((item.first_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.last_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.email_address.toLowerCase().search(value.toLowerCase()) !== -1));
    }

    getFitnessCenterBool(value_select, item) {
        return (value_select === undefined || value_select === "" || value_select === item.fitness_center._id);
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    getDetailsOverlay(item) {
        return (
            <Tooltip id={"tooltip_details"}>
                {Texts.AFFICHER_LA_FICHE_COMPLETE.text_fr}
            </Tooltip>
        );
    }

    getValidateOverlay(item) {
        return (
            <Tooltip id={"tooltip_validate"}>
                {Texts.VALIDER_LE_COMPTE.text_fr}
            </Tooltip>
        );
    }

    getRefuseOverlay(item) {
        return (
            <Tooltip id={"tooltip_refuse"}>
                {Texts.REFUSER_LE_COMPTE.text_fr}
            </Tooltip>
        );
    }

    getValidatedOverlay(item) {
        return (
            <Tooltip id={"tooltip_validated"}>
                {
                    Texts.LE_COMPTE_A_ETE_VALIDE_LE.text_fr + " " +
                    Dates.format(item.validation_date) + " " +
                    Texts.PAR.text_fr + " " +
                    item.validator_admin_name +
                    " (" + (item.validator_admin_is_manager ? Texts.GERANT.text_fr : Texts.ADMIN.text_fr) + ") "
                }
            </Tooltip>
        );
    }

    getRefusedOverlay(item) {
        return (
            <Tooltip id={"tooltip_refused"}>
                {
                    Texts.LE_COMPTE_A_ETE_REFUSE_LE.text_fr + " " +
                    Dates.format(item.validation_date) + " " +
                    Texts.PAR.text_fr + " " +
                    item.validator_admin_name +
                    " (" + (item.validator_admin_is_manager ? Texts.GERANT.text_fr : Texts.ADMIN.text_fr) + ") "
                }
            </Tooltip>
        );
    }

    getSetActiveOverlay(item) {
        return (
            <Tooltip id={"tooltip_set_active"}>
                {
                    Texts.RENDU_INACTIF_PAR.text_fr + " " +
                    item.last_update_admin_name +
                    " (" + (item.last_update_admin_is_manager ? Texts.GERANT.text_fr : Texts.ADMIN.text_fr) + ") " +
                    Texts.LE.text_fr + " " +
                    Dates.format(item.last_update_activity)
                }
            </Tooltip>
        );
    }

    getSetInactiveOverlay(item) {
        return (
            <Tooltip id={"tooltip_set_inactive"}>
                {
                    Texts.RENDU_ACTIF_PAR.text_fr + " " +
                    item.last_update_admin_name +
                    " (" + (item.last_update_admin_is_manager ? Texts.GERANT.text_fr : Texts.ADMIN.text_fr) + ") " +
                    Texts.LE.text_fr + " " +
                    Dates.format(item.last_update_activity)
                }
            </Tooltip>
        );
    }

    detailsClick(item) {
        this.props.displayManagerDetailsModal(item);
    }

    validateClick(item) {
        if (item.is_validated === false && item.is_refused === false) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: Texts.VALIDER_CE_COMPTE.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_VALIDER_CE_COMPTE.text_fr + " ?",
                update_confirm_is_validation: true,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active,
                update_confirm_is_validated: true,
                update_confirm_is_undo_refuse: false
            });
        }
    }

    refuseClick(item) {
        if (item.is_validated === false && item.is_refused === false) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: Texts.REFUSER_CE_COMPTE.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_REFUSER_CE_COMPTE.text_fr + " ?",
                update_confirm_is_validation: true,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active,
                update_confirm_is_validated: false,
                update_confirm_is_undo_refuse: false
            });
        }
    }

    setActiveClick(item) {
        if (item.is_validated === true && item.is_active === false) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: Texts.RENDRE_ACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_RENDRE_ACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_is_validation: false,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active,
                update_confirm_is_validated: item.is_validated,
                update_confirm_is_undo_refuse: false
            });
        }
    }

    setInactiveClick(item) {
        if (item.is_validated === true && item.is_active === true) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: Texts.RENDRE_INACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_RENDRE_INACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_is_validation: false,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active,
                update_confirm_is_validated: item.is_validated,
                update_confirm_is_undo_refuse: false
            });
        }
    }

    undoRefuseClick(item) {
        if (item.is_refused === true && item.is_validated === false) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: Texts.ANNULER_LE_REFUS.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_ANNULER_LE_REFUS_SUR_CE_COMPTE.text_fr + " ?",
                update_confirm_is_validation: false,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active,
                update_confirm_is_validated: item.is_validated,
                update_confirm_is_undo_refuse: true
            });
        }
    }

    handleUpdateConfirmDismiss() {
        this.props.dismissManagerUpdateConfirm();
    }

    confirmUpdateModal() {
        if (this.props.update_confirm_is_undo_refuse === true) {
            this.undoRefuse({
                _id: this.props.update_confirm_id
            });
        } else if (this.props.update_confirm_is_validation === true) {
            this.setValidation({
                _id: this.props.update_confirm_id
            }, this.props.update_confirm_is_validated);
        } else {
            this.setActivity({
                _id: this.props.update_confirm_id,
                is_active: this.props.update_confirm_is_active
            });
        }
    }

    handleDetailsDismiss() {
        this.props.dismissManagerDetailsModal();
    }

    render() {

        return (
            <Panel header={<div><Glyphicon glyph="user" /> {Texts.GERANT.text_fr + "s"}</div>} bsStyle="primary">

                <Panel>
                    <Panel header={<div><Glyphicon glyph="filter" /> {Texts.FILTRE.text_fr}</div>}>
                        <Form horizontal>
                            <Col xs={12} sm={12} md={6} lg={6}>

                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={3} sm={3} md={3} lg={3}>
                                        {Texts.PAR_NOM.text_fr}
                                    </Col>
                                    <Col xs={9} sm={9} md={9} lg={9}>
                                        <FormControl
                                            type="text"
                                            placeholder={Texts.NOM.text_fr}
                                            value={this.props.filter_name}
                                            onChange={this.nameFilterChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>

                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6}>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={3} sm={3} md={3} lg={3}>
                                        {Texts.PAR_SALLE.text_fr}
                                    </Col>

                                    <Col xs={9} sm={9} md={9} lg={9}>
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
                            <th>{Texts.EMAIL.text_fr}</th>
                            <th>{Texts.STATUS.text_fr}</th>
                            <th>{Texts.DATE_DE_CREATION.text_fr}</th>
                            <th style={{textAlign: "center"}}>{Texts.VALIDATION.text_fr}</th>
                            <th style={{textAlign: "center"}}>{Texts.ACTIVITE.text_fr}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.managers !== undefined && this.props.managers.map((item) => (
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
                                <td style={{verticalAlign: "middle"}}>{item.email_address}</td>
                                <td style={{verticalAlign: "middle"}}>
                                    {
                                        item.is_principal === true &&

                                        <span>
                                            <Glyphicon glyph="certificate" /> {Texts.PRINCIPAL.text_fr}
                                        </span>
                                    }
                                    {
                                        item.is_principal === false &&
                                        <span>
                                            {Texts.SECONDAIRE.text_fr}
                                        </span>
                                    }
                                </td>
                                <td style={{verticalAlign: "middle"}}>{Dates.formatDateOnly(item.creation_date)}</td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
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
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

                <Modal show={this.props.show_details_modal} bsSize={"large"} onHide={this.handleDetailsDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                this.props.details_modal_manager.is_principal &&

                                <span>
                                    <Glyphicon glyph="certificate" /> {
                                        this.props.details_modal_manager.first_name + " " +
                                        this.props.details_modal_manager.last_name + " - " +
                                        this.props.details_modal_manager.fitness_center.name
                                    }
                                </span>
                            }
                            {
                                !this.props.details_modal_manager.is_principal &&

                                <span>
                                    {
                                        this.props.details_modal_manager.first_name + " " +
                                        this.props.details_modal_manager.last_name + " - " +
                                        this.props.details_modal_manager.fitness_center.name
                                    }
                                </span>
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Panel header={Texts.GERANT.text_fr}>
                            <Form horizontal>

                                <FormGroup>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.DATE_DE_CREATION.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {Dates.format(this.props.details_modal_manager.creation_date)}
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.STATUS.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {
                                            !this.props.details_modal_manager.is_principal &&

                                                <span>
                                                    {Texts.SECONDAIRE.text_fr}
                                                </span>
                                        }
                                        {
                                            this.props.details_modal_manager.is_principal &&

                                            <span>
                                                <Glyphicon glyph="certificate" /> {Texts.PRINCIPAL.text_fr}
                                            </span>
                                        }
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.PRENOM.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {this.props.details_modal_manager.first_name}
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.NOM.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {this.props.details_modal_manager.last_name}
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.EMAIL.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {this.props.details_modal_manager.email_address}
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.TELEPHONE.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {this.props.details_modal_manager.phone_number}
                                    </Col>
                                </FormGroup>

                                <br/>

                                {
                                    this.props.details_modal_manager.is_validated === true &&

                                    (
                                        <FormGroup>
                                            <Col xs={2} sm={2} md={2} lg={2}>
                                                {
                                                    this.props.details_modal_manager.is_active === true &&
                                                    (
                                                        <span style={{fontWeight: "bold", color: "green"}}>
                                                            {Texts.ACTIF.text_fr}
                                                        </span>
                                                    )
                                                }
                                                {
                                                    this.props.details_modal_manager.is_active === false &&
                                                    (
                                                        <span style={{fontWeight: "bold", color: "red"}}>
                                                            {Texts.INACTIF.text_fr}
                                                        </span>
                                                    )
                                                }
                                            </Col>
                                            <Col xs={1} sm={1} md={1} lg={1}>
                                                {Texts.DEPUIS.text_fr}
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                {Dates.format(this.props.details_modal_manager.last_update_activity)}
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                <span style={{fontWeight: "bold"}}>
                                                    {Texts.ACTION_EFFECTUEE_PAR.text_fr + " :"}
                                                </span>
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                {
                                                    this.props.details_modal_manager.last_update_admin_name +
                                                    " (" + (this.props.details_modal_manager.last_update_admin_is_manager ? Texts.GERANT.text_fr : Texts.ADMIN.text_fr) + ") "
                                                }
                                            </Col>
                                        </FormGroup>
                                    )
                                }

                                {
                                    (
                                        this.props.details_modal_manager.is_validated === true ||
                                        this.props.details_modal_manager.is_refused === true
                                    )
                                        &&
                                    (
                                        <FormGroup>
                                            <Col xs={2} sm={2} md={2} lg={2}>
                                                {
                                                    this.props.details_modal_manager.is_validated === true &&
                                                    (
                                                        <span style={{fontWeight: "bold", color: "green"}}>
                                                            {Texts.VALIDE.text_fr}
                                                        </span>
                                                    )
                                                }
                                                {
                                                    this.props.details_modal_manager.is_refused === true &&
                                                    (
                                                        <span style={{fontWeight: "bold", color: "red"}}>
                                                            {Texts.REFUSE.text_fr}
                                                        </span>
                                                    )
                                                }
                                            </Col>
                                            <Col xs={1} sm={1} md={1} lg={1}>
                                                {Texts.DEPUIS.text_fr}
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                {Dates.format(this.props.details_modal_manager.validation_date)}
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                <span style={{fontWeight: "bold"}}>
                                                    {Texts.ACTION_EFFECTUEE_PAR.text_fr + " :"}
                                                </span>
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                {
                                                    this.props.details_modal_manager.validator_admin_name +
                                                    " (" + (this.props.details_modal_manager.validator_admin_is_manager ? Texts.GERANT.text_fr : Texts.ADMIN.text_fr) + ") "
                                                }
                                            </Col>
                                        </FormGroup>
                                    )
                                }

                            </Form>
                        </Panel>
                        <Panel header={Texts.SALLE_SPORT.text_fr}>
                            <Form horizontal>

                                <FormGroup>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.DATE_DE_CREATION.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {Dates.format(this.props.details_modal_manager.fitness_center.creation_date)}
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.NOM.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {this.props.details_modal_manager.fitness_center.name}
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.ADRESSE.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {this.props.details_modal_manager.fitness_center.address}
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.VILLE.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {this.props.details_modal_manager.fitness_center.city}
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.ADRESSE_COMPLEMENT.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {
                                            (
                                                (this.props.details_modal_manager.fitness_center.address_second === "" ||
                                                this.props.details_modal_manager.fitness_center.address_second === null ||
                                                    this.props.details_modal_manager.fitness_center.address_second === undefined) ?
                                                "/" : this.props.details_modal_manager.fitness_center.address_second
                                            )

                                        }
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.CODE_POSTAL.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {this.props.details_modal_manager.fitness_center.zip_code}
                                    </Col>
                                </FormGroup>

                                <br/>

                                <FormGroup>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.SIRET.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <br/>
                                    <Col xs={2} sm={2} md={2} lg={2}>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3} style={{textAlign: "center"}}>
                                        <span style={{fontWeight: "bold"}}>
                                            {this.props.details_modal_manager.fitness_center.siret}
                                        </span>
                                    </Col>
                                    <br/>
                                    <Col xs={2} sm={2} md={2} lg={2}>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3} style={{textAlign: "center"}}>
                                        <Button>
                                            {Texts.CONSULTER.text_fr}
                                        </Button>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.DESCRIPTION.text_fr + " : "}
                                        </span>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        {this.props.details_modal_manager.fitness_center.description}
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel>
                        {
                            this.props.details_modal_manager.is_validated === false &&
                            this.props.details_modal_manager.is_refused === false &&

                            <Panel>
                                <h3 style={{textAlign: "center"}}>
                                    {Texts.VALIDATION.text_fr}
                                </h3>
                                <Col xs={4} sm={4} md={4} lg={4}>
                                </Col>
                                <Col xs={1} sm={1} md={1} lg={1}>
                                    <Button
                                        className={"pull-left"}
                                        bsStyle={"success"}
                                        onClick={this.validateClick.bind(this, this.props.details_modal_manager)}
                                    >
                                        <Glyphicon glyph="ok" />
                                        &nbsp;
                                        {Texts.VALIDER.text_fr}
                                    </Button>
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                </Col>
                                <Col xs={1} sm={1} md={1} lg={1}>
                                    <Button
                                        className={"pull-right"}
                                        bsStyle={"danger"}
                                        onClick={this.refuseClick.bind(this, this.props.details_modal_manager)}
                                    >
                                        <Glyphicon glyph="remove" />
                                        &nbsp;
                                        {Texts.REFUSER.text_fr}
                                    </Button>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4}>
                                </Col>
                            </Panel>
                        }
                        {
                            this.props.details_modal_manager.is_validated === true

                            &&

                            <Panel>
                                <h3 style={{textAlign: "center"}}>
                                    {Texts.ACTIVITE.text_fr}
                                </h3>
                                <Col xs={5} sm={5} md={5} lg={5}>
                                </Col>

                                <Col xs={1} sm={1} md={1} lg={1}>
                                    {
                                        this.props.details_modal_manager.is_validated === true &&
                                        this.props.details_modal_manager.is_active === false &&

                                        <Button onClick={this.setActiveClick.bind(this, this.props.details_modal_manager)}>
                                            <span style={{color: "blue"}}>
                                                <Glyphicon glyph="off" />
                                            </span>&nbsp;
                                            {Texts.RENDRE_ACTIF.text_fr}
                                        </Button>
                                    }
                                    {
                                        this.props.details_modal_manager.is_validated === true &&
                                        this.props.details_modal_manager.is_active === true &&

                                        <Button onClick={this.setInactiveClick.bind(this, this.props.details_modal_manager)}>
                                            <span style={{color: "red"}}>
                                                <Glyphicon glyph="off" />
                                            </span>&nbsp;
                                            {Texts.RENDRE_INACTIF.text_fr}
                                        </Button>
                                    }
                                </Col>

                                <Col xs={5} sm={5} md={5} lg={5}>
                                </Col>
                            </Panel>
                        }
                        {
                            this.props.details_modal_manager.is_refused === true

                            &&

                            <Panel>
                                <h3 style={{textAlign: "center"}}>
                                    {Texts.VALIDATION.text_fr}
                                </h3>
                                <Col xs={5} sm={5} md={5} lg={5}>
                                </Col>

                                <Col xs={1} sm={1} md={1} lg={1}>

                                    <Button onClick={this.undoRefuseClick.bind(this, this.props.details_modal_manager)}>
                                        <span style={{color: "red"}}>
                                            <Glyphicon glyph="repeat" />
                                        </span>&nbsp;
                                        {Texts.ANNULER_LE_REFUS.text_fr}
                                    </Button>

                                </Col>

                                <Col xs={5} sm={5} md={5} lg={5}>
                                </Col>
                            </Panel>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDetailsDismiss.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
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

                <Modal show={this.props.show_update_confirm} onHide={this.handleUpdateConfirmDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.update_confirm_title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static style={{textAlign: "center"}}>
                            {this.props.update_confirm_text}<br/><br/>
                            {this.props.update_confirm_name}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleUpdateConfirmDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}
                        </Button>
                        <Button bsStyle={"primary"} onClick={this.confirmUpdateModal.bind(this)}>
                            <Glyphicon glyph="ok" /> {Texts.CONFIRMER.text_fr}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        managers: state.managers.managers,
        initial_managers: state.managers.initial_managers,
        fitness_centers: state.managers.fitness_centers,

        filter_name: state.managers.filter_name,
        filter_select_fitness_center: state.managers.filter_select_fitness_center,

        show_update_confirm: state.managers.show_update_confirm,
        update_confirm_title: state.managers.update_confirm_title,
        update_confirm_text: state.managers.update_confirm_text,
        update_confirm_is_validation: state.managers.update_confirm_is_validation,
        update_confirm_id: state.managers.update_confirm_id,
        update_confirm_name: state.managers.update_confirm_name,
        update_confirm_is_active: state.managers.update_confirm_is_active,
        update_confirm_is_validated: state.managers.update_confirm_is_validated,
        update_confirm_is_undo_refuse: state.managers.update_confirm_is_undo_refuse,

        show_details_modal: state.managers.show_details_modal,
        details_modal_manager: state.managers.details_modal_manager,

        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,
        managers_is_load: state.global.managers_is_load,
        fitness_centers_is_load: state.global.fitness_centers_is_load
    };
}

export default connect(mapStateToProps, {
    setManagers,
    setInitialManagers,
    setManagerActivity,
    setValidateManager,
    setUndoRefuseManager,
    setFitnessCenters,

    setManagersFilterName,
    setManagersFilterSelectFitnessCenter,
    managersResetFilters,

    displayManagerUpdateConfirm,
    dismissManagerUpdateConfirm,
    displayManagerDetailsModal,
    dismissManagerDetailsModal,

    displayAlert,
    dismissAlert,
    setFitnessCentersIsLoad,
    setManagersIsLoad
})(Managers);