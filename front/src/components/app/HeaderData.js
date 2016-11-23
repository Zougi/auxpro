import StoreRegistry from 'core/StoreRegistry';

class HeaderData {
	
	constructor() {
		this.data = this.buildData();
		this.callBack = null;
	}
	
	register(callBack) {
		console.log("REGISTER");
		StoreRegistry.register('APP_STORE/app', this, this.onHeaderDataUpdate.bind(this));
		this.callBack = callBack;
	}
	
	onHeaderDataUpdate() {
		console.log("ONUPDATE");
		this.data = this.buildData();
		this.callBack(this.data);
	}
	
	unregister() {
		StoreRegistry.unregister('APP_STORE/app', this);
	}
	
	buildData() {
		var data = { 
			header: this.getHeader(),
			subHeader: this.getSubHeader()
		};
		return data;
	}
	
	getHeader() {
		return StoreRegistry.getStore('APP_STORE').getData('/app/header');
	}
	getSubHeader() {
		return StoreRegistry.getStore('APP_STORE').getData('/app/subHeader');
	}
	
}

var HeaderDataObj = new HeaderData();

export default HeaderDataObj;