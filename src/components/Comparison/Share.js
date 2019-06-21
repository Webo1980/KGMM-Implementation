import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import Tooltip from '../Utils/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Share extends Component {
    render() {
        return (
            <Modal isOpen={this.props.showDialog} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Share link</ModalHeader>
                <ModalBody>
                    <p>The created comparison can be shared using the following link: </p>

                    <InputGroup>
                        <Input
                            value={this.props.url}
                            disabled
                        />
                        <InputGroupAddon addonType="append">
                            <Tooltip message="Copy to clipboard" hideDefaultIcon>
                                <CopyToClipboard text={this.props.url}>
                                    <Button
                                        color="primary"
                                        className="pl-3 pr-3"
                                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                    >
                                        <Icon icon={faClipboard} />
                                    </Button>
                                </CopyToClipboard>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>

                </ModalBody>
            </Modal >
        );
    }
}

Share.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    //viewPaper: state.viewPaper,
});

export default connect(
    mapStateToProps
)(Share);