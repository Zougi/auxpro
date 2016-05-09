import ObjectBase from './ObjectBase.js';
import ActionRegistry from './ActionRegistry.js';

/**
 * The dispatcher receives actions request, triggers the actions and notify the registered stores.
 * Note: actions with no registered stores will NOT be executed.
 */
class Dispatcher extends ObjectBase {

	/**
	 * 
	 * @constructor
	 */
	constructor() {
		super({ name: 'Dispatcher'});
		this._callbacks = [];
		this._errors = [];
	}

	/**
	 * 
	 * @public
	 */
	register(action, callback, error) {
		var a = ActionRegistry.getAction(action);
		if (a) {
			if (callback) {
				console.log('Registered callback on action: ' + action);
				this._callbacks[a.getName()] = this._callbacks[a.getName()] || [];
				this._callbacks[a.getName()].push(callback);
			}
			if (error) {
				console.log('Registered error callback on action: ' + action);
				this._errors[a.getName()] = this._errors[a.getName()] || [];
				this._errors[a.getName()].push(error);
			}
		} else {
			console.error('Unknown action: ' + action);
		}
	}

	/**
	 * 
	 * @public
	 */
	issue (action, param) {
		var a = ActionRegistry.getAction(action);
		if (a) {
			return new Promise(function(resolve, reject) {
				this._exec(action, param).
				then( (result) => {
					console.log("Dispatcher.issue >> OK " + action + " (" + JSON.stringify(param) + ")");
					console.log(result);
					var callbacks = this._callbacks[a.getName()] || [];
					var length = callbacks.length;
					for (var i = 0 ; i < length ; i++) {
						callbacks[i](result);
					}
					resolve({ action: action, status: 'ok' });
				}).
				catch( (error) => {
					console.log("Dispatcher.issue >> ERR " + action + " (" + JSON.stringify(param) + ")");
					console.log(error);
					var errors = this._errors[a.getName()] || [];
					var length = errors.length;
					for (var i = 0 ; i < length ; i++) {
						errors[i](error);
					}
					reject({ action: action, status: 'error' });
				});
			}.bind(this)); 
		} else {
			return new Promise(function( resolve, reject) {
				console.error('Unknown action: ' + action);
				reject({ action: action, status: 'Unknown action' });
			});
		}
	}

	/**
	 * 
	 * @private
	 */
	_exec (action, param) {
		var a = ActionRegistry.getAction(action);
		if (a && a.do) {
			return a.do(param);
		} else {
			return new Promise(function(resolve, reject) {
				if (a) reject( { error: "Dispatcher._exec ERR: " + action + " missing do" } );
				else   reject( { error: "Dispatcher._exec ERR: " + action + " unknown action" } );
			});
		}
	};
}

// Singleton pattern: create the Dispatcher unique instance
var Disp = new Dispatcher();

// Export the Dispatcher unique instance
export default Disp;