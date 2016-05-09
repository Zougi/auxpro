package module.rest.services;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.ap.web.internal.APException;
import org.ap.web.rest.entity.user.CredentialsBean;
import org.ap.web.rest.entity.user.ServiceBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestData;

public class ServicePostRestTest extends RestTestBase {

	public ServicePostRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST DATA */
	
	private CredentialsBean bean;
	private CredentialsBean bean2;
	@Before
	public void setUp() {
		bean = TestData.getNextCredentials();
		bean2 = TestData.getNextCredentials();
	}
	
	/* TEST CASES */
	
	/* Negative Testing */

	@Test
	public void testI_sameName() throws Exception {
		bean2.setName(bean.getName());
		prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON));
		Response response = prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean2), MediaType.APPLICATION_JSON));
		AssertHelper.assertException(APException.USER_NAME_INUSE, response);
	}
	@Test
	public void testI_noName() throws Exception {
		bean.setName(null);
		Response response = prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON));
		AssertHelper.assertException(APException.USER_NAME_INVALID, response);
	}
	@Test
	public void testI_invalidName() throws Exception {
		bean.setName("**--//");
		Response response = prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON));
		AssertHelper.assertException(APException.USER_NAME_INVALID, response);
	}
	@Test
	public void testI_sameEmail() throws Exception {
		bean2.setEmail(bean.getEmail());
		prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON));
		Response response = prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean2), MediaType.APPLICATION_JSON));
		AssertHelper.assertException(APException.USER_EMAIL_INUSE, response);
	}
	@Test
	public void testI_noEmail() throws Exception {
		bean.setEmail(null);
		Response response = prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON));
		AssertHelper.assertException(APException.USER_EMAIL_INVALID, response);
	}
	@Test
	public void testI_invalidEmail() throws Exception {
		bean.setEmail("user@user");
		Response response = prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON));
		AssertHelper.assertException(APException.USER_EMAIL_INVALID, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asAdmin() throws Exception {
		ServiceBean response = prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON), ServiceBean.class);
		AssertHelper.assertCredentials(bean, response);
	}
	@Test
	public void testV_asGuest() throws Exception {
		Response response = prepare("", userGuest.getName(), userGuest.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(201, response.getStatus());
	}
}
