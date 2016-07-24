import React from 'react'
import { Panel, ListGroup } from 'react-bootstrap';

import InformationIndisponibility from './InformationIndisponibility.jsx'

class AuxiliaryPlanningInformation extends React.Component {
	
	constructor(props) {
		super(props);
	}

	_buildOffers() {

	}
	_buildInterventions() {
		
	}
	_buildIndisponibilities() {
		console.log(this.props)
		let result = [];
		console.log(this.props.date)
		let y = this.props.date[0];
		console.log(y)
		let m = this.props.date[1];
		console.log(m)
		let d = this.props.date[2];
		console.log(d)
		for (let i = 0; i < this.props.indisponibilities.length; i++) {
			
			let indispo = this.props.indisponibilities[i];
			let date = indispo.date;
			if (date[0] === y && date[1] === m && date[2] === d) {
				console.log(i)
				console.log(indispo)
				result.push(
					<InformationIndisponibility 
						date={date}
						startTime={indispo.startTime}
						endTime={indispo.endTime} />
				);
			}
		}
		console.log(result)
		return result;
	}

	render() { 
		console.log('render info')
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
