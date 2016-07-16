import React from 'react';
import OfferSummaryRenderer from './OfferSummaryRenderer.jsx'

class OfferSummary extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onAccept() {
		if (this.props.onAccept) {
			this.props.onEdit(this.props.offer);
		}
	}
	onReject() {
		if (this.props.onReject) {
			this.props.onMatch(this.props.offer);
		}
	}
	onView() {
		if (this.props.onView) {
			this.props.onView(this.props.offer);
		}
	}

	render() {
		return (
			<OfferSummaryRenderer 
				offer={this.props.offer}
				service={this.props.service}
				customer={this.props.customer}
				intervention={this.props.intervention}
				onAccept={this.onAccept.bind(this)}
				onReject={this.onReject.bind(this)}
				onView={this.onView.bind(this)}/>
		);
	}
}

export default OfferSummary;