import StoreRegistry from 'core/StoreRegistry';
import Dispatcher from 'core/Dispatcher';

class HeaderData {
	
	constructor() {
		this.buildData();
	}

	onNavigate(url) {
		if (url == "logout") {
			Dispatcher.issue('LOGOUT', {});
			url = "/"
		}	
		Dispatcher.issue('NAVIGATE', {path: url});
	}

	buildData() {
		this.className='no-print';
		this.disabled = false;
		this.leftContent = [
			{ key: 0, link: '/sad/home', query: {}, name: 'Accueil' },
			{ key: 1, name: 'Informations', dropdown: [
				{ key: 1.1, link: '/sad/infos', query: {}, name: 'Voir mes informations' },
				{ key: 1.2, link: '/sad/infos/edit', query: {}, name: 'Modifier mes informations' }
			]},
			{ key: 2, link: '/sad/zone', query: {}, name: 'Ma zone' },
			{ key: 3, link: '/sad/customers', query: {}, name: 'Mes usagers' },
			{ key: 4, link: '/sad/interventions', query: {}, name: 'Mes prestations' }
		];
		this.onNavigate = this.onNavigate;
	}
	
}

var HeaderDataObj = new HeaderData();

export default HeaderDataObj;