import React from 'react'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

class AppHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = { header: StoreRegistry.getStore('APP_STORE').getData('/app/header') };
	}

	componentDidMount() {
		StoreRegistry.register('APP_STORE', this, this.onStoreUpdate.bind(this));
    }

    componentWillUnmount() {
        StoreRegistry.unregister('APP_STORE', this);   
    }
	
	onStoreUpdate() {
		this.setState({ header: StoreRegistry.getStore('APP_STORE').getData('/app/header') });
	}

	_buildRightContent(item) {
		let content = item.glyph ? (<Glyphicon glyph={item.glyph}/>) : item.name;
		if (item.link) {
			return (
				<LinkContainer key={item.key} to={{ pathname: item.link, query: item.query }}>
					<NavItem eventKey={item.key}>
						{content}
					</NavItem>
				</LinkContainer>
			);
		}
		return (
			<NavItem eventKey={item.key} key={item.key} onClick={item.callback}>
				{content}
			</NavItem>
		);
	}

	render() { 
		let subHeaders = this.state.header.rightContent.map(this._buildRightContent);
		return (
			<header>
				<Navbar inverse fixedTop>
					<Navbar.Header>
						<Navbar.Brand>
							<LinkContainer to={this.state.header.brand.link}>
								<a>{this.state.header.brand.name}</a>
							</LinkContainer>
						</Navbar.Brand>
						<Navbar.Toggle/>
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							{subHeaders}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</header>
		);
	}
}

export default AppHeader;
