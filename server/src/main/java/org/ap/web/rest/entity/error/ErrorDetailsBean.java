package org.ap.web.rest.entity.error;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ErrorDetailsBean {
	
	/* ATTRIBUTES */
	
	private String msg;
	private String code;

	/* CONSTRUCTORS */
	
	public ErrorDetailsBean() {}
	
	/* METHODS */
	
	public String getMessage() { return msg; }
	public void setMessage(String msg) { this.msg = msg; }
	
	public String getCode() { return code; }
	public void setCode(String code) { this.code = code; }
}
