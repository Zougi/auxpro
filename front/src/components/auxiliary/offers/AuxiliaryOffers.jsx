import React from 'react';
import { Panel } from 'react-bootstrap';
import OfferSummary from './OfferSummary.jsx'

class AuxiliaryOffers extends React.Component {
	
	constructor(props) {
		super(props);
		console.log('====================')
		console.log(props);
	}

	render() { 
		console.log('**************RERENDER')
		console.log(this.props);
		let offers = (this.props.offers || []).map((offer) => {
			return (
				<OfferSummary 
					key={offer.id} 
					offer={offer} />
			);
		});
		return (
			<Panel title='Offres en cours'>
	            {offers}
	        </Panel>
		);
	}
}

export default AuxiliaryOffers;