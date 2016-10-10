import React from 'react'

import Navbar from 'components-lib/Navbar/Navbar.jsx'

class Contact extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		return (
			<Navbar 
				leftContent={[
				{ key: 0, link: '/home', query: {}, name: 'Accueil' },
				{ key: 1, name: 'Profil', dropdown: [
					{ key: 1.1, link: '/home/infos', query: {}, name: 'Voir profil' },
					{ key: 1.2, link: '/home/edit', query: {}, name: 'Editer profil' }
				]},
				{ key: 2, link: '/home/planning', query: {}, name: 'Planning' },
				{ key: 3, link: '/home/zone', query: {}, name: 'Zone' },
				{ key: 4, link: '/home/offres', query: {}, name: 'Offres' }
			]} />
		);
	}
}

export default Contact;