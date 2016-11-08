import React from 'react';
import { Row, Clearfix } from 'react-bootstrap';
// custom components
import InterventionSummary from './InterventionSummary.jsx';

class InterventionSummaryList extends React.Component {
	
	constructor(props) {
		super(props);
	}


	// State management functions //
	// --------------------------------------------------------------------------------

	componentWillUpdate(nextProps, nextState) {
		this.offers = {};
		if (this.props.offers) {
			let l = this.props.offers.length;
			for (let i = 0; i < l; i++) {
				let offer = this.props.offers[i];
				this.offers[offer.interventionId] = this.offers[offer.interventionId] || [];
				this.offers[offer.interventionId].push(offer)
			}
		}
		this.interventionsPending = [];
		this.interventionsOffered = [];
		this.interventionsPlanned = [];

		let l = (this.props.interventions || []).length;
		for (let i = 0; i < l; i++) {
			let intervention = this.props.interventions[i];
			let array = this.interventionsPending;
			if (intervention.auxiliaryId) {
				array = this.interventionsPlanned;
			} else if (this.offers[intervention.id]) {
				array = this.interventionsOffered;
			}
			array.push(
				<InterventionSummary
					key={intervention.id}
					intervention={intervention}
					offers={this.offers[intervention.id]}
					onEdit={this.props.onEdit}
					onMatch={this.props.onMatch}
					onDelete={this.props.onDelete}
					onViewOffers={this.props.onViewOffers}/>
			);
			if (array.length%2 === 1) {
				array.push( <Clearfix key={'c2' + intervention.id} visibleSmBlock/>);
			}
			if (array.length%3 === 2) {
				array.push( <Clearfix key={'c3' + intervention.id} visibleMdBlock/>);
			}
		}
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() {
		return (
			<div>
				<Row>
					{this.interventionsPending}
				</Row>
				<Row>
					{this.interventionsOffered}
				</Row>
				<Row>
					{this.interventionsPlanned}
				</Row>
			</div>
		);
	}
}

export default InterventionSummaryList;