import React from 'react';

import { Modal, Button } from 'react-bootstrap'

import './ModalDialog.css';

/**
 * A react component wrapping a bootstrap modal dialog
 *
 * @props.show    : <boolean>
 * @props.title   : <string>
 * @props.buttons : [ { bsStyle: <string>, onClick: <function>, text: <string> } ]
 *
 */
class ModalDialog extends React.Component {
	
	constructor(props) {
		super(props);
	}

	_buildButtons() {
		var i = 0;
		return (this.props.buttons || []).map(function (button) {
			return (
				<Button key={i++} bsStyle={button.bsStyle} onClick={button.onClick}>
					{button.text}
				</Button>
			);
		});
	}

	render() {
		return (
			<Modal show={this.props.show}>
				<Modal.Header>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					{this._buildButtons()}
				</Modal.Footer>
			</Modal>
		);
	}
}

export default ModalDialog;