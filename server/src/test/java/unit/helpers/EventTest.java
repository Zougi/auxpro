package unit.helpers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

import org.ap.web.entity.constant.ERecurencePeriod;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.helpers.Event;
import org.junit.Test;

import junit.framework.TestCase;

public class EventTest {

	public InterventionBean getInterventionOne_1() {
		InterventionBean bean = new InterventionBean();
		bean.setStartDate(LocalDate.of(2016, 11, 5));
		bean.setStartTime(LocalTime.of(8, 0));
		bean.setEndTime(LocalTime.of(12, 0));
		bean.setPeriod(ERecurencePeriod.ONE.getId());
		return bean;
	}
	
	public InterventionBean getInterventionOne_2() {
		InterventionBean bean = new InterventionBean();
		bean.setStartDate(LocalDate.of(2016, 11, 5));
		bean.setStartTime(LocalTime.of(12, 0));
		bean.setEndTime(LocalTime.of(13, 0));
		bean.setPeriod(ERecurencePeriod.ONE.getId());
		return bean;
	}
	
	public InterventionBean getInterventionOne_3() {
		InterventionBean bean = new InterventionBean();
		bean.setStartDate(LocalDate.of(2016, 11, 5));
		bean.setStartTime(LocalTime.of(11, 0));
		bean.setEndTime(LocalTime.of(13, 0));
		bean.setPeriod(ERecurencePeriod.ONE.getId());
		return bean;
	}
	public InterventionBean getInterventionOne_4() {
		InterventionBean bean = new InterventionBean();
		bean.setStartDate(LocalDate.of(2016, 12, 5));
		bean.setStartTime(LocalTime.of(11, 0));
		bean.setEndTime(LocalTime.of(13, 0));
		bean.setPeriod(ERecurencePeriod.ONE.getId());
		return bean;
	}
	
	public InterventionBean getInterventionP1W_1() {
		InterventionBean bean = new InterventionBean();
		bean.setStartDate(LocalDate.of(2016, 10, 5));
		bean.setEndDate(LocalDate.of(2016, 12, 5));
		bean.setStartTime(LocalTime.of(7, 0));
		bean.setEndTime(LocalTime.of(13, 0));
		bean.setPeriod(ERecurencePeriod.P1W.getId());
		bean.setDays(new DayOfWeek[] {DayOfWeek.SATURDAY});
		return bean;
	}
	
	public InterventionBean getInterventionP1W_2() {
		InterventionBean bean = new InterventionBean();
		bean.setStartDate(LocalDate.of(2016, 10, 5));
		bean.setEndDate(LocalDate.of(2016, 12, 5));
		bean.setStartTime(LocalTime.of(7, 0));
		bean.setEndTime(LocalTime.of(13, 0));
		bean.setPeriod(ERecurencePeriod.P1W.getId());
		bean.setDays(new DayOfWeek[] {DayOfWeek.MONDAY});
		return bean;
	}
	
	public InterventionBean getInterventionP2W() {
		InterventionBean bean = new InterventionBean();
		bean.setStartDate(LocalDate.of(2016, 10, 31));
		bean.setEndDate(LocalDate.of(2016, 12, 11));
		bean.setStartTime(LocalTime.of(9, 0));
		bean.setEndTime(LocalTime.of(11, 0));
		bean.setPeriod(ERecurencePeriod.P2W.getId());
		bean.setDays(new DayOfWeek[] {DayOfWeek.TUESDAY});
		return bean;
	}
	
	public MissionBean getMission() {
		MissionBean bean = new MissionBean();
		bean.setDate(LocalDate.of(2016, 11, 5));
		return bean;
	}
	
	@Test
	public void testV_buildMissionEvents() {
		Event[] events = Event.buildEvents(getMission(), getInterventionOne_1());
		TestCase.assertEquals(1, events.length);
		TestCase.assertEquals(LocalDate.of(2016, 11, 5), events[0].date);
		TestCase.assertEquals(LocalTime.of(8, 0), events[0].start);
		TestCase.assertEquals(LocalTime.of(12, 0), events[0].end);
	}
	
	@Test
	public void testV_buildInterventionOneEvents() {
		Event[] events = Event.buildEvents(getInterventionOne_1());
		TestCase.assertEquals(1, events.length);
		TestCase.assertEquals(LocalDate.of(2016, 11, 5), events[0].date);
		TestCase.assertEquals(LocalTime.of(8, 0), events[0].start);
		TestCase.assertEquals(LocalTime.of(12, 0), events[0].end);
	}
	
	@Test
	public void testV_buildInterventionPW1Events() {
		Event[] events = Event.buildEvents(getInterventionP1W_1());
		for (Event e : events) {
			System.out.println(e.date);
			System.out.println(e.date.getDayOfWeek());
		}
		TestCase.assertEquals(9, events.length);
		TestCase.assertEquals(LocalDate.of(2016, 10, 8), events[0].date);
		TestCase.assertEquals(LocalTime.of(7, 0), events[0].start);
		TestCase.assertEquals(LocalTime.of(13, 0), events[0].end);
	}
	
	@Test
	public void testV_buildInterventionPW2Events() {
		Event[] events = Event.buildEvents(getInterventionP2W());
		for (Event e : events) {
			System.out.println(e.date);
			System.out.println(e.date.getDayOfWeek());
		}
		TestCase.assertEquals(3, events.length);
		TestCase.assertEquals(LocalDate.of(2016, 11, 1), events[0].date);
		TestCase.assertEquals(LocalTime.of(9, 0), events[0].start);
		TestCase.assertEquals(LocalTime.of(11, 0), events[0].end);
	}
	
	@Test
	public void testV_missionsOverlap() {
		Event[] missionEvents = Event.buildEvents(getMission(), getInterventionOne_1());
		Event[] interventionEvents = Event.buildEvents(getInterventionOne_1());
		TestCase.assertTrue(Event.hasOverlap(missionEvents, interventionEvents));
		interventionEvents = Event.buildEvents(getInterventionOne_2());
		TestCase.assertFalse(Event.hasOverlap(missionEvents, interventionEvents));
		interventionEvents = Event.buildEvents(getInterventionOne_3());
		TestCase.assertTrue(Event.hasOverlap(missionEvents, interventionEvents));
		interventionEvents = Event.buildEvents(getInterventionOne_4());
		TestCase.assertFalse(Event.hasOverlap(missionEvents, interventionEvents));
		interventionEvents = Event.buildEvents(getInterventionP1W_1());
		TestCase.assertTrue(Event.hasOverlap(missionEvents, interventionEvents));
		interventionEvents = Event.buildEvents(getInterventionP1W_2());
		TestCase.assertFalse(Event.hasOverlap(missionEvents, interventionEvents));
	}
}