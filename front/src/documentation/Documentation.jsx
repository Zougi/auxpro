// react modules
import React from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import Row from 'components-lib/Row/Row.jsx';
import Col from 'components-lib/Col/Col.jsx';
import Panel from 'components-lib/Panel/Panel.jsx';

import Home from 'documentation/Home.jsx';
import ImageDoc from 'documentation/ImageDoc.jsx';
import TableDoc from 'documentation/TableDoc.jsx';
import ITableDoc from 'documentation/ITableDoc.jsx';
import RowDoc from 'documentation/RowDoc.jsx';
import ColDoc from 'documentation/ColDoc.jsx';

class Documentation extends React.Component {

	constructor(props) {
		super(props);
		
		this.docs = {
			Home: (<Home/>),
			Image: (<ImageDoc/>),
			Table: (<TableDoc/>),
			ITable: (<ITableDoc/>),
			Row: (<RowDoc/>),
			Col: (<ColDoc/>)
			
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
							<LinkContainer to="/doc/Row">
								<div>Row</div>
							</LinkContainer>
							<LinkContainer to="/doc/Col">
								<div>Col</div>
							</LinkContainer>
							<LinkContainer to="/doc/Table">
								<div>Table</div>
							</LinkContainer>
							<LinkContainer to="/doc/ITable">
								<div>ITable</div>
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