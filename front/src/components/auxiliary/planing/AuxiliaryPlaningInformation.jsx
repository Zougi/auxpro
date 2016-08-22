import React from 'react'
import { Panel, ListGroup } from 'react-bootstrap';

import InformationIndisponibility from './InformationIndisponibility.jsx'
import InformationOffer from './InformationOffer.jsx'

class AuxiliaryPlanningInformation extends React.Component {
	
	constructor(props) {
		super(props);
	}

	_buildOffers() {
		let result = [];
		let y = this.props.date[0];
		let m = this.props.date[1];
		let d = this.props.date[2];
		for (let i = 0; i < this.props.offers.length; i++) {
			let offer = this.props.offers[i];
			let date = offer.date;
			if (date[0] === y && date[1] === m && date[2] === d) {
				result.push(
					<InformationOffer
						key={i}
						date={date}
						startTime={offer.startTime}
						endTime={offer.endTime} />
				);
			}
		}
		return result;
	}
	_buildInterventions() {
	}
	_buildIndisponibilities() {
		let result = [];
		let y = this.props.date[0];
		let m = this.props.date[1];
		let d = this.props.date[2];
		for (let i = 0; i < this.props.indisponibilities.length; i++) {
			let indispo = this.props.indisponibilities[i];
			let date = indispo.date;
			if (date[0] === y && date[1] === m && date[2] === d) {
				result.push(
					<InformationIndisponibility 
						key={i}
						date={date}
						startTime={indispo.startTime}
						endTime={indispo.endTime} />
				);
			}
		}
		return result;
	}

	render() { 
		return (
			<Panel header="Informations">
	    		<ListGroup>
	    			{this._buildInterventions()}
	    			{this._buildOffers()}
	    			{this._buildIndisponibilities()}
	    		</ListGroup>
	    	</Panel>
		);
	}
}

export default AuxiliaryPlanningInformation;
