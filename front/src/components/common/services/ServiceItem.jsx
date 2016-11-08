import React from 'react';
import { Panel, Col } from 'react-bootstrap'
// Custom components
import AsyncImage from 'lib/image/AsyncImage'

class ServiceItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return (
		<Panel>
			<Col xs={4}>
				<AsyncImage src={this.props.service.avatar}/>
			</Col>
			<Col xs={8}>
				{this.props.service.socialReason}
				<br/>
				{this.props.service.address}
				<br/>
				{this.props.service.postalCode} {this.props.service.city}
				<br/>
				Email: {this.props.service.email}
				<br/>
				Téléphone: {this.props.service.phone}
			</Col>
		</Panel>
	);}
}

export default ServiceItem;