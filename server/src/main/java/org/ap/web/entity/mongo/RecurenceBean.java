package org.ap.web.entity.mongo;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

import org.ap.web.entity.constant.ERecurencePeriod;

public class RecurenceBean {
	
	private LocalDate startDate;
	private LocalDate endDate;
	
	private LocalTime startTime;
	private LocalTime endTime;
	
	private DayOfWeek[] days;
	
	private ERecurencePeriod period;

	public RecurenceBean() {}
	
	public LocalDate getStartDate() { return startDate; }
	public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

	public LocalDate getEndDate() { return endDate; }
	public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
	
	public LocalTime getStartTime() { return startTime; }
	public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

	public LocalTime getEndTime() { return endTime; }
	public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

	public DayOfWeek[] getDays() { return days; }
	public void setDays(DayOfWeek[] days) { this.days = days; }

	public String getPeriod() { return period.getId(); }
	public void setPeriod(String period) { this.period = ERecurencePeriod.fromString(period); }
}
