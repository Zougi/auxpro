package org.ap.web.common;

public interface IValidator {
	
	public boolean isValid(String value);
	
	public boolean isValid(String value, boolean acceptNull);

}
