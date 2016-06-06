package org.ap.web.entity.mongo;

import java.util.Date;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class MissionBean extends MongoEntity {
	
	private Date startHour;
	private Date endHour;
	
	private ContactBean contact;
	
	@MongoId
	private String customerId;
	@MongoId
	private String serviceId;
	@MongoId
	private String auxiliaryId;
	
	public MissionBean() {}
	
	public Date getStartHour() { return startHour; }
	public void setStartHour(Date startHour) { this.startHour = startHour; }
	
	public Date getEndHour() { return endHour; }
	public void setEndHour(Date endHour) { this.endHour = endHour; }

	public ContactBean getContact() { return contact; }
	public void setContact(ContactBean contact) { this.contact = contact; }

	public String getCustomerId() { return customerId; }
	public void setCustomerId(String customerId) { this.customerId = customerId; }

	public String getServiceId() { return serviceId; }
	public void setServiceId(String serviceId) { this.serviceId = serviceId; }

	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }
}
