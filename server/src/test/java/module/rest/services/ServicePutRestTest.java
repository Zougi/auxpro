package module.rest.services;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class ServicePutRestTest extends RestTestBase {

	public ServicePutRestTest() {
		super(ServicesServlet.PATH);
	}
	
	public String getBaseUrl() {
		return "/" + service1.getId();
	}
	
	/* TEST CASES */
	
	/* Negative Testing */

	@Test
	public void testI_unknownUser() throws Exception {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").post(write(service1));
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
	}
	@Test
	public void testI_notSameUser() throws Exception {
		Response response = prepare(getBaseUrl(), userSadY).put(write(service1));
		AssertHelper.assertException(APException.SERVICE_NOT_FOUND, response);
	}
	@Test
	public void testI_invalidName() throws Exception {
		Response response = prepare("/dummy", userSadZ).put(write(service1));
		AssertHelper.assertException(APException.SERVICE_NOT_FOUND, response);
	}
	@Test
	public void testI_invalidService() throws Exception {
		Response response = prepare(getBaseUrl(), userSadZ).put(write(service2));
		AssertHelper.assertException(APException.SERVICE_INVALID, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_update() throws Exception {
		ServiceBean userAux = prepare(getBaseUrl(), userSadZ).get(ServiceBean.class);
		AssertHelper.assertService(service1, userAux);
		
		service1.setSiret("dummy");
		Response response = prepare(getBaseUrl(), userSadZ).put(write(service1));
		TestCase.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		
		userAux = prepare(getBaseUrl(), userSadZ).get(ServiceBean.class);
		AssertHelper.assertService(service1, userAux);
	}
}
