package org.ap.web.entity.mongo;

import java.util.Date;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class MissionBean extends MongoEntity {
	
	private int startHour;
	private int endHour;
	private Date date;
	
	private ContactBean contact;
	
	@MongoId
	private String customerId;
	@MongoId
	private String serviceId;
	@MongoId
	private String auxiliaryId;
	
	public MissionBean() {}
	
	public int getStartHour() { return startHour; }
	public void setStartHour(int startHour) { this.startHour = startHour; }
	
	public int getEndHour() { return endHour; }
	public void setEndHour(int endHour) { this.endHour = endHour; }

	public Date getDate() { return date; }
	public void setDate(Date date) { this.date = date; }
	
	public ContactBean getContact() { return contact; }
	public void setContact(ContactBean contact) { this.contact = contact; }

	public String getCustomerId() { return customerId; }
	public void setCustomerId(String customerId) { this.customerId = customerId; }

	public String getServiceId() { return serviceId; }
	public void setServiceId(String serviceId) { this.serviceId = serviceId; }

	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }
}
