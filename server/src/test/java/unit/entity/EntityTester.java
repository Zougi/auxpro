package unit.entity;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;

import org.ap.web.entity.mongo.RecurenceBean;
import org.ap.web.internal.Mappers;
import org.junit.Test;

import tools.TestBase;

public class EntityTester extends TestBase {

	@Test
	public void test_printAdmin() throws Exception {
		String s = Mappers.DEFAULT.getMapper().writeValueAsString(userAdmin);
		s = s.replace(",", ",\n");
		System.out.println(s);
	}
	@Test
	public void test_printAux1() throws Exception {
		String s = Mappers.DEFAULT.getMapper().writeValueAsString(auxiliaryA);
		s = s.replace(",", ",\n");
		System.out.println(s);
	}
	@Test
	public void test_printAux2() throws Exception {
		String s = Mappers.DEFAULT.getMapper().writeValueAsString(auxiliaryB);
		s = s.replace(",", ",\n");
		System.out.println(s);
	}
	@Test
	public void test_printSad1() throws Exception {
		String s = Mappers.DEFAULT.getMapper().writeValueAsString(service1);
		s = s.replace(",", ",\n");
		System.out.println(s);
	}
	
	@Test
	public void test_printRecurence() throws Exception {
		RecurenceBean bean = new RecurenceBean();
		bean.setStartDate(LocalDate.of(2016, 07, 02));
		bean.setEndDate(LocalDate.of(2016, 07, 28));
		bean.setDays(new DayOfWeek[] {DayOfWeek.FRIDAY, DayOfWeek.MONDAY});
		bean.setStartTime(LocalTime.of(8, 30));
		bean.setEndTime(LocalTime.of(12, 00));
		String s = Mappers.DEFAULT.getMapper().writeValueAsString(bean);
		s = s.replace(",\"", ",\n\"");
		System.out.println(s);
		
		System.out.println(Mappers.DEFAULT.getMapper().writeValueAsString(Period.ofWeeks(2)));		
	}
}

