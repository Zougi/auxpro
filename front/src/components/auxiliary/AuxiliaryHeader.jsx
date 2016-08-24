// react modules
import React from 'react';
// react-bootstrap modules
import { Row, Col, Table, Panel, Image } from 'react-bootstrap'

import ITable from '../../components-lib/ITable/ITable.jsx';

class AuxiliaryHeader extends React.Component {

	constructor(props) {
		super(props);
		this.img= props.auxiliary.person.civility==='Mme'?'./../../../assets/img/profil-f.jpeg':'./../../../assets/img/profil.jpeg'
	}

	render() { 
		// var table = [
			// [
				// {th: "Nom"},
				// {td: "Jean-Edouard De Lorme"}
			// ],
			// [
				// {th: "Adresse electronique"},
				// {td: "a"}
			// ]
		// ];
		// <Panel>
			// <ITable rows={table}/>
		// </Panel>
		
		return(
			<Row>
				<Col sm={4}>
					<Image src={this.img} rounded/>
				</Col>
				<Col smOffset={1} sm={6}>
					<Panel>
					<Table bordered striped hover fill>
					<tbody>
						<tr>
							<th>Nom</th>
							<td>{this.props.auxiliary.person.firstName} {this.props.auxiliary.person.lastName}</td>
						</tr>
						<tr>
							<th>Adresse electronique</th>
							<td>{this.props.auxiliary.user.email}</td>
						</tr>
						<tr>
							<th>Civilité</th>
							<td>{this.props.auxiliary.person.civility}</td>
						</tr>
						<tr>
							<th>Diplome</th>
							<td>{this.props.auxiliary.diploma}</td>
						</tr>
					</tbody>
					</Table>
					</Panel>
				</Col>
			</Row>
		);
	}
}

export default AuxiliaryHeader;
