import React from 'react';
import OfferDetailsRenderer from './OfferDetailsRenderer.jsx'

class OfferDetails extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onClose() {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	render() {
		return (
			<OfferDetailsRenderer 
				offer={this.props.offer || {}}
				service={this.props.service || {}}
				customer={this.props.customer || {}}
				intervention={this.props.intervention || {}}
				onClose={this.onClose.bind(this)}/>
		);
	}
}

export default OfferDetails;