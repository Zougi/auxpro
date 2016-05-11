package module.rest;

import java.util.Map;

import javax.ws.rs.client.Invocation.Builder;

import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;

import module.TestModuleBase;

public abstract class RestTestBase extends TestModuleBase {
	
	/* ATTRIBUTES */
	
	private String _root;
	
	/* CONSTRUCTOR */
	
	protected RestTestBase(String root) {
		_root = root;
	}
	
	/* METHODS */
	
	protected Builder prepare(String path) {
		return TARGET.
				path(_root + path).
				request();
	}
	protected Builder prepare(String path, String user, String pass) {
		return TARGET.
				path(_root + path).
				request().
				property(HttpAuthenticationFeature.HTTP_AUTHENTICATION_BASIC_USERNAME, user).
				property(HttpAuthenticationFeature.HTTP_AUTHENTICATION_BASIC_PASSWORD, pass);
	}
	protected Builder prepare(String path, Map<String, Object> params, String user, String pass) {
		TARGET = TARGET.path(_root + path);
		for (String key : params.keySet()) {
			TARGET = TARGET.queryParam(key, params.get(key));
		}
		return TARGET.
				request().
				property(HttpAuthenticationFeature.HTTP_AUTHENTICATION_BASIC_USERNAME, user).
				property(HttpAuthenticationFeature.HTTP_AUTHENTICATION_BASIC_PASSWORD, pass);
	}
}
