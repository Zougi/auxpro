package org.ap.web.entity.mongo;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

import org.ap.web.entity.MongoEntity;
import org.ap.web.entity.constant.ERecurencePeriod;
import org.ap.web.internal.annotation.MongoId;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"_id"})
public class IndisponibilityBean extends MongoEntity {

	@MongoId
	private String auxiliaryId;

	private ERecurencePeriod period = ERecurencePeriod.ONE;

	private LocalDate startDate;
	private LocalDate endDate;

	private LocalTime startTime;
	private LocalTime endTime;

	private DayOfWeek[] days;

	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }

	public String getPeriod() { return period.getId(); }
	public void setPeriod(String period) { this.period = ERecurencePeriod.fromString(period); }

	public LocalDate getStartDate() { return startDate; }
	public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

	public LocalDate getEndDate() { 
		if (period.equals(ERecurencePeriod.ONE)) {
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
		if (period.equals(ERecurencePeriod.ONE)) {
			return new DayOfWeek[0]; 
		}
		return days;
	}
	public void setDays(DayOfWeek[] days) { this.days = days; }	
}
