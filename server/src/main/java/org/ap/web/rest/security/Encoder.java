package org.ap.web.rest.security;

import javax.xml.bind.DatatypeConverter;

public class Encoder {
	
	public static String decode(String code) {
		byte[] decodedBytes = DatatypeConverter.parseBase64Binary(code);
		if(decodedBytes == null || decodedBytes.length == 0){
			return null;
		}
		return new String(decodedBytes);
	}
	
	public static String[] decodeBasicAuth(String auth) {
		auth = auth.replaceFirst("[B|b]asic ", "");
		String clearAuth = decode(auth);
		if (clearAuth == null) {
			return null;
		} else {
			return clearAuth.split(":", 2);
		}
	}
}