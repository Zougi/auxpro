// react modules
import React from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import Row from 'components-lib/Row/Row.jsx';
import Col from 'components-lib/Col/Col.jsx';
import Panel from 'components-lib/Panel/Panel.jsx';

import Home from 'documentation/Home.jsx';
import ImageDoc from 'documentation/ImageDoc.jsx';
import TableDoc from 'documentation/TableDoc.jsx';

class Documentation extends React.Component {

	constructor(props) {
		super(props);
		
		this.docs = {
			Home: (<Home/>),
			Image: (<ImageDoc/>),
			Table: (<TableDoc/>)
			
		}
	}
	
	render() { 
		return(
			<div className='container'>
				<Row>
					<Col md={9}>
						{this.docs[this.props.params.nav]}
					</Col>
					<Col md={3}>
						<Panel>
							<LinkContainer to="/doc/Home">
								<div>Home</div>
							</LinkContainer>
							<LinkContainer to="/doc/Table">
								<div>Table</div>
							</LinkContainer>
							<LinkContainer to="/doc/Image">
								<div>Image</div>
							</LinkContainer>
						</Panel>
					</Col>
				</Row>
			</div>
	);}
}

export default Documentation;