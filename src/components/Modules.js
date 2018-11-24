import React from 'react';

import { connect } from 'react-redux';

import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button,
    Form,
    FormGroup,
    Col,
    ControlLabel,
    Table,
    Checkbox,
    HelpBlock
} from 'react-bootstrap';

import Select from 'react-select';

import {
    displayAlert,
    dismissAlert,

    setModulesIsLoad,
    setModuleStatesIsLoad,
    setFitnessCentersIsLoad
} from "../actions/globalActions";

import {
    setModules,
    setInitialModules,
    addModule,
    updateModule,

    setModuleStates,
    setModulesFilterUuid,
    setModulesFilterSelectFitnessCenter,
    modulesResetFilters,

    displayEditModuleModal,
    displayCreateModuleModal,
    dismissEditModuleModal,

    setCurrentModuleAutoGenerateUuid,
    setCurrentModuleUuid,
    setCurrentModuleFitnessCenterId,
    setCurrentModuleMachineType,
    setCurrentModuleModuleStateId
} from "../actions/modulesActions"

import {
    setFitnessCenters
} from "../actions/managersActions"

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";
import HttpMethods from "../utils/HttpMethods";

import 'react-select/dist/react-select.css';
import Validator from "../utils/Validator";

class Modules extends React.Component {

    componentWillMount() {
        if (this.props.modules_is_load === false) {
            this.getModules();
        }
        if (this.props.module_states_is_load === false) {
            this.getModuleStates();
        }
        if (this.props.fitness_centers_is_load === false) {
            this.getFitnessCenters();
        }
    }

    getModules() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.MODULE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setModules(response.data.modules);
                            me.props.setInitialModules(response.data.modules);
                            me.filterUuid(me.props.filter_uuid);
                            me.props.setModulesIsLoad();
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

    getModuleStates() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.MODULE_STATE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setModuleStates(response.data.module_states);
                            me.props.setModuleStatesIsLoad();
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

    createUpdateModule(is_creation) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        if (is_creation) {
            params[Fields.AUTO_GENERATE_UUID] = this.props.edit_modal_module.auto_generate_uuid;
            if (this.props.edit_modal_module.auto_generate_uuid === false) {
                params[Fields.UUID] = this.props.edit_modal_module.UUID;
            }
        } else {
            params[Fields.MODULE_ID] = this.props.edit_modal_module._id;
        }
        params[Fields.FITNESS_CENTER_ID] = this.props.edit_modal_module.fitness_center_id;
        params[Fields.MACHINE_TYPE] = this.props.edit_modal_module.machine_type;
        params[Fields.MODULE_STATE_CODE] = this.props.edit_modal_module.module_state_code;

        let me = this;

        let communication = new Communication(
            (is_creation ? HttpMethods.POST : HttpMethods.PUT), Paths.HOST + Paths.MODULE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {

                            if (is_creation) {
                                me.props.addModule({
                                    _id: response.data.module_id,
                                    UUID: response.data.uuid,
                                    fitness_center_id: me.props.edit_modal_module.fitness_center_id,
                                    machine_type: me.props.edit_modal_module.machine_type.toUpperCase(),
                                    module_state_code: me.props.edit_modal_module.module_state_code,
                                    module_state_id: me.props.edit_modal_module.module_state_id,
                                    creation_date: new Date().getTime(),
                                    update_date: new Date().getTime(),
                                    creator_admin_id: response.data.creator_admin_id,
                                    creator_admin_name: response.data.creator_admin_name
                                });
                            } else {
                                me.props.updateModule({
                                    _id: me.props.edit_modal_module._id,
                                    fitness_center_id: me.props.edit_modal_module.fitness_center_id,
                                    machine_type: me.props.edit_modal_module.machine_type.toUpperCase(),
                                    module_state_code: me.props.edit_modal_module.module_state_code,
                                    module_state_id: me.props.edit_modal_module.module_state_id,
                                    time: new Date().getTime()
                                });
                            }
                            me.props.dismissEditModuleModal();
                            me.forceUpdate();
                            me.filterUuid(me.props.filter_uuid);
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

    resetFilters() {
        this.props.modulesResetFilters();
        this.props.setModules(this.props.initial_modules);
    }

    uuidFilterChange(event) {
        this.props.setModulesFilterUuid(event.target.value);
        this.filterUuid(event.target.value);
    }

    fitnessCenterFilterChange(selected) {
        this.props.setModulesFilterSelectFitnessCenter(selected.value);
        this.filterFitnessCenter(selected === undefined ? "" : selected.value);
    }

    filterUuid(value) {

        let me = this;
        let updatedModules = this.props.initial_modules;
        updatedModules = updatedModules.filter(function (item) {
            return me.getUuidBool(value, item) &&
                me.getFitnessCenterBool(me.props.filter_select_fitness_center, item);
        });
        this.props.setModules(updatedModules);
    }

    filterFitnessCenter(value) {

        let me = this;
        let updatedModules = this.props.initial_modules;
        updatedModules = updatedModules.filter(function (item) {
            return me.getUuidBool(me.props.filter_uuid, item) &&
                me.getFitnessCenterBool(value, item);
        });
        this.props.setModules(updatedModules);
    }

    getUuidBool(value, item) {
        return (item.UUID.search(value) !== -1);
    }

    getFitnessCenterBool(value_select, item) {
        return (value_select === undefined || value_select === "" || value_select === item.fitness_center_id);
    }

    createModuleClick() {
        this.props.displayCreateModuleModal();
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    getFitnessCenterName(_id) {
        let name = "";
        this.props.fitness_centers.map(function (item) {
            if (_id === item._id) {
                name = item.label;
                return true;
            }
            return false;
        });
        return name;
    }

    getModuleStateName(_id) {
        let name = "";
        this.props.module_states.map(function (item) {
            if (_id === item._id) {
                name = item.text_fr;
                return true;
            }
            return false;
        });
        return name;
    }

    getModuleStateGlyph(code) {
        let glyph = "";
        let color = "";
        if (code === 0) {
            glyph = "send";
            color = "#5491f2";
        } else if (code === 1) {
            glyph = "gift";
            color = "#5491f2";
        } else if (code === 2) {
            glyph = "ok";
            color = "green";
        } else if (code === 3) {
            glyph = "flash";
            color = "#f2dd2b";
        } else if (code === 4) {
            glyph = "remove";
            color = "red";
        }
        return (
            <span style={{color: color}}>
                <Glyphicon glyph={glyph} />&nbsp;
            </span>
        );
    }

    getValidationState(field) {

        let value;
        switch (field) {
            case "uuid":
                value = this.props.edit_modal_module.UUID;
                break;
            case "fitness_center":
                value = this.props.edit_modal_module.fitness_center_id;
                break;
            case "machine_type":
                value = this.props.edit_modal_module.machine_type;
                break;
            case "module_state":
                value = this.props.edit_modal_module.module_state_id;
                break;
            default:
                return "warning";
        }

        if (field === "uuid") {

            if (this.props.edit_modal_module.auto_generate_uuid || Validator.uuid(value))
                return "success";

        } else if (field === "fitness_center") {

            if (value !== "") {
                return "success";
            }

        } else if (field === "machine_type") {

            if (Validator.name(value))
                return "success";

        } else if (field === "module_state") {

            if (value !== "") {
                return "success";
            }
        }
        return "warning";
    }

    handleEditModalDismiss() {
        this.props.dismissEditModuleModal();
    }

    confirmModuleCreate() {
        if (this.props.edit_modal_module.auto_generate_uuid === this.props.keep_edit_modal_module.auto_generate_uuid &&
            this.props.edit_modal_module.UUID === this.props.keep_edit_modal_module.UUID &&
            this.props.edit_modal_module.fitness_center_id === this.props.keep_edit_modal_module.fitness_center_id &&
            this.props.edit_modal_module.machine_type === this.props.keep_edit_modal_module.machine_type &&
            this.props.edit_modal_module.module_state_id === this.props.keep_edit_modal_module.module_state_id) {

            this.props.dismissEditModuleModal();
            return;
        }

        let is_creation = false;
        if (this.props.edit_modal_module._id === "") {
            is_creation = true;
        }

        if ((is_creation && !this.props.edit_modal_module.auto_generate_uuid && !Validator.uuid(this.props.edit_modal_module.UUID)) ||
            this.props.edit_modal_module.fitness_center_id === "" ||
            !Validator.name(this.props.edit_modal_module.machine_type) ||
            this.props.edit_modal_module.module_state_id === "") {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        this.createUpdateModule(is_creation);
    }

    handleAutoGenerateUuidChange(event) {
        this.props.setCurrentModuleAutoGenerateUuid(event.target.checked);
    }

    handleUuidChange(event) {
        this.props.setCurrentModuleUuid(event.target.value);
    }

    handleFitnessCenterChange(selected) {
        this.props.setCurrentModuleFitnessCenterId(selected.value);
    }

    handleMachineTypeChange(event) {
        this.props.setCurrentModuleMachineType(event.target.value);
    }

    handleModuleStateChange(selected) {
        this.props.setCurrentModuleModuleStateId({
            _id: selected.value,
            code: selected.code
        });
    }

    handleEditModuleDisplay(item) {
        this.props.displayEditModuleModal(item);
    }

    render() {

        return (
            <Panel header={<div><Glyphicon glyph="list" /> {Texts.MODULES.text_fr}</div>} bsStyle="primary">

                <Panel>
                    <Panel header={<div><Glyphicon glyph="filter" /> {Texts.FILTRE.text_fr}</div>}>
                        <Form horizontal>
                            <Col xs={12} sm={12} md={6} lg={6}>

                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={12} sm={12} md={3} lg={3}>
                                        {Texts.PAR_UUID.text_fr}
                                    </Col>
                                    <Col xs={12} sm={12} md={9} lg={9}>
                                        <FormControl
                                            type="text"
                                            placeholder={Texts.UUID.text_fr}
                                            value={this.props.filter_uuid}
                                            onChange={this.uuidFilterChange.bind(this)}
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

                    <Button
                        className={"pull-right"}
                        onClick={this.createModuleClick.bind(this)}
                    >
                        <Glyphicon glyph="plus" /> {Texts.CREER_UN_MODULE.text_fr}
                    </Button>
                </Panel>

                <Table responsive>
                    <thead>
                    <tr>
                        <th>{Texts.UUID.text_fr}</th>
                        <th>{Texts.SALLE_SPORT.text_fr}</th>
                        <th>{Texts.TYPE_DE_MACHINE.text_fr}</th>
                        <th>{Texts.ETAT.text_fr}</th>
                        <th>{Texts.ACTION.text_fr + "s"}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.modules !== undefined && this.props.modules.map((item) => (
                            <tr key={item._id}>
                                <td style={{verticalAlign: "middle"}}>{item.UUID}</td>
                                <td style={{verticalAlign: "middle"}}>{this.getFitnessCenterName(item.fitness_center_id)}</td>
                                <td style={{verticalAlign: "middle"}}>{item.machine_type}</td>
                                <td style={{verticalAlign: "middle"}}>
                                    {this.getModuleStateGlyph(item.module_state_code)}
                                    {
                                        this.getModuleStateName(item.module_state_id)
                                    }
                                </td>
                                <td style={{verticalAlign: "middle"}}>
                                    <Button onClick={this.handleEditModuleDisplay.bind(this, item)}>
                                        <span style={{color: "blue"}}>
                                            <Glyphicon glyph="pencil" />
                                        </span>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

                <Modal show={this.props.show_edit_modal} onHide={this.handleEditModalDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                this.props.edit_modal_module._id === "" &&

                                Texts.CREER_UN_MODULE.text_fr
                            }
                            {
                                this.props.edit_modal_module._id !== "" &&

                                Texts.MODULE.text_fr + " n° " + this.props.edit_modal_module.UUID + " - " +
                                this.getFitnessCenterName(this.props.edit_modal_module.fitness_center_id)
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>

                            {
                                this.props.edit_modal_module._id !== "" &&

                                <FormGroup>
                                    <Col xs={12} sm={12} md={4} lg={4}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.DATE_DE_CREATION.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={12} sm={12} md={8} lg={8}>
                                        {Dates.format(this.props.edit_modal_module.creation_date)}
                                    </Col>

                                </FormGroup>
                            }

                            {
                                this.props.edit_modal_module._id !== "" &&

                                <FormGroup>
                                    <Col xs={12} sm={12} md={4} lg={4}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.DERNIERE_MODIFICATION.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={12} sm={12} md={8} lg={8}>
                                        {Dates.format(this.props.edit_modal_module.update_date)}
                                    </Col>
                                </FormGroup>
                            }

                            <br/>

                            {
                                this.props.edit_modal_module._id !== "" &&

                                <FormGroup validationState={"success"}>
                                    <Col xs={12} sm={12} md={4} lg={4}>
                                        <ControlLabel>
                                            {Texts.UUID.text_fr + " : "}
                                        </ControlLabel>
                                    </Col>
                                    <Col xs={12} sm={12} md={8} lg={8}>
                                        <FormControl
                                            readOnly
                                            type="text"
                                            placeholder={Texts.UUID.text_fr}
                                            value={this.props.edit_modal_module.UUID}
                                        />
                                    </Col>

                                </FormGroup>
                            }

                            {
                                this.props.edit_modal_module._id === "" &&

                                <FormGroup validationState={this.getValidationState('uuid')}>

                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <Checkbox
                                            onChange={this.handleAutoGenerateUuidChange.bind(this)}
                                            checked={this.props.edit_modal_module.auto_generate_uuid}>
                                            {Texts.GENERER_AUTOMATIQUEMENT_LE_UUID.text_fr}
                                        </Checkbox>
                                        <br/>
                                    </Col>

                                    {
                                        this.props.edit_modal_module._id === "" &&
                                        this.props.edit_modal_module.auto_generate_uuid === false &&

                                        <FormGroup>
                                            <Col xs={0} sm={0} md={1} lg={1}>
                                            </Col>
                                            <Col xs={12} sm={12} md={3} lg={3}>
                                                <ControlLabel>
                                                    {Texts.UUID.text_fr + " : "}
                                                </ControlLabel>
                                            </Col>
                                            <Col xs={12} sm={12} md={7} lg={7}>
                                                <FormControl
                                                    type="text"
                                                    placeholder={Texts.UUID.text_fr}
                                                    value={this.props.edit_modal_module.UUID}
                                                    onChange={this.handleUuidChange.bind(this)}/>
                                                <HelpBlock>{Texts.REGLE_UUID.text_fr}</HelpBlock>
                                            </Col>
                                            <Col xs={0} sm={0} md={1} lg={1}>
                                            </Col>
                                        </FormGroup>
                                    }

                                </FormGroup>
                            }

                            <FormGroup validationState={this.getValidationState('fitness_center')}>

                                <Col xs={12} sm={12} md={4} lg={4}>
                                    <ControlLabel>
                                        {Texts.SALLE_SPORT.text_fr + " : "}
                                    </ControlLabel>
                                </Col>
                                <Col xs={12} sm={12} md={8} lg={8}>
                                    <Select
                                        clearable={false}
                                        value={this.props.edit_modal_module.fitness_center_id}
                                        onChange={this.handleFitnessCenterChange.bind(this)}
                                        options={this.props.fitness_centers}
                                    />
                                </Col>

                            </FormGroup>

                            <FormGroup validationState={this.getValidationState('machine_type')}>

                                <Col xs={12} sm={12} md={4} lg={4}>
                                    <ControlLabel>
                                        {Texts.TYPE_DE_MACHINE.text_fr + " : "}
                                    </ControlLabel>
                                </Col>
                                <Col xs={12} sm={12} md={8} lg={8}>
                                    <FormControl
                                        type="text"
                                        placeholder={Texts.TYPE_DE_MACHINE.text_fr}
                                        value={this.props.edit_modal_module.machine_type}
                                        onChange={this.handleMachineTypeChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup validationState={this.getValidationState('module_state')}>

                                <Col xs={12} sm={12} md={4} lg={4}>
                                    <ControlLabel>
                                        {Texts.ETAT_DU_MODULE.text_fr + " : "}
                                    </ControlLabel>
                                </Col>
                                <Col xs={12} sm={12} md={8} lg={8}>
                                    <Select
                                        clearable={false}
                                        value={this.props.edit_modal_module.module_state_id}
                                        onChange={this.handleModuleStateChange.bind(this)}
                                        options={this.props.module_states}
                                    />
                                </Col>
                            </FormGroup>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleEditModalDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.ANNULER.text_fr}
                        </Button>
                        <Button bsStyle={"primary"} onClick={this.confirmModuleCreate.bind(this)}>
                            <Glyphicon glyph="floppy-disk" /> {Texts.SAUVEGARDER.text_fr}
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

            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,
        modules_is_load: state.global.modules_is_load,
        module_states_is_load: state.global.module_states_is_load,
        fitness_centers_is_load: state.global.fitness_centers_is_load,

        modules: state.modules.modules,
        initial_modules: state.modules.initial_modules,
        module_states: state.modules.module_states,
        fitness_centers: state.managers.fitness_centers,
        filter_uuid: state.modules.filter_uuid,
        filter_select_fitness_center: state.modules.filter_select_fitness_center,

        show_edit_modal: state.modules.show_edit_modal,
        edit_modal_module: state.modules.edit_modal_module,
        keep_edit_modal_module: state.modules.keep_edit_modal_module
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setModulesIsLoad,
    setModuleStatesIsLoad,
    setFitnessCentersIsLoad,

    setModules,
    setInitialModules,
    addModule,
    updateModule,

    setModuleStates,
    setModulesFilterUuid,
    setModulesFilterSelectFitnessCenter,
    modulesResetFilters,

    displayEditModuleModal,
    displayCreateModuleModal,
    dismissEditModuleModal,

    setCurrentModuleAutoGenerateUuid,
    setCurrentModuleUuid,
    setCurrentModuleFitnessCenterId,
    setCurrentModuleMachineType,
    setCurrentModuleModuleStateId,

    setFitnessCenters
})(Modules);