import ActionBase from 'core/ActionBase.js';
import Utils from 'utils/Utils.js';
import RestService from 'services/rest/RestService.js';

/* **
 * HELPERS **
 * */

function getOfferUrl(offerId) {
	return '/offers/' + (offerId ? offerId  : '');
}

/* **
 * SERVICES **
 * */

// POST OFFER
let PostOffer = new ActionBase({ name: 'POST_OFFER' });
PostOffer.do = function (args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		url   : getOfferUrl(),
		data  : args.data,
		method: 'POST',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET OFFER
let GetOffer = new ActionBase({ name: 'GET_OFFER' });
GetOffer.do = function (args) {
	Utils.checkMembers(args, ['offerId', 'token']);
	var reqParam = {
		url   : getOfferUrl(args.offerId),
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT OFFER
let PutOffer = new ActionBase({ name: 'PUT_OFFER' });
PutOffer.do = function (args) {
	Utils.checkMembers(args, ['offerId', 'data', 'token']);
	var reqParam = {
		url   : getOfferUrl(args.offerId),
		data  : args.data,
		method: 'PUT',
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE OFFER
let DeleteOffer = new ActionBase({ name: 'DELETE_OFFER' });
DeleteOffer.do = function (args) {
	Utils.checkMembers(args, ['offerId', 'token']);
	var reqParam = {
		url   : getOfferUrl(args.offerId),
		method: 'DELETE',
		token : args.token
	};
	return RestService._request(reqParam);
}