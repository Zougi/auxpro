package org.ap.web.common;

import java.util.regex.Pattern;

public class PasswordValidator implements IValidator {

	/* STATIC */

	private static final PasswordValidator _INSTANCE = new PasswordValidator();

	public static PasswordValidator getInstance() {
		return _INSTANCE;
	}
	
	/* ATTRIBUTES */
	
	private Pattern _pattern;

	/* CONSTRUCTOR */

	private PasswordValidator() {
		_pattern = Pattern.compile("\\d{10}");
	}

	/* METHODS */

	public boolean isValid(String password) {
		return isValid(password, false);
	}
	public boolean isValid(String password, boolean acceptNull) {
		if (password == null || password.trim().equals("")) return acceptNull;
		String formatted = password.replace(" " , "").replace("." , "").replace("-" , "");
		return _pattern.matcher(formatted).matches();
	}
}
