import StoreRegistry from 'core/StoreRegistry';

class HeaderData {
	
	constructor() {
		this.data = this.buildData();
	}
	
	buildData() {		
		var data = {
				disabled: false,
				leftContent: [
					{ key: 0, link: '/aux/home', query: {}, name: 'Accueil' },
					{ key: 1, name: 'Informations', dropdown: [
						{ key: 1.1, link: '/aux/infos', query: {}, name: 'Voir mes informations' },
						{ key: 1.2, link: '/aux/infos/edit', query: {}, name: 'Modifier mes informations' }
					]},
					{ key: 2, link: '/aux/planning', query: {}, name: 'Planning' },
					{ key: 3, link: '/aux/zone', query: {}, name: 'Zone' },
					{ key: 4, link: '/aux/offers', query: {}, name: 'Offres' }
				]
		};
		return data;
	}
	
}

var HeaderDataObj = new HeaderData();

export default HeaderDataObj;