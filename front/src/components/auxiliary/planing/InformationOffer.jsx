// react modules
import React from 'react'
// react-bootstrap modules
import { ListGroupItem } from 'react-bootstrap';

class InformationOffer extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() { 
		return (
			<ListGroupItem header='Absence' bsStyle='warning'>
	            Le {this.props.date} de {this.props.startHour}h à {this.props.endHour}h<br/>
	            Nombre d'heures : {this.props.endHour - this.props.startHour}h
	        </ListGroupItem>
		);
	}
}

export default InformationOffer;