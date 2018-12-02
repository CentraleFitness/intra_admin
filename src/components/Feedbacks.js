import React from 'react';

import {connect} from 'react-redux';

import {
    Glyphicon,
    Modal,
    FormControl,
    Button,
    Tabs,
    Tab
} from 'react-bootstrap';

import {
    displayAlert,
    dismissAlert,
    setManagersFeedbacksIsLoad
} from "../actions/globalActions";

import {
    setManagersFeedbacks
} from "../actions/feedbacksActions";

import Texts from "../utils/Texts";
import ManagersFeedbacks from "./ManagersFeedbacks";
import UsersFeedbacks from "./UsersFeedbacks";

class Feedbacks extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: "Managers"
        };
    }

    handleSelect(key) {
        this.setState({
            key: key
        });
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }


    render() {
        return (
            <div>

                <Tabs id={"feedbackTabs"} activeKey={this.state.key} onSelect={this.handleSelect}>
                    <Tab.Pane eventKey={"Managers"} title={Texts.GERANT.text_fr}>
                        <ManagersFeedbacks/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={"Users"} title={Texts.UTILISATEURS.text_fr}>
                        <UsersFeedbacks/>
                    </Tab.Pane>
                </Tabs>


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
                        <Button onClick={this.handleAlertDismiss.bind(this)}><Glyphicon
                            glyph="remove"/> {Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setManagersFeedbacksIsLoad,
    setManagersFeedbacks
})(Feedbacks);