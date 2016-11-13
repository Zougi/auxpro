import React from 'react'
import { Panel, ListGroup } from 'react-bootstrap'
// Custom components
import InformationIndisponibility from 'components/auxiliary/planing/InformationIndisponibility'
import InformationOffer from 'components/auxiliary/planing/InformationOffer'

class AuxiliaryPlanningInformation extends React.Component {
	
	constructor(props) {
		super(props);
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildOffers() {
		let result = [];
		let y = this.props.date[0];
		let m = this.props.date[1];
		let d = this.props.date[2];
		for (let i = 0; i < this.props.offers.length; i++) {
			let offer = this.props.offers[i];
			let date = offer.startDate;
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
			let date = indispo.startDate;
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
