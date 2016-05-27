// react modules
import React from 'react'
// react-bootstrap moduls
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Glyphicon } from 'react-bootstrap'
// react-router-bootstrap moduls
import { LinkContainer } from 'react-router-bootstrap'

// core modules
import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';

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
		this.setState({ logged: StoreRegistry.getStore('LOGIN_STORE').getData('/logged') });
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
						<LinkContainer to='/about'>
							<NavItem eventKey={1}>Acceuil</NavItem>
						</LinkContainer>
						<LinkContainer to='/contact'>
							<NavItem eventKey={2}>Mon Compte</NavItem>
						</LinkContainer>
						<NavItem onClick={this.logout}>Déconnexion</NavItem>
					</Nav>
					:
					<Nav pullRight>
						<LinkContainer to='/contact'>
							<NavItem eventKey={2}>Contact</NavItem>
						</LinkContainer>
						<LinkContainer to='/login'>
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
