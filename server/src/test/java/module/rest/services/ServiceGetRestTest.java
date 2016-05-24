package module.rest.services;

import javax.ws.rs.core.Response;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class ServiceGetRestTest extends RestTestBase {

	public ServiceGetRestTest() {
		super(ServicesServlet.PATH);
	}

	/* TEST CASES */

	/* Negative Testing */

	@Test
	public void testI_getUnknownService() throws Exception {
		Response rsp = prepare("/" + StringConverter.stringToHex("dummy"), accountAdmin.getUser()).get();
		TestCase.assertEquals(404, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response rsp = prepare("/" + service1.getId(), "dummy", "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_invalidPassword() throws Exception {
		Response rsp = prepare("/" + service1.getId(), service1.getUser().getName(), "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}

	/* Positive Testing */

	@Test
	public void testV_getServiceResponse() throws Exception {
		Response rsp = prepare("/" + service1.getId(), accountAdmin.getUser()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asAdmin() throws Exception {
		ServiceBean service = prepare("/" + service1.getId(), accountAdmin.getUser()).get(ServiceBean.class);
		AssertHelper.assertService(service1, service);
	}
	@Test
	public void testV_asSelf() throws Exception {
		ServiceBean service = prepare("/" + service1.getId(), service1.getUser()).get(ServiceBean.class);
		AssertHelper.assertService(service1, service);
	}
	@Test
	public void testV_asOther() throws Exception {
		ServiceBean service = prepare("/" + service1.getId(), service2.getUser()).get(ServiceBean.class);
		// Informations are private
		service1.getUser().setName(null);
		service1.getUser().setPassword(null);
		service1.getUser().setEmail(null);
		service1.getUser().setActive(false);
		service1.getUser().setTutoSkipped(false);
		AssertHelper.assertService(service1, service);
	}
}
