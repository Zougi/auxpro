package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.entity.constant.EOfferStatus;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.internal.annotation.MongoObject;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class OfferBean extends MongoEntity {

	@MongoId
	private String serviceId;
	@MongoId
	private String customerId;
	@MongoId
	private String interventionId;
	@MongoId
	private String auxiliaryId;

	private EOfferStatus status;

	private LocalDate creationDate;
	private LocalDate expiryDate;
	
	private boolean hideToAux;
	private boolean hideToSad;
	
	public OfferBean() {}

	public String getServiceId() { return serviceId; }
	public void setServiceId(String serviceId) { this.serviceId = serviceId; }

	public String getCustomerId() { return customerId; }
	public void setCustomerId(String customerId) { this.customerId = customerId; }

	public String getInterventionId() { return interventionId; }
	public void setInterventionId(String interventionId) { this.interventionId = interventionId; }

	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }

	public String getStatus() { return status.getId(); }
	public void setStatus(String status) { this.status = EOfferStatus.fromString(status); } 

	public LocalDate getCreationDate() { return creationDate; }
	public void setCreationDate(LocalDate creationDate) { this.creationDate = creationDate; }

	public LocalDate getExpiryDate() { return expiryDate; }
	public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

	public boolean getHideToAux() { return hideToAux; }
	public void setHideToAux(boolean hideToAux) { this.hideToAux = hideToAux; }

	public boolean getHideToSad() { return hideToSad; }
	public void setHideToSad(boolean hideToSad) { this.hideToSad = hideToSad; }
}
