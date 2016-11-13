package org.ap.web.helpers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.ap.web.entity.constant.ERecurencePeriod;
import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.MissionBean;

public class Event {

	public LocalDate date;
	public LocalTime start;
	public LocalTime end;
	
	public Event() {
		
	}
	
	public Event(LocalDate date, LocalTime start, LocalTime end) {
		this.date = date;
		this.start = start;
		this.end = end;
	}
	
	public static Event[] buildEvents(IndisponibilityBean indisponibility) {
		ERecurencePeriod period = ERecurencePeriod.fromString(indisponibility.getPeriod());
		switch (period) {
		case ONE:
			return new Event[] { new Event(indisponibility.getStartDate(), indisponibility.getStartTime(), indisponibility.getEndTime()) };
		case P1W:
		case P2W:
		case P3W:
		case P4W:
			List<Event> result = new ArrayList<Event>();
			List<DayOfWeek> days = Arrays.asList(indisponibility.getDays());
			LocalDate startDate = indisponibility.getStartDate();
			LocalDate endDate = indisponibility.getEndDate();
			LocalDate currentDate = startDate.plusDays(0);
			while (!currentDate.isAfter(endDate)) {
				if (days.contains(currentDate.getDayOfWeek())) {
					result.add(new Event(currentDate, indisponibility.getStartTime(), indisponibility.getEndTime()));
				}
				currentDate = currentDate.plusDays(1);
			}
			return result.toArray(new Event[result.size()]);
		default:
			return new Event[0];
		}
	}
	
	public static Event[] buildEvents(InterventionBean intervention) {
		ERecurencePeriod period = ERecurencePeriod.fromString(intervention.getPeriod());
		switch (period) {
		case ONE:
			return new Event[] { new Event(intervention.getStartDate(), intervention.getStartTime(), intervention.getEndTime()) };
		case P1W:
		case P2W:
		case P3W:
		case P4W:
			List<Event> result = new ArrayList<Event>();
			List<DayOfWeek> days = Arrays.asList(intervention.getDays());
			LocalDate startDate = intervention.getStartDate();
			LocalDate endDate = intervention.getEndDate();
			LocalDate currentDate = startDate.plusDays(0);
			while (!currentDate.isAfter(endDate)) {
				if (days.contains(currentDate.getDayOfWeek())) {
					result.add(new Event(currentDate, intervention.getStartTime(), intervention.getEndTime()));
				}
				currentDate = currentDate.plusDays(1);
				if (currentDate.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
					currentDate = currentDate.plusDays(period.getJumpPeriod().getDays());
				}
			}
			return result.toArray(new Event[result.size()]);
		default:
			return new Event[0];
		}
	}
	
	public static Event[] buildEvents(MissionBean mission, InterventionBean intervention) {
		return new Event[] { new Event(mission.getDate(), intervention.getStartTime(), intervention.getEndTime()) };
	}
	
	public static boolean hasOverlap(Event[] events1, Event[] events2) {
		for (Event e1 : events1) {
			for (Event e2 : events2) {
				if (e1.date.isEqual(e2.date)) {
					if (e1.start.isBefore(e2.end) && e1.end.isAfter(e2.start)) {
						return true;
					}
				}
			}
		}
		return false;
	}
}
