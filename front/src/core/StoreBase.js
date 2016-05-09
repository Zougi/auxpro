import ObjectBase from './ObjectBase.js';
import StoreRegistry from './StoreRegistry.js';

export default class StoreBase extends ObjectBase {

	constructor(props) {
		super(props);
		this._content = props.content || {};
		this._callbacks = [];
		StoreRegistry.registerStore(this);
	}

	notify() {
		let length = this._callbacks.length;
		for (let i = 0 ; i < length ; i++) {
			let current = this._callbacks[i];
			current.callback();
		}
	}

	register(controller, callback) {
		if (controller && callback) {
			this._callbacks.push({
				controller: controller,
				callback: callback
			})
		}
	}

	unregister(controller) {
		let length = this._callbacks.length;
		for (let i = 0 ; i < length ; i++) {
			let current = this._callbacks[i];
			if (current.controller === controller) {
				this._callbacks.splice(i, 1);
				i--;
				length--;
			}
		}
	}

	getData(path) {
		if (path) {
			let spath = path.split('/');
			let current = this._content;
			for (let i = 0 ; i < spath.length ; i++) {
				if (spath[i] !== '') {
					current = current[spath[i]]
					if (!current) {
						return undefined;
					}
				}
			}
			return current;
		} else {
			return this._content;
		}
	}
}