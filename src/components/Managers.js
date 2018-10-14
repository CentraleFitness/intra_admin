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
    setFitnessCenters,
    setManagersFilterName,
    setManagersFilterFitnessCenter,
    displayManagerUpdateConfirm,
    dismissManagerUpdateConfirm
} from "../actions/managersActions"

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import HttpMethods from "../utils/HttpMethods";
import Dates from "../utils/Dates";

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

    setValidation(item) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.FITNESS_CENTER_MANAGER_ID] = item._id;

        let me = this;

        let communication = new Communication(HttpMethods.PUT, Paths.HOST + Paths.MANAGER, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setValidateManager({
                                _id: item._id,
                                time: new Date().getTime(),
                                validator_admin_id: response.data.administrator_id,
                                validator_admin_name: response.data.administrator_name
                            });
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

    nameFilterChange(event) {
        this.props.setManagersFilterName(event.target.value);
        this.filterName(event.target.value);
    }

    filterName(value) {
        let updatedManagers = this.props.initial_managers;
        if (value !== "" && value !== null) {
            updatedManagers = updatedManagers.filter(function (item) {
                return ((item.first_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
                    (item.last_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
                    (item.email_address.toLowerCase().search(value.toLowerCase()) !== -1));
            });
        }
        this.props.setManagers(updatedManagers);
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    getValidateOverlay(item) {
        return (
            <Tooltip id={"tooltip_validate"}>
                {Texts.VALIDER_LE_COMPTE.text_fr}
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
                    item.validator_admin_name
                }
            </Tooltip>
        );
    }

    getSetActiveOverlay(item) {
        return (
            <Tooltip id={"tooltip_set_active"}>
                {
                    Texts.RENDU_INACTIF_PAR.text_fr + " " +
                    item.last_update_admin_name + " " +
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
                    item.last_update_admin_name + " " +
                    Texts.LE.text_fr + " " +
                    Dates.format(item.last_update_activity)
                }
            </Tooltip>
        );
    }

    validateClick(item) {
        if (item.is_validated === false) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: "Valider ce compte ?",
                update_confirm_text: "Voulez vous vraiment valider le compte de cet utilisateur ?",
                update_confirm_is_validation: true,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active
            });
        }
    }

    setActiveClick(item) {
        if (item.is_validated === true && item.is_active === false) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: "Rendre actif ce compte ?",
                update_confirm_text: "Voulez vous vraiment rendre actif le compte de cet utilisateur ?",
                update_confirm_is_validation: false,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active
            });
        }
    }

    setInactiveClick(item) {
        if (item.is_validated === true && item.is_active === true) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: "Rendre inactif ce compte ?",
                update_confirm_text: "Voulez vous vraiment rendre inactif le compte de cet utilisateur ?",
                update_confirm_is_validation: false,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active
            });
        }
    }

    handleUpdateConfirmDismiss() {
        this.props.dismissManagerUpdateConfirm();
    }

    confirmUpdateModal() {
        if (this.props.update_confirm_is_validation === true) {
            this.setValidation({
                _id: this.props.update_confirm_id
            });
        } else {
            this.setActivity({
                _id: this.props.update_confirm_id,
                is_active: this.props.update_confirm_is_active
            });
        }
    }

    render() {

        return (
            <Panel header={<div><Glyphicon glyph="user" /> {Texts.GERANT.text_fr + "s"}</div>} bsStyle="primary">

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
                    </Form>
                </Panel>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>{Texts.PRENOM.text_fr}</th>
                            <th>{Texts.NOM.text_fr}</th>
                            <th>{Texts.EMAIL.text_fr}</th>
                            <th>{Texts.DATE_DE_CREATION.text_fr}</th>
                            <th style={{textAlign: "center"}}>{Texts.VALIDATION.text_fr}</th>
                            <th style={{textAlign: "center"}}>{Texts.ACTIVITE.text_fr}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.managers !== undefined && this.props.managers.map((item) => (
                            <tr key={item._id}>
                                <td style={{verticalAlign: "middle"}}>{item.first_name}</td>
                                <td style={{verticalAlign: "middle"}}>{item.last_name}</td>
                                <td style={{verticalAlign: "middle"}}>{item.email_address}</td>
                                <td style={{verticalAlign: "middle"}}>{Dates.formatDateOnly(item.creation_date)}</td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                    {
                                        item.is_validated === false &&

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
                                        item.is_validated === true &&

                                        <OverlayTrigger placement="bottom" overlay={this.getValidatedOverlay(item)}>
                                            <span style={{color: "green"}}>
                                                {Texts.VALIDE.text_fr + " ( " + Dates.formatDateOnly(item.validation_date) + " )"}
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
        filter_fitness_center: state.managers.filter_fitness_center,

        show_update_confirm: state.managers.show_update_confirm,
        update_confirm_title: state.managers.update_confirm_title,
        update_confirm_text: state.managers.update_confirm_text,
        update_confirm_is_validation: state.managers.update_confirm_is_validation,
        update_confirm_id: state.managers.update_confirm_id,
        update_confirm_name: state.managers.update_confirm_name,
        update_confirm_is_active: state.managers.update_confirm_is_active,

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
    setFitnessCenters,
    setManagersFilterName,
    setManagersFilterFitnessCenter,
    displayManagerUpdateConfirm,
    dismissManagerUpdateConfirm,

    displayAlert,
    dismissAlert,
    setFitnessCentersIsLoad,
    setManagersIsLoad
})(Managers);