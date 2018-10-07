import React from 'react';

import { connect } from 'react-redux';

import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button
} from 'react-bootstrap';

import {
    displayAlert,
    dismissAlert
} from "../actions/globalActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";

class ManagerFeedbacks extends React.Component {

    componentWillMount() {

    }

    handleAlertDismiss() {

    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="envelope" /> {Texts.FEEDBACK.text_fr}</div>} bsStyle="primary">

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
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert
})(ManagerFeedbacks);