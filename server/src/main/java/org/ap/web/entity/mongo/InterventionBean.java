package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class InterventionBean extends MongoEntity {

	@MongoId
	private String customerId;
	@MongoId
	private String serviceId;
	@MongoId
	private String auxiliaryId;
	
	private OneTimeBean oneTime;
	private RecurenceBean recurence;
	
	
	public InterventionBean() {}

	public String getCustomerId() { return customerId; }
	public void setCustomerId(String customerId) { this.customerId = customerId; }

	public String getServiceId() { return serviceId; }
	public void setServiceId(String serviceId) { this.serviceId = serviceId; }

	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }
	
	public OneTimeBean getOneTime() { return oneTime; }
	public void setOneTime(OneTimeBean oneTime) { this.oneTime = oneTime; }
	
	public RecurenceBean getRecurence() { return recurence; }
	public void setRecurence(RecurenceBean recurence) { this.recurence = recurence; }
	

}
