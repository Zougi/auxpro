package module.rest.services;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class ServiceGetRestTest extends RestTestBase {

	public ServiceGetRestTest() {
		super(ServicesServlet.PATH);
	}

	public String getBaseUrl() {
		return "/" + service1.getId();
	}
	
	/* TEST CASES */

	/* Negative Testing */

	@Test
	public void testI_getUnknownService() throws Exception {
		Response response = prepare("/" + StringConverter.stringToHex("dummy"), accountAdmin.getUser()).get();
		AssertHelper.assertException(APException.SERVICE_NOT_FOUND, response);
	}
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response rsp = prepare(getBaseUrl(), "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_invalidPassword() throws Exception {
		Response rsp = prepare(getBaseUrl(), service1.getUser().getName(), "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}

	/* Positive Testing */

	@Test
	public void testV_getServiceResponse() throws Exception {
		Response rsp = prepare(getBaseUrl(), accountAdmin.getUser()).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asAdmin() throws Exception {
		ServiceBean service = prepare(getBaseUrl(), accountAdmin.getUser()).get(ServiceBean.class);
		AssertHelper.assertService(service1, service);
	}
	@Test
	public void testV_asSelf() throws Exception {
		ServiceBean service = prepare(getBaseUrl(), service1.getUser()).get(ServiceBean.class);
		AssertHelper.assertService(service1, service);
	}
	@Test
	public void testV_asOther() throws Exception {
		ServiceBean service = prepare(getBaseUrl(), service2.getUser()).get(ServiceBean.class);
		// Informations are private
		service1.getUser().setName(null);
		service1.getUser().setPassword(null);
		service1.getUser().setEmail(null);
		service1.getUser().setProfileActive(false);
		service1.getUser().setTutoSkipped(false);
		AssertHelper.assertService(service1, service);
	}
}
