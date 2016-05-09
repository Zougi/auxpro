package org.ap.web.rest.entity.error;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ErrorBean {
	
	/* ATTRIBUTES */
	
	private ErrorDetailsBean error;

	/* CONSTRUCTORS */
	
	public ErrorBean() {}
	
	/* METHODS */
	
	public ErrorDetailsBean getError() { return error; }
	public void setError(ErrorDetailsBean error) { this.error = error; }
}
