import React from 'react';
import { Panel } from 'react-bootstrap'

class ServiceMapInformation extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		if (!this.props.header) {
			return (
				<Panel>
					Sélectionner une entrée
				</Panel>
			);
		}
		return (
			<Panel bsStyle={this.props.bsStyle} header={this.props.header}>
				{this.props.name}
				<br/>
				{this.props.address1}
				<br/>
				{this.props.address2}
				<br/>
			</Panel>
		);
	}
}
export default ServiceMapInformation;