package module.rest.auxiliaries;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestData;

public class AuxiliaryAbsencesPostRestTest extends RestTestBase {

	public String getUrl(String id) {
		return "/" + id + "/absences";
	}
	
	public AuxiliaryAbsencesPostRestTest() {
		super(AuxiliariesServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */

	@Test
	public void testI_unauthorized() throws Exception {
		Response response = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser().getName(), "dummy").post(write(absenceAux11));
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testI_asAdmin() throws Exception {
		Response response = prepare(getUrl(auxiliary1.getId()), accountAdmin.getUser()).post(write(absenceAux11));
		TestCase.assertEquals(Status.FORBIDDEN.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_response() throws Exception {
		AbsenceBean bean = TestData.next(new AbsenceBean());
		Response response = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser()).post(write(bean));
		TestCase.assertEquals(Status.CREATED.getStatusCode(), response.getStatus());
		TestCase.assertTrue(response.hasEntity());
	}
	@Test
	public void testV_createOne() throws Exception {
		AbsenceBean[] beans1 = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser()).get(AbsenceBean[].class);
		
		AbsenceBean bean1 = TestData.next(new AbsenceBean());
		bean1.setAuxiliaryId(auxiliary1.getId());
		
		AbsenceBean bean = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser()).post(write(bean1), AbsenceBean.class);
		AssertHelper.assertAbsence(bean1, bean);
		
		AbsenceBean[] beans2 = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser()).get(AbsenceBean[].class);
		TestCase.assertEquals(beans1.length + 1, beans2.length);
	}
	@Test
	public void testV_createSeverals() throws Exception {
		AbsenceBean[] beans1 = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser()).get(AbsenceBean[].class);
		
		AbsenceBean bean1 = TestData.next(new AbsenceBean());
		bean1.setAuxiliaryId(auxiliary1.getId());
		String s = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser()).post(write(bean1), String.class);
		System.out.println(s);
		
		AbsenceBean bean2 = TestData.next(new AbsenceBean());
		bean2.setAuxiliaryId(auxiliary1.getId());
		s = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser()).post(write(bean2), String.class);
		System.out.println(s);
		
		AbsenceBean[] beans2 = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser()).get(AbsenceBean[].class);
		TestCase.assertEquals(beans1.length + 2, beans2.length);
	}
}
