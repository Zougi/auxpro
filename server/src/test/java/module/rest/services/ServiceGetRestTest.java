package module.rest.services;

import javax.ws.rs.core.Response;

import org.ap.web.rest.entity.user.ServiceBean;
import org.ap.web.rest.entity.user.UserBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestData;

public class ServiceGetRestTest extends RestTestBase {

	public ServiceGetRestTest() {
		super(ServicesServlet.PATH);
	}

	/* TEST CASES */

	/* Negative Testing */

	// users/{userId} GET
	@Test
	public void testI_getUnknownService() throws Exception {
		UserBean userAdmin = TestData.getUserFromJson("users_admin.json");
		Response rsp = prepare("/dummy", userAdmin.getName(), userAdmin.getPassword()).get();
		TestCase.assertEquals(404, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testI_asUnknownUser() throws Exception {
		UserBean userSad1 = TestData.getServiceFromJson("users_sad1.json");
		Response rsp = prepare("/" + userSad1.getName(), "dummy", "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_invalidPassword() throws Exception {
		UserBean userSad1 = TestData.getServiceFromJson("users_sad1.json");
		Response rsp = prepare("/" + userSad1.getName(), userSad1.getName(), "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}

	/* Positive Testing */

	// users/{userId} GET
	@Test
	public void testV_getServiceResponse() throws Exception {
		UserBean userAdmin = TestData.getUserFromJson("users_admin.json");
		ServiceBean userSad1 = TestData.getServiceFromJson("users_sad1.json");
		Response rsp = prepare("/" + userSad1.getName(), userAdmin.getName(), userAdmin.getPassword()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asAdmin() throws Exception {
		UserBean userAdmin = TestData.getUserFromJson("users_admin.json");
		ServiceBean userSad1 = TestData.getServiceFromJson("users_sad1.json");
		ServiceBean userSad = prepare("/" + userSad1.getName(), userAdmin.getName(), userAdmin.getPassword()).get(ServiceBean.class);
		AssertHelper.assertService(userSad1, userSad);
	}
	@Test
	public void testV_asSelf() throws Exception {
		ServiceBean userSad1 = TestData.getServiceFromJson("users_sad1.json");
		ServiceBean userSad = prepare("/" + userSad1.getName(), userSad1.getName(), userSad1.getPassword()).get(ServiceBean.class);
		AssertHelper.assertService(userSad1, userSad);
	}
	@Test
	public void testV_asOther() throws Exception {
		ServiceBean userSad1 = TestData.getServiceFromJson("users_sad1.json");
		ServiceBean userSad2 = TestData.getServiceFromJson("users_sad2.json");
		ServiceBean userSad = prepare("/" + userSad1.getName(), userSad2.getName(), userSad2.getPassword()).get(ServiceBean.class);
		// Informations are private
		userSad1.setName(null);
		userSad1.setPassword(null);
		userSad1.setEmail(null);
		userSad1.setActive(false);
		userSad1.setTutoSkipped(false);
		AssertHelper.assertService(userSad1, userSad);
	}
}
