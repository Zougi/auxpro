import React from 'react';

import StoreRegistry from 'core/StoreRegistry';

import AsyncImage from 'lib/image/AsyncImage.jsx'
import ImageUploader from 'lib/image/ImageUploader.jsx'
import { Col, Row, ITable, Panel } from 'lib/Lib.jsx';

class AuxiliaryHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = { src: null };
	}

	componentWillReceiveProps(props) {
		this.setState({ src: null });
	}

	updateImage(id) {
		this.setState({ src: id });
		if (this.props.onAvatarChanged) {
			this.props.onAvatarChanged(id);
		}
	}

	_buildTable() {
		let person = this.props.storeData.data.auxiliary.person;
		let user   = this.props.storeData.data.auxiliary.user;
		let infos  = this.props.storeData.data.auxiliary.infos;
		return [
			[
				{ th: 'Civilité' },
				{ td: person ? person.civility : '' }
			],
			[
				{ th: 'Nom'},
				{ td: person ? (person.firstName + ' ' + person.lastName) : '' }
			],
			[
				{th: 'Adresse electronique' },
				{td: user ? user.email : '' }
			],
			[
				{th: 'Diplome' },
				{td: infos ? infos.diploma : '' }
			]
		];
	}

	render() {
		return(	
			<Panel>
				<Row>
					<Col sm={4}>
						<AsyncImage src={this.state.src || this.props.storeData.data.auxiliary.user.avatar} width={200} height={200}/>
						{this.props.edit ? 
							<ImageUploader onUploadComplete={this.updateImage.bind(this)}/>
						:
							''
						}
					</Col>
					<Col sm={8}>
						<Panel>
							<ITable rows={this._buildTable()} bordered striped hover fill/>
						</Panel>
					</Col>
				</Row>
			</Panel>
		);
	}
}

export default AuxiliaryHeader;
