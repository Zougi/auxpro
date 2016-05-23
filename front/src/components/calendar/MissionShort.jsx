// react modules
import React from 'react'
// react-bootstrap modules
import { ListGroupItem } from 'react-bootstrap';

class MissionShort extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onInfo() {
		alert('info clicked');
	}

	render() { 
		return (
			<ListGroupItem header='Mission' bsStyle='success'>
	            Le {this.props.date} de {this.props.startHour}h à {this.props.endHour}h<br/>
	            Nombre d'heures : {this.props.endHour - this.props.startHour}h
	            <span className='info-span' onclick={this.onInfo.bind(this)}>info</span>
	        </ListGroupItem>
		);
	}
}

export default MissionShort;