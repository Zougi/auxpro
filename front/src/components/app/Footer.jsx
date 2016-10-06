import React from 'react';

import { Navbar, Grid, Row } from 'react-bootstrap'

import FooterTable from './FooterTable.jsx'

class Footer extends React.Component {

	constructor(props) {
		super(props);  
	}
 
	render() { 
		var items1 = [
			{ url: '/presentation', name: 'Qui sommes-nous ?'},
			{ url: '', name: 'Nos services'}
		];
		var items2 = [
			{ url: '', name: 'CGU'},
			{ url: '', name: 'CGV'},
			{ url: '', name: 'Confidentialité'}
		];
		var items3 = [
			{ url: '', name: 'FAQ'},
			{ url: '', name: 'Aide'},
			{ url: '', name: 'Nous contacter'}
		];
		return (
			<footer className="footer"><Navbar><Grid><Row>
				<FooterTable size={4} title="AuxPro" items={items1}/>
				<FooterTable size={4} title="Informations Légales" items={items2}/>
				<FooterTable size={4} title="Questions" items={items3}/>
			</Row></Grid></Navbar></footer>
	);}
}

export default Footer;