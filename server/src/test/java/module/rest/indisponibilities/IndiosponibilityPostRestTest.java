package module.rest.indisponibilities;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.indisponibilities.IndisponibilitiesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestDataGenerator;

public class IndiosponibilityPostRestTest extends RestTestBase {

	public IndiosponibilityPostRestTest() {
		super(IndisponibilitiesServlet.PATH);
	}
	
	/* TEST DATA */
	
	private IndisponibilityBean next() {
		return TestDataGenerator.next(new IndisponibilityBean()); 
	}
	private String getBaseUrl() {
		return "/";
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_unknownUser() throws Exception {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").post(write(next()));
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testV_notOwner() throws Exception {
		IndisponibilityBean expected = next();
		expected.setAuxiliaryId(auxiliaryA.getId());
		Response response = prepare(getBaseUrl(), userAuxB).post(write(expected));	
		AssertHelper.assertException(APException.INDISPONIBILITY_AUXILIARY_INVALID, response);
	}

	/* Positive Testing */
	
	@Test
	public void testV_postValid() throws Exception {
		IndisponibilityBean expected = next();
		expected.setAuxiliaryId(auxiliaryA.getId());
		IndisponibilityBean actual = prepare(getBaseUrl(), userAuxA).post(write(expected), IndisponibilityBean.class);	
		AssertHelper.assertIndisponibility(expected, actual);
	}
}
