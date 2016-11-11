package org.ap.web.entity.mongo;

import java.time.LocalDate;

import org.ap.web.entity.MongoEntity;
import org.ap.web.entity.constant.EMissionStatus;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class MissionBean extends MongoEntity {

	@MongoId
	private String serviceId;
	@MongoId
	private String customerId;
	@MongoId
	private String interventionId;
	@MongoId
	private String auxiliaryId;
	
	private LocalDate date;

	private EMissionStatus status;
	
	public MissionBean() {}

	public String getServiceId() { return serviceId; }
	public void setServiceId(String serviceId) { this.serviceId = serviceId; }

	public String getCustomerId() { return customerId; }
	public void setCustomerId(String customerId) { this.customerId = customerId; }

	public String getInterventionId() { return interventionId; }
	public void setInterventionId(String interventionId) { this.interventionId = interventionId; }

	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }

	public LocalDate getDate() { return date; }
	public void setDate(LocalDate date) { this.date = date; } 

	public String getStatus() { return status.getId(); }
	public void setStatus(String status) { this.status = EMissionStatus.fromString(status); }
}
