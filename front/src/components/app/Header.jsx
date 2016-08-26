import React from 'react'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			logged: StoreRegistry.getStore('LOGIN_STORE').getData('/logged')
		};
	}

	componentDidMount() {
        StoreRegistry.register('LOGIN_STORE', this, this.onLogon.bind(this));
    }

    componentWillUnmount() {
        StoreRegistry.unregister('LOGIN_STORE', this);   
    }
	
	onLogon() {
		this.setState({ logged: StoreRegistry.getStore('LOGIN_STORE').getData('/logged') && StoreRegistry.getStore('LOGIN_STORE').getData('/type') !== 'guest' });
	}

	logout(event) {
		event.preventDefault();
    	Dispatcher.issue('LOGOUT', {});
	}

	render() { return (
		<header>
			<Navbar inverse fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to='/'>
							<a>AuxPro</a>
						</LinkContainer>
					</Navbar.Brand>
					<Navbar.Toggle/>
				</Navbar.Header>
				<Navbar.Collapse>
				{this.state.logged?
					<Nav pullRight>
						<LinkContainer to={{ pathname: '/about', query: {} }}>
							<NavItem eventKey={1}>Acceuil</NavItem>
						</LinkContainer>
						<LinkContainer to={{ pathname: '/contact', query: {} }}>
							<NavItem eventKey={2}>Mon Compte</NavItem>
						</LinkContainer>
						<NavItem onClick={this.logout}>Déconnexion</NavItem>
					</Nav>
					:
					<Nav pullRight>
						<LinkContainer to={{ pathname: '/contact', query: {} }}>
							<NavItem eventKey={2}>Contact</NavItem>
						</LinkContainer>
						<LinkContainer to={{ pathname: '/login', query: {} }}>
							<NavItem eventKey={1}>Connexion</NavItem>
						</LinkContainer>
					</Nav>
					}
				</Navbar.Collapse>
			</Navbar>
		</header>
	);}
}

export default Header;
