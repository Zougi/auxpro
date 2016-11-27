import StoreRegistry from 'core/StoreRegistry';
import Dispatcher from 'core/Dispatcher';

class HeaderData {
	
	constructor() {
		this.loginStore = StoreRegistry.getStore('LOGIN_STORE');
		this.buildData();
		this.callBack = null;
	}
	
	register(callBack) {
		StoreRegistry.register('LOGIN_STORE', this, this.onHeaderDataUpdate.bind(this));
		this.callBack = callBack;
	}
	
	onHeaderDataUpdate() {
		this.buildData();
		this.callBack();
	}
	
	unregister() {
		StoreRegistry.unregister('LOGIN_STORE', this);
	}
	
	onNavigate(url) {
		if (url == "logout") {
			Dispatcher.issue('LOGOUT', {});
			url = "/"
		}	
		Dispatcher.issue('NAVIGATE', {path: url});
	}
	
	buildData() {	
		if (!this.loginStore.getData('/logged')) {
			this.brand = { link: '/', name: 'AuxPro' };
			this.rightContent = [
					{ link: '/contact', name: 'Contact', query: {}, key: 1, isLink: true },
					{ link: '/login', name: 'Connexion', query: {}, key: 2, isLink: true }
			];
		} else {
			switch (this.loginStore.getData('/type')) {
				case 'aux':		
					this.brand = { link: '/', name: 'AuxPro' };
					this.rightContent = [
							{ key: 1, link: '/aux/home', query: {}, name: 'Accueil', glyph: 'home' },
							{ key: 2, link: '/aux/tuto', query: {}, name: 'Tutorials', glyph: 'envelope' },
							{ key: 3, link: 'logout', query: {}, name: 'Déconnexion', glyph: 'off' }
					];
					break;
				case 'sad':
					this.brand = { link: '/sad/home', name: 'AuxPro' };
					this.rightContent = [
							{ key: 1, link: '/sad/home', query: {}, name: 'Accueil', glyph: 'home' },
							{ key: 2, link: '/sad/tuto', query: {}, name: 'Tutorials', glyph: 'envelope' },
							{ key: 3, link: 'logout', query: {}, name: 'Déconnexion', glyph: 'off' }
					];
					break;
				default:
					break;
			}
		}
		this.onNavigate = this.onNavigate;
		this.className='no-print';
		this.inverse={true};
		this.fixedTop={true};
	}	
}

var HeaderDataObj = new HeaderData();

export default HeaderDataObj;