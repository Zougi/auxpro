import ObjectBase from 'core/ObjectBase.js';

/**
 * This class lists the available actions in the application.
 * It is used as single entry point to access actions by the dispatcher.
 */
class ActionRegistry extends ObjectBase {
    
    /**
     * @constructor
     */
    constructor (props) {
        super({ name: 'ActionRegistry'});
        this._actions = {}
    };

    /**
     * @public
     */
    registerAction (action) {
        if (action.getName()) {
            //console.log("ActionRegistry.register: " + action.getName());
            this._actions[action.getName().toUpperCase()] = action;
        } else {
            console.log("ActionRegistry.register: cannot register action with no name");
        }
    };

    /**
     * @public
     */
    getAction (action) {
        return this._actions[action.toUpperCase()];
    };

    /**
     * @public
     */
    execute (action, args) {
        var a = this.getAction(action);
        if (a && a.do) {
            return a.do(args);
        } else {
            if (a) console.log("ERR: " + action + " missing do");
            else console.log("ERR: " + action + " missing action");
        }
    };
}

// Singleton pattern: creates the ActionRegistry instance
var ActRegistry = new ActionRegistry();

// Exports the ActionRegistry unique instance
export default ActRegistry;