import React from 'react';

import AsyncImage from 'lib/image/AsyncImage.jsx'
import ImageUploader from 'lib/image/ImageUploader.jsx'
import { Col, Row, ITable, Panel } from 'lib/Lib.jsx';

class ServiceHeader extends React.Component {

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
				console.log(this.props)
		let person = this.props.storeData.data.service.person;
		let user   = this.props.storeData.data.service.user;
		let infos  = this.props.storeData.data.service.infos;
		return [
			[
				{th: "Société"},
				{td: this.props.storeData.data.service.society}
			],
			[
				{th: "Addresse électronique"},
				{td: user.email}
			],
			[
				{th: "N° Siret"},
				{td: this.props.storeData.data.service.siret}
			],
			[
				{th: "Raison sociale"},
				{td: this.props.storeData.data.service.socialReason}
			]
		];
	}

	render() { 
		return(
			<Panel>
				<Row>
					<Col sm={4}>
						<AsyncImage src={this.state.src || this.props.storeData.data.service.user.avatar} width={200} height={200}/>
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
	);}
}

export default ServiceHeader;
