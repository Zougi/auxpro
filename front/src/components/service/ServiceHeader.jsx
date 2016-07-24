import React from 'react';
import { Row, Col, Table, Panel, Image } from 'react-bootstrap'

class ServiceHeader extends React.Component {

	constructor(props) {
		super(props);
		console.log(props)
		this.img='./../../../assets/img/profil.jpeg';
	}

	render() { return(
		<Row>
			<Col sm={4}>
				<Image src={this.img} rounded/>
			</Col>
			<Col smOffset={1} sm={6}>
				<Panel>
				<Table bordered striped hover fill>
				<tbody>
					<tr>
						<th>Société</th>
						<td>{this.props.service.society}</td>
					</tr>
					<tr>
						<th>Adresse electronique</th>
						<td>{this.props.service.user.email}</td>
					</tr>
					<tr>
						<th>N° Siret</th>
						<td>{this.props.service.siret}</td>
					</tr>
					<tr>
						<th>Raison sociale</th>
						<td>{this.props.service.socialReason}</td>
					</tr>
				</tbody>
				</Table>
				</Panel>
			</Col>
		</Row>
	);}
}

export default ServiceHeader;
