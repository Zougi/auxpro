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

public class IndiosponibilityPutRestTest extends RestTestBase {

	public IndiosponibilityPutRestTest() {
		super(IndisponibilitiesServlet.PATH);
	}
	
	/* TEST DATA */
	
	private IndisponibilityBean next() {
		return TestDataGenerator.next(new IndisponibilityBean()); 
	}
	private String getBaseUrl() {
		return "/" + indisponibility1.getId();
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").put(write(next()));
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testV_notOwner() throws Exception {
		IndisponibilityBean expected = next();
		expected.setAuxiliaryId(auxiliaryB.getId());
		Response response = prepare(getBaseUrl(), userAuxA).put(write(expected));	
		AssertHelper.assertException(APException.INDISPONIBILITY_NOT_FOUND, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_putValid() throws Exception {
		IndisponibilityBean expected = next();
		expected.setId(indisponibility1.getId());
		expected.setAuxiliaryId(auxiliaryA.getId());
		IndisponibilityBean actual = prepare(getBaseUrl(), userAuxA).put(write(expected), IndisponibilityBean.class);	
		AssertHelper.assertIndisponibility(expected, actual);
	}
}
