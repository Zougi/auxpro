import StoreRegistry from 'core/StoreRegistry';

class HeaderData {
	
	constructor() {
		this.data = this.buildData();
	}
	
	buildData() {		
		var data = {
				disabled: false,
				leftContent: [
					{ key: 0, link: '/sad/home', query: {}, name: 'Accueil' },
					{ key: 1, name: 'Informations', dropdown: [
						{ key: 1.1, link: '/sad/infos', query: {}, name: 'Voir mes informations' },
						{ key: 1.2, link: '/sad/infos/edit', query: {}, name: 'Modifier mes informations' }
					]},
					{ key: 2, link: '/sad/zone', query: {}, name: 'Ma zone' },
					{ key: 3, link: '/sad/customers', query: {}, name: 'Mes usagers' },
					{ key: 4, link: '/sad/interventions', query: {}, name: 'Mes prestations' }
				]
		};
		return data;
	}
	
}

var HeaderDataObj = new HeaderData();

export default HeaderDataObj;