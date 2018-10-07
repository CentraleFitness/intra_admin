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
    ControlLabel, OverlayTrigger, Table, Tooltip
} from 'react-bootstrap';

import {
    displayAlert,
    dismissAlert,

    setAdministratorsIsLoad
} from "../actions/globalActions";

import {
    setAdministrators,
    setInitialAdministrators,
    setAdministratorsFilterName,
    displayDeleteUserModal,
    dismissDeleteUserModal
} from "../actions/administratorsActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";
import HttpMethods from "../utils/HttpMethods";

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

    deleteAdministrator() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

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
        let updatedAdmins = this.props.initial_administrators;
        if (value !== "" && value !== null) {
            updatedAdmins = updatedAdmins.filter(function (item) {
                return ((item.first_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
                    (item.last_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
                    (item.email_address.toLowerCase().search(value.toLowerCase()) !== -1));
            });
        }
        this.props.setAdministrators(updatedAdmins);
    }

    createUserClick() {

    }

    handleDeleteUserDisplay(item) {
        this.props.displayDeleteUserModal({
            first_name: item.first_name,
            last_name: item.last_name
        });
    }

    handleDeleteConfirmDismiss() {
        this.props.dismissDeleteUserModal();
    }

    confirmUserDelete() {
        this.deleteAdministrator();
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
                        <Glyphicon glyph="plus" /> {Texts.CREER_UN_UTILISATEUR.text_fr}
                    </Button>
                </Panel>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>{Texts.PRENOM.text_fr}</th>
                            <th>{Texts.NOM.text_fr}</th>
                            <th>{Texts.EMAIL.text_fr}</th>
                            <th>{Texts.DATE_DE_CREATION.text_fr}</th>
                            <th>{Texts.DERNIERE_MODIFICATION.text_fr}</th>
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
                                <td style={{verticalAlign: "middle"}}>{Dates.formatDateOnly(item.creation_date)}</td>
                                <td style={{verticalAlign: "middle"}}>{Dates.format(item.update_date)}</td>
                                <td style={{verticalAlign: "middle"}}>
                                    <OverlayTrigger placement="bottom" overlay={tooltip_edit}>
                                        <Button>
                                            <span style={{color: "blue"}}>
                                                <Glyphicon glyph="pencil" />
                                            </span>
                                        </Button>
                                    </OverlayTrigger>
                                    &nbsp;
                                    <OverlayTrigger placement="bottom" overlay={tooltip_delete}>
                                        <Button onClick={this.handleDeleteUserDisplay.bind(this, item)}>
                                            <span style={{color: "red"}}>
                                                <Glyphicon glyph="remove" />
                                            </span>
                                        </Button>
                                    </OverlayTrigger>
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
        delete_last_name: state.administrators.delete_last_name
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,

    setAdministratorsIsLoad,

    setAdministrators,
    setInitialAdministrators,
    setAdministratorsFilterName,
    displayDeleteUserModal,
    dismissDeleteUserModal
})(Administrators);