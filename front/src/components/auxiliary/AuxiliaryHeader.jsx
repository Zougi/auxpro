import React from 'react';

import Image from 'components/common/image/Image.jsx'
import ImageUploader from 'components/common/image/ImageUploader.jsx'
import { Col, Row, ITable, Panel } from 'lib/Lib.jsx';

class AuxiliaryHeader extends React.Component {

	constructor(props) {
		super(props);
		this.img= props.auxiliary.person.civility==='Mme'?'./../../../assets/img/profil-f.jpeg':'./../../../assets/img/profil.jpeg'
		this.state = {
			src: '1.jpg'
		}
	}

	updateImage(id) {
		this.setState({ src: id });
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
					<Image src={this.state.src} width={200} height={200}/>
				</Col>
				<Col smOffset={1} sm={7}>
					<Panel>
						<ITable rows={table} bordered striped hover fill/>
					</Panel>
				</Col>
				<ImageUploader onUploadComplete={this.updateImage.bind(this)}/>
			</Row>
		);
	}
}

export default AuxiliaryHeader;
