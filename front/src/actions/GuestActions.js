import ActionBase from 'core/ActionBase.js';

// GUEST_FILTER_SERVICES
var GuestFilterServices = new ActionBase({ name: 'GUEST_FILTER_SERVICES' });
GuestFilterServices.do = function (args) {
	return new Promise(function (resolve, reject) {
		resolve(args.postalCode);
	});
}
