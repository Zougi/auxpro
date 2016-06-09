package unit.entity;

import java.util.Date;
import java.util.TimeZone;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.internal.Mappers;
import org.junit.Test;

import tools.TestBase;

public class EntityTester extends TestBase {

	@Test
	public void test_printAdmin() throws Exception {
		String s = Mappers.DEFAULT.getMapper().writeValueAsString(accountAdmin);
		s = s.replace(",", ",\n");
		System.out.println(s);
	}
	@Test
	public void test_printAux1() throws Exception {
		String s = Mappers.DEFAULT.getMapper().writeValueAsString(auxiliary1);
		s = s.replace(",", ",\n");
		System.out.println(s);
	}
	@Test
	public void test_printAux2() throws Exception {
		String s = Mappers.DEFAULT.getMapper().writeValueAsString(auxiliary2);
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
	public void test_() throws Exception {
		String data = 
			"{\"startDate\":\"2016-06-08T08:00:00\",\"endDate\":\"2016-06-08T20:00:00\",\"auxiliaryId\":\"auxa\"}" ;
		Date d = new Date();
		System.out.println(d.toString());
		System.out.println(Mappers.LOCAL.getMapper().readValue(data, AbsenceBean.class).getStartDate());
	}
}
