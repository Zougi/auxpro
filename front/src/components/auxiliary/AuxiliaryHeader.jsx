import React from 'react';

import AsyncImage from 'lib/image/AsyncImage.jsx'
import ImageUploader from 'lib/image/ImageUploader.jsx'
import { Col, Row, ITable, Panel } from 'lib/Lib.jsx';

class AuxiliaryHeader extends React.Component {

	constructor(props) {
		super(props);
		this.img = props.auxiliary.person.civility==='Mme'?'./../../../assets/img/profil-f.jpeg':'./../../../assets/img/profil.jpeg'
	}

	updateImage(id) {
		if (this.props.onAvatarChanged) {
			this.props.onAvatarChanged(id);
		}
	}

	render() { 
		var table = [
			[
				{th: "Civilité"},
				{td: this.props.auxiliary.person.civility}
			],
			[
				{th: "Nom"},
				{td: this.props.auxiliary.person.firstName + " " + this.props.auxiliary.person.lastName}
			],
			[
				{th: "Adresse electronique"},
				{td: this.props.auxiliary.user.email}
			],
			[
				{th: "Diplome"},
				{td: this.props.auxiliary.diploma}
			]
		];
		
		return(	
			<Panel>
				<Row>
					<Col sm={4}>
						<AsyncImage src={this.props.auxiliary.user.avatar} width={200} height={200}/>
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
		);
	}
}

export default AuxiliaryHeader;
