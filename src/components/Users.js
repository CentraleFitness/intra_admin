import React from 'react';

import { connect } from 'react-redux';

import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button, Form, Col, FormGroup, ControlLabel, Table, OverlayTrigger, Tooltip, Image
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
    setUsersFilterSelectFitnessCenter,
    displayUserDetailsModal,
    dismissUserDetailsModal,
    displayUserUpdateConfirm,
    dismissUserUpdateConfirm,
    setUserActivity
} from "../actions/usersActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";
import HttpMethods from "../utils/HttpMethods";

import 'react-select/dist/react-select.css';
import '../styles/Users.css';

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
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

        this.setState({
            loading: true
        });

        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.USER, params);
        communication.sendRequest(
            function (response) {

                me.setState({
                    loading: false
                });

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

                me.setState({
                    loading: false
                });

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
        params[Fields.USER_ID] = item._id;
        params[Fields.IS_ACTIVE] = !item.is_active;

        let me = this;

        let communication = new Communication(HttpMethods.PUT, Paths.HOST + Paths.USER_ACTIVITY, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setUserActivity({
                                _id: item._id,
                                is_active: !item.is_active,
                                time: new Date().getTime(),
                                last_update_admin_id: response.data.administrator_id,
                                last_update_admin_name: response.data.administrator_name
                            });
                            me.filterName(me.props.filter_name);
                            me.props.dismissUserUpdateConfirm();
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

    setActiveClick(item) {
        if (item.is_active === false) {
            this.props.displayUserUpdateConfirm({
                update_confirm_title: Texts.RENDRE_ACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_RENDRE_ACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_id: item._id,
                update_confirm_login: item.login,
                update_confirm_is_active: item.is_active
            });
        }
    }

    setInactiveClick(item) {
        if (item.is_active === true) {
            this.props.displayUserUpdateConfirm({
                update_confirm_title: Texts.RENDRE_INACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_RENDRE_INACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_id: item._id,
                update_confirm_login: item.login,
                update_confirm_is_active: item.is_active
            });
        }
    }

    displayPost(item) {

        return (
            <div key={item._id}>

                <div className={"showNewLine " + (item.is_comment === false ? "post" : "post-comment")}>

                    <h5>
                        <Image
                            className={"post-image"}
                            src={
                                (item.is_center === true ?
                                    (item.posterPicture === "" ? "/img/store.svg" : item.posterPicture)
                                    :
                                    (item.posterPicture === "" ? "/img/user.svg" : item.posterPicture))

                            }
                        />
                        &nbsp;{item.posterName} <em>{" ( " + Dates.format(item.date) + " ) "}</em>
                    </h5>

                    {
                        item.type === "EVENT" &&

                        <div>
                            <h4>{Texts.EVENEMENT.text_fr + " : " + item.title}</h4>
                            <h5>{Dates.formatDateOnly(item.start_date) + " - " + Dates.formatDateOnly(item.end_date)}</h5>
                        </div>
                    }
                    {
                        item.type === "PHOTO" &&

                        <h4>{item.title}</h4>
                    }

                    <p>{item.content}</p>

                    {
                        (item.type === "PHOTO" ||
                            item.type === "EVENT") &&

                        <div>
                            <Image
                                alt={item.title}
                                src={item.picture}
                                className={"profileImage"}
                            />
                        </div>
                    }

                    <div>

                        <div style={{textAlign: "center", fontSize: "16px", verticalAlign: "text-top"}}>

                            <div>
                                {
                                    item.is_comment === false &&

                                    <span>
                                        <Glyphicon glyph="heart"/>
                                        &nbsp;
                                        {item.nb_likes}
                                        &nbsp;
                                        &nbsp;
                                    </span>
                                }
                                {
                                    item.is_comment === false &&

                                    <span>
                                        <Glyphicon glyph="comment"/>
                                        &nbsp;
                                        {item.nb_comments}
                                        &nbsp;
                                        &nbsp;
                                    </span>
                                }
                                <span>
                                    <Glyphicon glyph="bullhorn"/>
                                    &nbsp;
                                    {item.nb_report}
                                    &nbsp;
                                    &nbsp;
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
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
        return (
            (item.first_name !== undefined && item.first_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.last_name !== undefined && item.last_name.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.login !== undefined && item.login.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.email_address !== undefined && item.email_address.toLowerCase().search(value.toLowerCase()) !== -1));
    }

    getFitnessCenterBool(value_select, item) {
        return (
            value_select === undefined ||
            value_select === "" ||
                (item.fitness_center !== undefined &&
                    value_select === item.fitness_center._id)
        );
    }

    getDetailsOverlay(item) {
        return (
            <Tooltip id={"tooltip_details"}>
                {Texts.AFFICHER_LA_FICHE_COMPLETE.text_fr}
            </Tooltip>
        );
    }

    getSetActiveOverlay(item) {
        return (
            <Tooltip id={"tooltip_set_active"}>
                {
                    item.last_update_admin_name !== undefined &&

                    Texts.RENDU_INACTIF_PAR.text_fr + " " +
                    item.last_update_admin_name +
                    " (" + Texts.ADMIN.text_fr + ") " +
                    Texts.LE.text_fr + " " +
                    Dates.format(item.last_update_activity)
                }
                {
                    item.last_update_admin_name === undefined &&

                    Texts.RENDU_INACTIF_PAR.text_fr + " " +
                    Texts.INSCRIPTION.text_fr + " " +
                    Texts.LE.text_fr + " " +
                    Dates.format(item.creation_date)
                }
            </Tooltip>
        );
    }

    getSetInactiveOverlay(item) {
        return (
            <Tooltip id={"tooltip_set_inactive"}>
                {
                    item.last_update_admin_name !== undefined &&

                    Texts.RENDU_ACTIF_PAR.text_fr + " " +
                    item.last_update_admin_name +
                    " (" + Texts.ADMIN.text_fr + ") " +
                    Texts.LE.text_fr + " " +
                    Dates.format(item.last_update_activity)
                }
                {
                    item.last_update_admin_name === undefined &&

                    Texts.RENDU_ACTIF_PAR.text_fr + " " +
                    Texts.INSCRIPTION.text_fr + " " +
                    Texts.LE.text_fr + " " +
                    Dates.format(item.creation_date)
                }
            </Tooltip>
        );
    }

    detailsClick(item) {
        this.props.displayUserDetailsModal(item);
    }

    handleDetailsDismiss() {
        this.props.dismissUserDetailsModal();
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    handleUpdateConfirmDismiss() {
        this.props.dismissUserUpdateConfirm();
    }

    confirmUpdateModal() {
        this.setActivity({
            _id: this.props.update_confirm_id,
            is_active: this.props.update_confirm_is_active
        });
    }

    getReportStyle(nb) {

        let color = "green";
        let weight = "normal";
        if (nb > 0) {
            color = "black";
        } else if (nb >= 5) {
            weight = "bold";
            if (nb >= 15) {
                color = "red";
            } else {
                color = "orange";
            }
        }

        return (
            <span style={{color: color, fontWeight: weight}}>
                {
                    color !== "green" &&

                    <Glyphicon glyph="exclamation-sign" />
                }
                {" " + nb}
            </span>
        );
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

                {
                    this.state.loading === true &&

                        <div>
                            <Image
                                src={"/img/loading.svg"}
                                className={"center-block"}
                                style={{height: 50, width: 50}}
                            />
                            <h4 style={{textAlign: "center"}}>{Texts.CHARGEMENT.text_fr}</h4>
                        </div>
                }

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
                        {/*
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
                                <td style={{verticalAlign: "middle"}}>
                                    {
                                        this.getReportStyle(item.nb_report)
                                    }
                                </td>

                                {
                                    <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                        {
                                            item.is_active === false &&

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
                                            item.is_active === true &&

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
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

                <Modal show={this.props.show_details_modal} bsSize={"large"} onHide={this.handleDetailsDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                this.props.details_modal_user.login + " - " +
                                (this.props.details_modal_user.fitness_center !== undefined ? this.props.details_modal_user.fitness_center.name : "")
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Panel header={Texts.UTILISATEUR.text_fr}>
                            <Form horizontal>

                                <Image
                                    src={
                                        this.props.details_modal_user.picture === "" ?
                                        "/img/user.svg" : this.props.details_modal_user.picture
                                    }
                                    rounded
                                    responsive={true}

                                    className={"center-block logo"}
                                />

                                <br />

                                <FormGroup>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.DATE_DE_CREATION.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        {
                                            this.props.details_modal_user.creation_date !== undefined &&

                                            Dates.format(this.props.details_modal_user.creation_date)
                                        }
                                    </Col>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.LOGIN.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        {this.props.details_modal_user.login}
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.PRENOM.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        {this.props.details_modal_user.first_name}
                                    </Col>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.NOM.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        {this.props.details_modal_user.last_name}
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.EMAIL.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        {this.props.details_modal_user.email_address}
                                    </Col>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.NOMBRE_DE_SIGNALEMENTS.text_fr + " : "}
                                        </span>
                                    </Col>
                                    <Col xs={12} sm={12} md={3} lg={3}>
                                        {
                                            this.getReportStyle(this.props.details_modal_user.nb_report)
                                        }
                                    </Col>
                                </FormGroup>

                                {
                                    <FormGroup>
                                        <Col xs={12} sm={12} md={2} lg={2}>
                                            {
                                                this.props.details_modal_user.is_active === true &&
                                                (
                                                    <span style={{fontWeight: "bold", color: "green"}}>
                                                        {Texts.ACTIF.text_fr}
                                                    </span>
                                                )
                                            }
                                            {
                                                this.props.details_modal_user.is_active === false &&
                                                (
                                                    <span style={{fontWeight: "bold", color: "red"}}>
                                                        {Texts.INACTIF.text_fr}
                                                    </span>
                                                )
                                            }
                                        </Col>
                                        <Col xs={12} sm={12} md={1} lg={1}>
                                            {Texts.DEPUIS.text_fr}
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                            {Dates.format(this.props.details_modal_user.last_update_activity)}
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                            <span style={{fontWeight: "bold"}}>
                                                {Texts.ACTION_EFFECTUEE_PAR.text_fr + " :"}
                                            </span>
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                            {
                                                this.props.details_modal_user.last_update_admin_name +
                                                " (" + Texts.ADMIN.text_fr + ") "
                                            }
                                        </Col>
                                    </FormGroup>
                                }
                                {
                                    <Panel>
                                        <h3 style={{textAlign: "center"}}>
                                            {Texts.ACTIVITE.text_fr}
                                        </h3>
                                        <Col xs={0} sm={0} md={5} lg={5}>
                                        </Col>

                                        <Col xs={12} sm={12} md={1} lg={1}>
                                            {
                                                this.props.details_modal_user.is_active === false &&

                                                <Button onClick={this.setActiveClick.bind(this, this.props.details_modal_user)}>
                                            <span style={{color: "blue"}}>
                                                <Glyphicon glyph="off" />
                                            </span>&nbsp;
                                                    {Texts.RENDRE_ACTIF.text_fr}
                                                </Button>
                                            }
                                            {
                                                this.props.details_modal_user.is_active === true &&

                                                <Button onClick={this.setInactiveClick.bind(this, this.props.details_modal_user)}>
                                            <span style={{color: "red"}}>
                                                <Glyphicon glyph="off" />
                                            </span>&nbsp;
                                                    {Texts.RENDRE_INACTIF.text_fr}
                                                </Button>
                                            }
                                        </Col>

                                        <Col xs={0} sm={0} md={5} lg={5}>
                                        </Col>
                                    </Panel>
                                }

                            </Form>
                        </Panel>
                        {
                            this.props.details_modal_user.fitness_center !== undefined &&

                            <Panel header={Texts.SALLE_SPORT.text_fr}>
                                <Form horizontal>

                                    <FormGroup>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.DATE_DE_CREATION.text_fr + " : "}
                                        </span>
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                            {Dates.format(this.props.details_modal_user.fitness_center.creation_date)}
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.NOM.text_fr + " : "}
                                        </span>
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                            {this.props.details_modal_user.fitness_center.name}
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.ADRESSE.text_fr + " : "}
                                        </span>
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                            {this.props.details_modal_user.fitness_center.address}
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.VILLE.text_fr + " : "}
                                        </span>
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                            {this.props.details_modal_user.fitness_center.city}
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.ADRESSE_COMPLEMENT.text_fr + " : "}
                                        </span>
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                            {
                                                (
                                                    (this.props.details_modal_user.fitness_center.address_second === "" ||
                                                        this.props.details_modal_user.fitness_center.address_second === null ||
                                                        this.props.details_modal_user.fitness_center.address_second === undefined) ?
                                                        "/" : this.props.details_modal_user.fitness_center.address_second
                                                )

                                            }
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                        <span style={{fontWeight: "bold"}}>
                                            {Texts.CODE_POSTAL.text_fr + " : "}
                                        </span>
                                        </Col>
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                            {this.props.details_modal_user.fitness_center.zip_code}
                                        </Col>
                                    </FormGroup>

                                </Form>
                            </Panel>
                        }
                        <Panel header={Texts.PUBLICATIONS_SIGNALEES.text_fr}>
                            {
                                this.props.details_modal_user.reported_posts.map((item) => (
                                    this.displayPost(item)
                                ))
                            }
                        </Panel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDetailsDismiss.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.show_update_confirm} onHide={this.handleUpdateConfirmDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.update_confirm_title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static style={{textAlign: "center"}}>
                            {this.props.update_confirm_text}<br/><br/>
                            {this.props.update_confirm_login}
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
        filter_name: state.users.filter_name,

        show_details_modal: state.users.show_details_modal,
        details_modal_user: state.users.details_modal_user,

        show_update_confirm: state.users.show_update_confirm,
        update_confirm_title: state.users.update_confirm_title,
        update_confirm_text: state.users.update_confirm_text,
        update_confirm_id: state.users.update_confirm_id,
        update_confirm_login: state.users.update_confirm_login,
        update_confirm_is_active: state.users.update_confirm_is_active

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
    setUsersFilterSelectFitnessCenter,
    displayUserDetailsModal,
    dismissUserDetailsModal,
    displayUserUpdateConfirm,
    dismissUserUpdateConfirm,
    setUserActivity
})(Users);