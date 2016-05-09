import ObjectBase from './ObjectBase.js';
import ActionRegistry from './ActionRegistry.js';

export default class ActionBase extends ObjectBase {

	constructor(props) {
		super(props);
		ActionRegistry.registerAction(this);
	}

	do() {
		console.log("This action has not been implemented");
	}
}