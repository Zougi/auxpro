package org.ap.web.entity.network;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class IdBean {

	private String id;
	
	public IdBean() {}

	public String getId() { return id; }
	public void setId(String id) { this.id = id; }
}
