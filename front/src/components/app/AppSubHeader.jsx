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
		this.setState({ subHeader: getSubHeader() });
	}

	_buildContent(item) {
		if (item.dropdown) {
			return (
				<NavDropdown eventKey={item.key} title={item.title}>
					{item.dropdown.map(this._buildDropdown)}
				</NavDropdown>
			);
		}
		return (
			<LinkContainer key={item.key} to={{ pathname: item.link, query: item.query }}>
				<NavItem eventKey={item.key}>
					{item.name}
				</NavItem>
			</LinkContainer>
		);
	}

	_buildDropdown(item) {
		if (item.divider) {
			return (<MenuItem divider/>);	
		}
		return (
			<LinkContainer key={item.key} to={{ pathname: item.link, query: item.query }}>
				<MenuItem eventKey={item.key}>
					{item.name}
				</MenuItem>
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
								{this.state.subHeader.map(this._buildContent.bind(this))}
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
