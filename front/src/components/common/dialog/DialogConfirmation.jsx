// lib modules
import React from 'react'
import { Modal, Button } from 'react-bootstrap';

class DialogConfirmation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: this.props.show
		}
	}

	componentWillReceiveProps(props) {
		this.state.show = props.show;
		this.setState(this.state);
	}

	render() { 
		return (
			<Modal show={this.state.show}>
				<Modal.Header>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button bsStyle={this.props.confirmStyle || 'success'} onClick={this.props.onConfirm}>{this.props.confirmText}</Button>
					<Button className={this.props.cancelStyle || 'primary'} onClick={this.props.onCancel}>{this.props.cancelText}</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default DialogConfirmation;