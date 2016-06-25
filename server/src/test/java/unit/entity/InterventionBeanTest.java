package unit.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.ap.web.entity.BeanConverter;
import org.junit.Test;

public class InterventionBeanTest {

	@Test
	public void testV_LocaleDateTime() throws Exception {
		LocalDateTime t = LocalDateTime.parse("2016-06-26T23:00");
		System.out.println(t);
		String s = BeanConverter.beanToString(t);
		System.out.println(s);
		LocalDateTime tc = BeanConverter.stringToBean(s, LocalDateTime.class);		
		System.out.println(tc);
	}	
	@Test
	public void testV_LocaleDate() throws Exception {
		LocalDate t = LocalDate.parse("2016-03-01");
		System.out.println(t);
		String s = BeanConverter.beanToString(t);
		System.out.println(s);
		LocalDate tc = BeanConverter.stringToBean(s, LocalDate.class);		
		System.out.println(tc);
	}
	@Test
	public void testV_LocaleTime() throws Exception {
		LocalTime t = LocalTime.of(14, 0);
		System.out.println(t);
		String s = BeanConverter.beanToString(t);
		System.out.println(s);
		LocalTime tc = BeanConverter.stringToBean(s, LocalTime.class);		
		System.out.println(tc);
	}
}
