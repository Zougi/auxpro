import React from 'react';

import AsyncImage from 'lib/image/AsyncImage.jsx'
import ImageUploader from 'lib/image/ImageUploader.jsx'
import { Col, Row, ITable, Panel } from 'lib/Lib.jsx';

class ServiceHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = { src: null };
		this.img='./../../../assets/img/profil.jpeg';
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

	render() { 
		var table = [
			[
				{th: "Société"},
				{td: this.props.service.society}
			],
			[
				{th: "Addresse électronique"},
				{td: this.props.service.user.email}
			],
			[
				{th: "N° Siret"},
				{td: this.props.service.siret}
			],
			[
				{th: "Raison sociale"},
				{td: this.props.service.socialReason}
			]
		];
		
		return(
			<Panel>
				<Row>
					<Col sm={4}>
						<AsyncImage src={this.state.src || this.props.service.user.avatar} width={200} height={200}/>
						{this.props.edit ? 
							<ImageUploader onUploadComplete={this.updateImage.bind(this)}/>
						:
							''
						}
					</Col>
					<Col sm={8}>
						<Panel>
							<ITable rows={table} bordered striped hover fill/>
						</Panel>
					</Col>
				</Row>
			</Panel>
	);}
}

export default ServiceHeader;
