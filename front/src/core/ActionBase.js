import ObjectBase from 'core/ObjectBase.js';
import ActionRegistry from 'core/ActionRegistry.js';

export default class ActionBase extends ObjectBase {

	constructor(props) {
		super(props);
		ActionRegistry.registerAction(this);
	}

	do() {
		console.log("This action has not been implemented");
	}
}