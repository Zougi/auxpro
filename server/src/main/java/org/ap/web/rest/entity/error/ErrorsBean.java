package org.ap.web.rest.entity.error;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ErrorsBean {
	
	/* ATTRIBUTES */
	
	private ErrorBean[] errors;

	/* CONSTRUCTORS */
	
	public ErrorsBean() {}
	
	/* METHODS */
	
	public ErrorBean[] getErrors() { return errors; }
	public void setErrors(ErrorBean[] errors) { this.errors = errors; }
}
