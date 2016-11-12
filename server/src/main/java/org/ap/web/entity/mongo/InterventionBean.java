package org.ap.web.entity.mongo;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

import org.ap.web.entity.MongoEntity;
import org.ap.web.entity.constant.ERecurencePeriod;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties(ignoreUnknown = true, value = {"_id"})
public class InterventionBean extends MongoEntity {

	/* ATTRIBUTES */
	
	@MongoId
	private String customerId;
	@MongoId
	private String serviceId;
	@MongoId
	private String auxiliaryId;
	
	private ERecurencePeriod period;
	
	private LocalDate startDate;
	private LocalDate endDate;
	
	private LocalTime startTime;
	private LocalTime endTime;
	
	private DayOfWeek[] days;
	
	/* METHODS */
	
	public String getCustomerId() { return customerId; }
	public void setCustomerId(String customerId) { this.customerId = customerId; }

	public String getServiceId() { return serviceId; }
	public void setServiceId(String serviceId) { this.serviceId = serviceId; }

	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }
	
	public LocalDate getStartDate() { return startDate; }
	public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

	public LocalDate getEndDate() {
		if (ERecurencePeriod.ONE.equals(period)) {
			return null;
		}
		return endDate; 
	}
	public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
	
	public LocalTime getStartTime() { return startTime; }
	public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

	public LocalTime getEndTime() { return endTime; }
	public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

	public DayOfWeek[] getDays() {
		if (ERecurencePeriod.ONE.equals(period)) {
			return null;
		}
		return days; 
	}
	public void setDays(DayOfWeek[] days) { this.days = days; }

	public String getPeriod() { return period.getId(); }
	public void setPeriod(String period) { this.period = ERecurencePeriod.fromString(period); }
}
