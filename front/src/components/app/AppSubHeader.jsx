import React from 'react'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

function getSubHeader() {
	return StoreRegistry.getStore('APP_STORE').getData('/app/subHeader');
}

class AppSubHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = { subHeader: getSubHeader() };
	}

	componentDidMount() {
		StoreRegistry.register('APP_STORE', this, this.onStoreUpdate.bind(this));
    }

    componentWillUnmount() {
        StoreRegistry.unregister('APP_STORE', this);   
    }
	
	onStoreUpdate() {
		console.log('subupdate');
		console.log( getSubHeader() );
		this.setState({ subHeader: getSubHeader() });
	}

	_buildContent(item) {
		return (
			<LinkContainer key={item.key} to={{ pathname: item.link, query: item.query }}>
				<NavItem eventKey={item.key}>
					{item.name}
				</NavItem>
			</LinkContainer>
		);
	}

	render() { 
		if (this.state.subHeader.length) {
			return (
				<div>
					<Navbar>
						<Navbar.Collapse>
							<Nav>
								{this.state.subHeader.map(this._buildContent)}
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>
			);
		}
		return (<div/>);
	}
}

export default AppSubHeader;
