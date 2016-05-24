// react modules
import React from 'react'
// react-bootstrap modules
import { Modal, Button } from 'react-bootstrap';

class ModalPrompt extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		return (
			<div className='static-modal'>
				<Modal.Dialog>
					<Modal.Header>
						<Modal.Title>{this.props.title}</Modal.Title>
					</Modal.Header>
					<Modal.Footer>
						<Button className='btn btn-success' onClick={this.props.onConfirm}>{this.props.confirm}</Button>
						<Button className='btn btn-primary' onClick={this.props.onCancel}>{this.props.cancel}</Button>
					</Modal.Footer>
				</Modal.Dialog>
		  </div>
		);
	}
}

export default ModalPrompt;