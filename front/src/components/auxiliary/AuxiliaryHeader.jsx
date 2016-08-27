// react modules
import React from 'react';
// react-bootstrap modules
import { Row, Col, Table, Image } from 'react-bootstrap'

import ITable from 'components-lib/ITable/ITable.jsx';
import Panel from 'components-lib/Panel/Panel.jsx';

class AuxiliaryHeader extends React.Component {

	constructor(props) {
		super(props);
		this.img= props.auxiliary.person.civility==='Mme'?'./../../../assets/img/profil-f.jpeg':'./../../../assets/img/profil.jpeg'
	}

	render() { 
		var table = [
			[
				{th: "Nom"},
				{td: this.props.auxiliary.person.firstName + " " + this.props.auxiliary.person.lastName}
			],
			[
				{th: "Adresse electronique"},
				{td: this.props.auxiliary.user.email}
			],
			[
				{th: "Civilité"},
				{td: this.props.auxiliary.person.civility}
			],
			[
				{th: "Diplome"},
				{td: this.props.auxiliary.diploma}
			]
		];
		
		return(
			<Row>
				<Col sm={4}>
					<Image src={this.img} rounded/>
				</Col>
				<Col smOffset={1} sm={6}>
					<Panel>
						<ITable rows={table}/>
					</Panel>
				</Col>
			</Row>
		);
	}
}

export default AuxiliaryHeader;
