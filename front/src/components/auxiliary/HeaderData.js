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
		this.className = 'no-print';
		this.disabled = false
		this.leftContent = [
			{ key: 0, link: '/aux/home', query: {}, name: 'Accueil' },
			{ key: 1, name: 'Informations', dropdown: [
				{ key: 1.1, link: '/aux/infos', query: {}, name: 'Voir mes informations' },
				{ key: 1.2, link: '/aux/infos/edit', query: {}, name: 'Modifier mes informations' }
			]},
			{ key: 2, link: '/aux/planning', query: {}, name: 'Planning' },
			{ key: 3, link: '/aux/zone', query: {}, name: 'Zone' },
			{ key: 4, link: '/aux/offers', query: {}, name: 'Offres' }
		];
		this.onNavigate = this.onNavigate;
	}
	
}

var HeaderDataObj = new HeaderData();

export default HeaderDataObj;