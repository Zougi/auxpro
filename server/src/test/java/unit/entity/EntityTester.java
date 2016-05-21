package unit.entity;

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
		String s = Mappers.DEFAULT.getMapper().writeValueAsString(service_1);
		s = s.replace(",", ",\n");
		System.out.println(s);
	}
	@Test
	public void test_() throws Exception {
	}
}
