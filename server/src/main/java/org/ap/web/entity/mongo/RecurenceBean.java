package org.ap.web.entity.mongo;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;

public class RecurenceBean {
	
	private LocalDate startDate;
	private LocalDate endDate;
	
	private LocalTime startTime;
	private LocalTime endTime;
	
	private DayOfWeek[] days;
	
	private Period period;

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

	public Period getPeriod() { return period; }
	public void setPeriod(Period period) { this.period = period; }
}
