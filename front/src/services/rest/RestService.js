
let DEBUG = false;

function log(msg) {
	if (DEBUG) {
		console.log(msg);
	}
}

let _CONFIG = {
	BASE_URL : 'http://127.0.0.1:8090/rest',
	HEADER_TOKEN : 'Authorization'
};

export default class RestService {

	static _request(reqParam) {
		reqParam.url = _CONFIG.BASE_URL + reqParam.url;
		reqParam.method = reqParam.method || 'GET';
		reqParam.data = reqParam.data  || {}; 
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open(reqParam.method, reqParam.url, true);
			xhr.setRequestHeader(_CONFIG.HEADER_TOKEN, reqParam.token);
			if (!reqParam.type) {
				xhr.setRequestHeader('Content-type', 'application/json');
			} else {
				xhr.responseType = reqParam.type;				
			}
			xhr.onload = function(oEvt) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200 || xhr.status === 201) {
						if (xhr.response) {
							if (reqParam.type) {
								resolve(xhr.response);
							} else {
								resolve(JSON.parse(xhr.responseText));
							}
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
			log(data);
			xhr.send(data);
		});
	};

	static _sendData(reqParam) {
		reqParam.url = _CONFIG.BASE_URL + reqParam.url;
		reqParam.method = 'POST';
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open(reqParam.method, reqParam.url, true);
			xhr.setRequestHeader(_CONFIG.HEADER_TOKEN, reqParam.token);
			//xhr.setRequestHeader('Content-type', 'multipart/form-data');
			xhr.onload = function(oEvt) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200 || xhr.status === 201) {
						if (xhr.response) {
							console.log(xhr.responseText);
							let resp = JSON.parse(xhr.responseText);
							reqParam.data.id = resp.id;
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
			
			/*
			let boundary = '------WebKitFormBoundaryQVWZk5RASvaYYBCP';
			let CRLF = '\r\n';
			let multipart = '';
			multipart += boundary + CRLF;
			multipart += 'Content-Disposition: form-data; ';
			multipart += 'name="' + reqParam.data.name + '"';
			multipart += 'filename="' + reqParam.data.file.name + '"' + CRLF;
			multipart += 'Content-Type: application/octet-stream';
			multipart += CRLF + CRLF;
			multipart += reqParam.data.file.getAsBinary() + CRLF;
			multipart += boundary + CRLF;
			console.log(multipart);
			*/

			let formData = new FormData();
			formData.append('file', reqParam.data.file);
			console.log(reqParam.data.file);
			console.log(formData);

			xhr.send(formData);
		});
	};
	
}