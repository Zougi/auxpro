// react modules
import React from 'react';
// react-bootstrap modules
import { Row, Col, Table, Panel, Image } from 'react-bootstrap'
// core modules
import StoreRegistry from '../../core/StoreRegistry';

class HomeSadHead extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return(
		<Row>
			<Col sm={3}>
				<Image src='{this.img}'/>
			</Col>
			<Col sm={3}>
				info
			</Col>
		</Row>
	);}
}

export default HomeSadHead;
