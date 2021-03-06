import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './Navbar.css';

/**
 * A react component wrapping a bootstrap navbar
 *
 * @props.inverse     : {boolean}
 * @props.fixedTop    : {boolean}
 * @props.fixedBottom : {boolean}
 * @props.staticTop   : {boolean}
 * @props.brand : {
 *     name: {string},
 *     link: {string}
 * }
 *
 */
class APNavbar extends React.Component {
	
	constructor(props) {
		super(props);
	}

	// Builds the class for the main navbar div
	_buildNavbarClasses() {
		let c = 'navbar';
		if (this.props.inverse) {
			c += ' navbar-inverse';
		}
		if (this.props.fixedTop) {
			c += ' navbar-fixed-top';
		}
		if (this.props.fixedBottom) {
			c += ' navbar-fixed-bottom';
		}
		if (this.props.staticTop) {
			c += ' navbar-static-top';
		}
		return c + ' ap-navbar';
	}

	// Builds the navbar header if a 'brand' property was specified
	_buildBrand() {
		if (this.props.brand) {
			return (
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to={this.props.brand.link}>
							<a>{this.props.brand.name}</a>
						</LinkContainer>
					</Navbar.Brand>
				</Navbar.Header>
			);
		}
		return '';
	}

	_buildContent() {
		if (this.props.leftContent) {
			return (
				<Nav>
					{(this.props.leftContent || []).map(this._buildItem.bind(this))}
				</Nav>
			);
		}
		return '';
	}

	_buildRightContent() {
		if (this.props.rightContent) {
			return (
				<Nav pullRight>
					{(this.props.rightContent || []).map(this._buildItem.bind(this))}
				</Nav>
			);
		}
		return '';
	}
	
	onNavigate(url) {
		return function () {
			this.props.onNavigate(url)
		}.bind(this)
	}

	_buildItem(item) {
		let content = item.glyph ? (<Glyphicon glyph={item.glyph}/>) : item.name;
		if (item.link) {
			return (
					<NavItem key={item.key} eventKey={item.key} disabled={item.disabled || this.props.disabled} onClick={this.onNavigate(item.link)}>
						{content}
					</NavItem>
			);
			/*
			return (
				<LinkContainer key={item.key} to={{ pathname: item.link, query: item.query }}>
					<NavItem eventKey={item.key} disabled={item.disabled || this.props.disabled}>
						{content}
					</NavItem>
				</LinkContainer>
			);
			*/
		}
		if (item.dropdown) {
			return (
				<NavDropdown key={item.key} eventKey={item.key} title={item.name} disabled={item.disabled || this.props.disabled}>
					{item.dropdown.map(this._buildDropdown.bind(this))}
				</NavDropdown>
			);
		}
		return (
			<NavItem eventKey={item.key} key={item.key} onClick={item.callback}>
				{content}
			</NavItem>
		);
	}

	_buildDropdown(item) {
		if (item.divider) {
			return (<MenuItem key={item.key} divider/>);	
		}
		return (
			<MenuItem id={item.key} key={item.key} eventKey={item.key} onClick={this.onNavigate(item.link)}>
				{item.name}
			</MenuItem>
		);
	}

	render() {
		return (
			<Navbar 
				className='ap-navbar'
				inverse={this.props.inverse} 
				fixedTop={this.props.fixedTop} 
				fixedBottom={this.props.fixedBottom}
				staticTop={this.props.staticTop} >
				{this._buildBrand()}
				<Navbar.Collapse>
					{this._buildContent()}
					{this._buildRightContent()}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default APNavbar;