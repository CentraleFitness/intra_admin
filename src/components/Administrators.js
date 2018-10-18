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
    OverlayTrigger,
    Table,
    Tooltip
} from 'react-bootstrap';

import {
    displayAlert,
    dismissAlert,

    setAdministratorsIsLoad
} from "../actions/globalActions";

import {
    setAdministrators,
    setInitialAdministrators,
    setAdministrator,
    addAdministrator,

    setAdministratorsFilterName,

    displayDeleteUserModal,
    dismissDeleteUserModal,
    displayEditAdministratorModal,
    displayCreateAdministratorModal,
    dismissEditAdministratorModal,

    resetCurrentAdministrator,
    setCurrentAdministratorFirstName,
    setCurrentAdministratorLastName,
    setCurrentAdministratorEmail,
    setCurrentAdministratorPhone,
    setCurrentAdministratorPassword,
    setCurrentAdministratorPasswordConfirm
} from "../actions/administratorsActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";
import HttpMethods from "../utils/HttpMethods";
import Validator from "../utils/Validator";

import "../styles/Administrator.css"

class Administrators extends React.Component {

    componentWillMount() {
        if (this.props.administrators_is_load === false) {
            this.getAdministrators();
        }
    }

    getAdministrators() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.ACCOUNT, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setAdministrators(response.data.accounts);
                            me.props.setInitialAdministrators(response.data.accounts);
                            me.filterName(me.props.filter_name);
                            me.props.setAdministratorsIsLoad();
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

    createUpdateAdministrator(is_creation) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.FIRSTNAME] = this.props.edit_modal_admininistrator.first_name;
        params[Fields.LASTNAME] = this.props.edit_modal_admininistrator.last_name;
        params[Fields.EMAIL] = this.props.edit_modal_admininistrator.email_address;
        params[Fields.PHONE] = this.props.edit_modal_admininistrator.phone_number;
        if (is_creation) {
            params[Fields.PASSWORD] = this.props.edit_modal_admininistrator.password;
        } else {
            params[Fields.ADMINISTRATOR_ID] = this.props.edit_modal_admininistrator._id;
        }

        let me = this;

        let communication = new Communication(
            (is_creation ? HttpMethods.POST : HttpMethods.PUT), Paths.HOST + Paths.ACCOUNT, params
        );
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {

                            if (is_creation) {
                                me.props.addAdministrator({
                                    _id: response.data.administrator_id,
                                    first_name: params[Fields.FIRSTNAME],
                                    last_name: params[Fields.LASTNAME],
                                    email_address: params[Fields.EMAIL],
                                    phone_number: params[Fields.PHONE],
                                    creation_date: new Date().getTime(),
                                    update_date: new Date().getTime()
                                });
                            } else {
                                me.props.setAdministrator({
                                    _id: params[Fields.ADMINISTRATOR_ID],
                                    first_name: params[Fields.FIRSTNAME],
                                    last_name: params[Fields.LASTNAME],
                                    email_address: params[Fields.EMAIL],
                                    phone_number: params[Fields.PHONE],
                                    time: new Date().getTime()
                                });
                            }

                            me.filterName(me.props.filter_name);
                            me.props.dismissEditAdministratorModal();
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

    deleteAdministrator() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.ADMINISTRATOR_ID] = this.props.delete_id;

        let me = this;

        let communication = new Communication(HttpMethods.DELETE, Paths.HOST + Paths.ACCOUNT, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {

                            me.filterName(me.props.filter_name);
                            this.props.dismissDeleteUserModal();
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

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    nameFilterChange(event) {
        this.props.setAdministratorsFilterName(event.target.value);
        this.filterName(event.target.value);
    }

    filterName(value) {

        let me = this;
        let updatedAdmins = this.props.initial_administrators;
        if (value !== "" && value !== null) {
            updatedAdmins = updatedAdmins.filter(function (item) {
                return me.getNameBool(value, item) &&
                    me.getFitnessCenterBool(me.props.filter_select_fitness_center, item);
            });
        }
        this.props.setAdministrators(updatedAdmins);
    }

    getNameBool(value, item) {
        return ((item.first_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.last_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.email_address.toLowerCase().search(value.toLowerCase()) !== -1));
    }

    createUserClick() {
        this.props.displayCreateAdministratorModal();
    }

    handleDeleteUserDisplay(item) {
        this.props.displayDeleteUserModal({
            _id: item._id,
            first_name: item.first_name,
            last_name: item.last_name
        });
    }

    handleDeleteConfirmDismiss() {
        this.props.dismissDeleteUserModal();
    }

    handleEditUserDisplay(item) {
        this.props.displayEditAdministratorModal({
            _id: item._id,
            first_name: item.first_name,
            last_name: item.last_name,
            email_address: item.email_address,
            phone_number: item.phone_number,
            creation_date: item.creation_date,
            update_date: item.update_date
        });
    }

    handleEditUserDismiss() {
        this.props.dismissEditAdministratorModal();
    }

    confirmUserDelete() {
        this.deleteAdministrator();
    }

    getValidationState(field) {

        let value;
        switch (field) {
            case "first_name":
                value = this.props.edit_modal_admininistrator.first_name;
                break;
            case "last_name":
                value = this.props.edit_modal_admininistrator.last_name;
                break;
            case "email_address":
                value = this.props.edit_modal_admininistrator.email_address;
                break;
            case "phone_number":
                value = this.props.edit_modal_admininistrator.phone_number;
                break;
            case "password":
                value = this.props.edit_modal_admininistrator.password;
                break;
            case "confirm_password":
                value = this.props.edit_modal_admininistrator.confirm_password;
                break;
            default:
                return "warning";
        }

        if (field === "first_name" || field === "last_name") {

            if (Validator.name(value))
                return "success";

        } else if (field === "password" || field === "confirm_password") {

            if (Validator.password(value))
                return "success";

        } else if (field === "phone_number") {

            if (Validator.phoneNumber(value))
                return "success";

        } else if (field === "email_address") {

            if (Validator.email(value))
                return "success";
        }
        return "warning";
    }

    handleFirstNameChange(event) {
        this.props.setCurrentAdministratorFirstName(event.target.value);
    }

    handleLastNameChange(event) {
        this.props.setCurrentAdministratorLastName(event.target.value);
    }

    handleEmailChange(event) {
        this.props.setCurrentAdministratorEmail(event.target.value);
    }

    handlePhoneChange(event) {
        this.props.setCurrentAdministratorPhone(event.target.value);
    }

    handlePasswordChange(event) {
        this.props.setCurrentAdministratorPassword(event.target.value);
    }

    handlePasswordConfirmChange(event) {
        this.props.setCurrentAdministratorPasswordConfirm(event.target.value);
    }

    handleEditUserSave() {

        if (this.props.edit_modal_admininistrator.first_name === this.props.keep_edit_modal_admininistrator.first_name &&
            this.props.edit_modal_admininistrator.last_name === this.props.keep_edit_modal_admininistrator.last_name &&
            this.props.edit_modal_admininistrator.phone_number === this.props.keep_edit_modal_admininistrator.phone_number &&
            this.props.edit_modal_admininistrator.email_address === this.props.keep_edit_modal_admininistrator.email_address &&
            this.props.edit_modal_admininistrator.password === this.props.keep_edit_modal_admininistrator.password &&
            this.props.edit_modal_admininistrator.confirm_password === this.props.keep_edit_modal_admininistrator.confirm_password) {

            this.props.dismissEditAdministratorModal();
            return;
        }

        let is_creation = false;
        if (this.props.edit_modal_admininistrator._id === "") {
            is_creation = true;
        }

        if (!Validator.name(this.props.edit_modal_admininistrator.first_name) ||
            !Validator.name(this.props.edit_modal_admininistrator.last_name) ||
            !Validator.phoneNumber(this.props.edit_modal_admininistrator.phone_number) ||
            !Validator.email(this.props.edit_modal_admininistrator.email_address) || (
                is_creation &&
                (!Validator.password(this.props.edit_modal_admininistrator.password) ||
                !Validator.password(this.props.edit_modal_admininistrator.confirm_password)))) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        if (this.props.edit_modal_admininistrator.password !== this.props.edit_modal_admininistrator.confirm_password) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_CONFIRM_MDP.text_fr
            });

            return;
        }

        this.createUpdateAdministrator(is_creation);
    }

    handleEditUserReset() {
        this.props.resetCurrentAdministrator();
    }

    render() {

        const tooltip_edit = (
            <Tooltip id={"tooltip"}>
                Edit
            </Tooltip>
        );

        const tooltip_delete = (
            <Tooltip id={"tooltip"}>
                Delete
            </Tooltip>
        );

        return (
            <Panel header={<div><Glyphicon glyph="lock" /> {Texts.ADMINISTRATEURS.text_fr}</div>} bsStyle="primary">

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
                        </Form>
                    </Panel>

                    <Button
                        className={"pull-right"}
                        onClick={this.createUserClick.bind(this)}
                    >
                        <Glyphicon glyph="plus" /> {Texts.CREER_UN_COMPTE_ADMINISTRATEUR.text_fr}
                    </Button>
                </Panel>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>{Texts.PRENOM.text_fr}</th>
                            <th>{Texts.NOM.text_fr}</th>
                            <th>{Texts.EMAIL.text_fr}</th>
                            <th>{Texts.DERNIERE_MODIFICATION.text_fr}</th>
                            <th>{Texts.TELEPHONE.text_fr}</th>
                            <th>{Texts.ACTION.text_fr + "s"}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.administrators !== undefined && this.props.administrators.map((item) => (
                            <tr key={item._id}>
                                <td style={{verticalAlign: "middle"}}>{item.first_name}</td>
                                <td style={{verticalAlign: "middle"}}>{item.last_name}</td>
                                <td style={{verticalAlign: "middle"}}>{item.email_address}</td>
                                <td style={{verticalAlign: "middle"}}>{Dates.format(item.update_date)}</td>
                                <td style={{verticalAlign: "middle"}}>{item.phone_number}</td>
                                <td style={{verticalAlign: "middle"}}>
                                    {
                                        item.is_me &&

                                        <OverlayTrigger placement="bottom" overlay={tooltip_edit}>
                                            <Button onClick={this.handleEditUserDisplay.bind(this, item)}>
                                            <span style={{color: "blue"}}>
                                                <Glyphicon glyph="pencil" />
                                            </span>
                                            </Button>
                                        </OverlayTrigger>
                                    }
                                    {
                                        !item.is_me &&

                                        <OverlayTrigger placement="bottom" overlay={tooltip_delete}>
                                            <Button onClick={this.handleDeleteUserDisplay.bind(this, item)}>
                                            <span style={{color: "red"}}>
                                                <Glyphicon glyph="remove" />
                                            </span>
                                            </Button>
                                        </OverlayTrigger>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

                <Modal show={this.props.show_edit_modal} onHide={this.handleEditUserDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                this.props.edit_modal_admininistrator._id !== "" &&

                                (
                                    this.props.edit_modal_admininistrator.first_name + " " +
                                    this.props.edit_modal_admininistrator.last_name
                                )
                            }
                            {
                                this.props.edit_modal_admininistrator._id === "" &&

                                (
                                    Texts.CREER_UN_COMPTE_ADMINISTRATEUR.text_fr
                                )
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>

                            {
                                this.props.edit_modal_admininistrator._id !== "" &&

                                <FormGroup>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                    <span style={{fontWeight: "bold"}}>
                                        {Texts.DATE_DE_CREATION.text_fr + " : "}
                                    </span>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        {Dates.format(this.props.edit_modal_admininistrator.creation_date)}
                                    </Col>

                                </FormGroup>
                            }

                            {
                                this.props.edit_modal_admininistrator._id !== "" &&

                                <FormGroup>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                    <span style={{fontWeight: "bold"}}>
                                        {Texts.DERNIERE_MODIFICATION.text_fr + " : "}
                                    </span>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        {Dates.format(this.props.edit_modal_admininistrator.update_date)}
                                    </Col>
                                </FormGroup>
                            }

                            <br/>

                            <FormGroup validationState={this.getValidationState('first_name')}>
                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <ControlLabel>
                                        {Texts.PRENOM.text_fr + " : "}
                                    </ControlLabel>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <FormControl
                                        type="text"
                                        placeholder={Texts.PRENOM.text_fr}
                                        value={this.props.edit_modal_admininistrator.first_name}
                                        onChange={this.handleFirstNameChange.bind(this)}
                                    />
                                </Col>

                            </FormGroup>

                            <FormGroup validationState={this.getValidationState('last_name')}>

                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <ControlLabel>
                                        {Texts.NOM.text_fr + " : "}
                                    </ControlLabel>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <FormControl
                                        type="text"
                                        placeholder={Texts.NOM.text_fr}
                                        value={this.props.edit_modal_admininistrator.last_name}
                                        onChange={this.handleLastNameChange.bind(this)}
                                    />
                                </Col>

                            </FormGroup>

                            <FormGroup validationState={this.getValidationState('email_address')}>

                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <ControlLabel>
                                        {Texts.EMAIL.text_fr + " : "}
                                    </ControlLabel>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <FormControl
                                        readOnly={this.props.edit_modal_admininistrator._id !== ""}
                                        type="text"
                                        placeholder={Texts.EMAIL.text_fr}
                                        value={this.props.edit_modal_admininistrator.email_address}
                                        onChange={this.handleEmailChange.bind(this)}
                                    />
                                </Col>

                            </FormGroup>

                            <FormGroup validationState={this.getValidationState('phone_number')}>

                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <ControlLabel>
                                        {Texts.TELEPHONE.text_fr + " : "}
                                    </ControlLabel>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <FormControl
                                        type="text"
                                        placeholder={Texts.TELEPHONE.text_fr}
                                        value={this.props.edit_modal_admininistrator.phone_number}
                                        onChange={this.handlePhoneChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>

                            {
                                this.props.edit_modal_admininistrator._id === "" &&

                                <FormGroup validationState={this.getValidationState('password')}>

                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <ControlLabel>
                                            {Texts.MDP.text_fr + " : "}
                                        </ControlLabel>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        <FormControl
                                            type="password"
                                            placeholder={Texts.MDP.text_fr}
                                            value={this.props.edit_modal_admininistrator.password}
                                            onChange={this.handlePasswordChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>
                            }

                            {
                                this.props.edit_modal_admininistrator._id === "" &&

                                <FormGroup validationState={this.getValidationState('confirm_password')}>

                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <ControlLabel>
                                            {Texts.CONFIRM_MDP.text_fr + " : "}
                                        </ControlLabel>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        <FormControl
                                            type="password"
                                            placeholder={Texts.CONFIRM_MDP.text_fr}
                                            value={this.props.edit_modal_admininistrator.confirm_password}
                                            onChange={this.handlePasswordConfirmChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>
                            }
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={"pull-left"} onClick={this.handleEditUserReset.bind(this)}>
                            <Glyphicon glyph="refresh" /> {Texts.REINITIALISER.text_fr}
                        </Button>
                        <Button onClick={this.handleEditUserDismiss.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
                        <Button onClick={this.handleEditUserSave.bind(this)} bsStyle={"primary"}><Glyphicon glyph="floppy-disk" /> {Texts.SAUVEGARDER.text_fr}</Button>
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

                <Modal show={this.props.showDeleteConfirm} onHide={this.handleDeleteConfirmDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{Texts.SUPPRIMER_UN_UTILISATEUR.text_fr}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static style={{textAlign: "center"}}>
                            {Texts.ETES_VOUS_SUR_DE_VOULOIR_SUPPRIMER_CET_UTILISATEUR.text_fr}<br/><br/>
                            {this.props.delete_first_name + " " + this.props.delete_last_name}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDeleteConfirmDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.ANNULER.text_fr}
                        </Button>
                        <Button bsStyle={"primary"} onClick={this.confirmUserDelete.bind(this)}>
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
        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,

        administrators_is_load: state.global.administrators_is_load,

        administrators: state.administrators.administrators,
        initial_administrators: state.administrators.initial_administrators,

        filter_name: state.administrators.filter_name,

        showDeleteConfirm: state.administrators.showDeleteConfirm,
        delete_first_name: state.administrators.delete_first_name,
        delete_last_name: state.administrators.delete_last_name,
        delete_id: state.administrators.delete_id,

        show_edit_modal: state.administrators.show_edit_modal,
        edit_modal_admininistrator: state.administrators.edit_modal_admininistrator,
        keep_edit_modal_admininistrator: state.administrators.keep_edit_modal_admininistrator
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,

    setAdministratorsIsLoad,

    setAdministrators,
    setAdministrator,
    addAdministrator,
    setInitialAdministrators,

    setAdministratorsFilterName,

    displayDeleteUserModal,
    dismissDeleteUserModal,
    displayEditAdministratorModal,
    displayCreateAdministratorModal,
    dismissEditAdministratorModal,

    resetCurrentAdministrator,
    setCurrentAdministratorFirstName,
    setCurrentAdministratorLastName,
    setCurrentAdministratorEmail,
    setCurrentAdministratorPhone,
    setCurrentAdministratorPassword,
    setCurrentAdministratorPasswordConfirm
})(Administrators);