
export default class RestService {

	static _request(reqParam) {
			 var _CONFIG = {
				BASE_URL : 'http://127.0.0.1:8090/rest',
				HEADER_TOKEN : 'Authorization'
			};
			reqParam.url = _CONFIG.BASE_URL + reqParam.url;
			reqParam.method = reqParam.method || 'GET';
			reqParam.data = reqParam.data  || {}; 
			return new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open(reqParam.method, reqParam.url, true);
				xhr.setRequestHeader(_CONFIG.HEADER_TOKEN, reqParam.token);
				xhr.setRequestHeader('Content-type', 'application/json');
				xhr.onload = function(oEvt) {
					if (xhr.readyState === 4) {
						if (xhr.status === 200 || xhr.status === 201) {
							if (xhr.responseText) {
								resolve(JSON.parse(xhr.responseText));
							} else {
								resolve();
							}
						} else if (xhr.status === 401) {
							reject({ error: 'UNAUTHORIZED', status: 401 });
						} else if (xhr.status === 500) {
							reject({ error: 'INTERNAL_ERROR', status: 500 });
						} else {
							reject(JSON.parse(xhr.responseText));
						}
					} else {
					}
				};
				let data = JSON.stringify(reqParam.data);
				console.log(data);
				xhr.send(data);
			});
		};
	
	
	/**
	 *
	 * @param {object} [args]
	 * @param {string} [args.token] valid session token to be passed as header
	 * @returns a Promise object 
	 */
    static getAuth(args) {
        var reqParam = {};
        reqParam.url = '/auth';
        reqParam.method = 'GET';
        reqParam.token = args.token;
        return RestService._request(reqParam);
    };
	
	/**
	 *
	 * @param {object} [args]
	 * @param {string} [args.token] valid session token to be passed as header
	 * @returns a Promise object 
	 */
	static getAuxiliaries(args) {
		var reqParam = {};
		reqParam.url = '/auxiliaries';
		reqParam.method = 'GET';
		reqParam.token = args.token;
		return RestService._request(reqParam);
	};
	
	/**
	 *
	 * @param {object} [args]
	 * @param {string} [args.token] valid session token to be passed as header
	 * @returns a Promise object 
	 */
	static getAuxiliary(args) {
		var reqParam = {};
		reqParam.url = '/auxiliaries/' + args.id;
		reqParam.method = 'GET';
		reqParam.token = args.token;
		return RestService._request(reqParam);
	};

	/**
     *
     * @param {object} [args]
     * @param {object} [args.data]
     * @returns a Promise object 
     */
    static postAuxiliary(args) {
        var reqParam = {};
        reqParam.url = '/auxiliaries';
        reqParam.method = 'POST';
        reqParam.data = args.data;
        reqParam.token = args.token;
        return RestService._request(reqParam);
    };
	
	/**
     *
     * @param {object} [args]
     * @param {object} [args.data]
     * @returns a Promise object 
     */
    static putAuxiliary(args) {
        var reqParam = {};
        reqParam.url = '/auxiliaries/' + args.id;
        reqParam.method = 'PUT';
        reqParam.data = args.data;
        reqParam.token = args.token;
        return RestService._request(reqParam);
    };

/**
	 *
	 * @param {object} [args]
	 * @param {string} [args.id] auxiliary id
	 * @param {string} [args.token] valid session token to be passed as header
	 * @returns a Promise object 
	 */
	static getAuxiliaryMissions(args) {
		var reqParam = {};
		reqParam.url = '/auxiliaries/' + args.id + '/missions';
		reqParam.method = 'GET';
		reqParam.token = args.token;
		return RestService._request(reqParam);
	};

	/**
	 *
	 * @param {object} [args]
	 * @param {string} [args.id] auxiliary id
	 * @param {string} [args.token] valid session token to be passed as header
	 * @returns a Promise object 
	 */
	static getAuxiliaryAbsences(args) {
		var reqParam = {};
		reqParam.url = '/auxiliaries/' + args.id + '/absences';
		reqParam.method = 'GET';
		reqParam.token = args.token;
		return RestService._request(reqParam);
	};

	/**
     *
     * @param {object} [args]
     * @param {object} [args.data]
     * @param {object} [args.token]
     * @returns a Promise object 
     */
    static postAuxiliaryAbsence(args) {
        var reqParam = {};
        reqParam.url = '/auxiliaries/' + args.id + '/absences';
        reqParam.method = 'POST';
        reqParam.data = args.data;
        reqParam.token = args.token;
        return RestService._request(reqParam);
    };
}