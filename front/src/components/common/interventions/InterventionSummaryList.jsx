import React from 'react';
import { Row, Clearfix } from 'react-bootstrap';
// custom components
import InterventionSummary from './InterventionSummary.jsx';

class InterventionSummaryList extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let offers = {};
		if (this.props.offers) {
			for (let i = 0; i < this.props.offers.length; i++) {
				let offer = this.props.offers[i];
				offers[offer.interventionId] = offers[offer.interventionId] || [];
				offers[offer.interventionId].push(offer)
			}
		}
		let interventionPending = [];
		let interventionOffered = [];

		for (let i = 0; i < (this.props.interventions || []).length; i++) {
			let intervention = this.props.interventions[i];
			let array = interventionPending;
			if (offers[intervention.id]) {
				array = interventionOffered;
			}
			array.push(
				<InterventionSummary 
               		key={intervention.id} 
               		intervention={intervention}
               		offers={offers[intervention.id]}
               		onEdit={this.props.onEdit}
					onMatch={this.props.onMatch}
					onDelete={this.props.onDelete}
					onViewOffers={this.props.onViewOffers}/>
			);
			if (i%2 === 1) {
				array.push( <Clearfix key={'c2' + intervention.id} visibleSmBlock/>);
			}
			if (i%3 === 2) {
				array.push( <Clearfix key={'c3' + intervention.id} visibleMdBlock/>);
			}
		}

		return (
			<div>
				<Row>
	            	{interventionPending}
	            </Row>
	            <Row>
	            	{interventionOffered}
	            </Row>
			</div>
		);
	}
}

export default InterventionSummaryList;