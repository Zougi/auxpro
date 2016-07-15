import React from 'react';

import InterventionSummaryRenderer from './InterventionSummaryRenderer.jsx'
import InterventionSummaryOfferRenderer from './InterventionSummaryOfferRenderer.jsx'

class InterventionSummary extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onEdit() {
		if (this.props.onEdit) {
			this.props.onEdit(this.props.intervention);
		}
	}
	onMatch() {
		if (this.props.onMatch) {
			this.props.onMatch(this.props.intervention);
		}
	}
	onDelete() {
		if (this.props.onDelete) {
			this.props.onDelete(this.props.intervention);
		}
	}
	onViewOffers() {
		console.log(this.props.offers);
	}

	render() {
		if (this.props.offers) {
			return (
				<InterventionSummaryOfferRenderer 
					intervention={this.props.intervention}
					offers={this.props.offers}
					onEdit={this.onEdit.bind(this)}
					onMatch={this.onMatch.bind(this)}
					onViewOffers={this.onViewOffers.bind(this)}/>
			);
		} else {
			return (
				<InterventionSummaryRenderer 
					intervention={this.props.intervention}
					onEdit={this.onEdit.bind(this)}
					onMatch={this.onMatch.bind(this)}
					onDelete={this.onDelete.bind(this)}/>
			);
		}
	}
}

export default InterventionSummary;