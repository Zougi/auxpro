import StoreRegistry from 'core/StoreRegistry';

class HeaderData {
	
	constructor() {
		this.loginStore = StoreRegistry.getStore('LOGIN_STORE');
		this.data = this.buildData();
		this.callBack = null;
	}
	
	register(callBack) {
		StoreRegistry.register('LOGIN_STORE', this, this.onHeaderDataUpdate.bind(this));
		this.callBack = callBack;
	}
	
	onHeaderDataUpdate() {
		this.data = this.buildData();
		this.callBack(this.data);
	}
	
	unregister() {
		StoreRegistry.unregister('LOGIN_STORE', this);
	}
	
	buildData() {	
		var header;
		if (!this.loginStore.getData('/logged')) {
			header = {
				brand: { link: '/', name: 'AuxPro' },
				rightContent: [
					{ link: '/contact', name: 'Contact', query: {}, key: 1, isLink: true },
					{ link: '/login', name: 'Connexion', query: {}, key: 2, isLink: true }
				]
			}
		} else {
			switch (this.loginStore.getData('/type')) {
				case 'aux':		
					header = {
						brand: { link: '/', name: 'AuxPro' },
						rightContent: [
							{ key: 1, link: '/aux/home', query: {}, name: 'Accueil', glyph: 'home' },
							{ key: 2, link: '/aux/tuto', query: {}, name: 'Tutorials', glyph: 'envelope' },
							{ key: 3, link: 'logout', query: {}, name: 'Déconnexion', glyph: 'off' }
						]
					}
					break;
				case 'sad':
					header = {
						brand: { link: '/sad/home', name: 'AuxPro' },
						rightContent: [
							{ key: 1, link: '/sad/home', query: {}, name: 'Accueil', glyph: 'home' },
							{ key: 2, link: '/sad/tuto', query: {}, name: 'Tutorials', glyph: 'envelope' },
							{ key: 3, link: 'logout', query: {}, name: 'Déconnexion', glyph: 'off' }
						]
					}
					break;
				default:
					break;
			}
		}		
		
		var data = { 
			header: header,
		};
		return data;
	}	
}

var HeaderDataObj = new HeaderData();

export default HeaderDataObj;