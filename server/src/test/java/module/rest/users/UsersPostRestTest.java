package module.rest.users;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.ap.web.internal.APException;
import org.ap.web.rest.entity.user.UserBean;
import org.ap.web.rest.servlet.users.UsersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestData;

public class UsersPostRestTest extends RestTestBase {

	public UsersPostRestTest() {
		super(UsersServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
	
	@Test
	public void testI_postUsers_restrictedUser() throws Exception {
		UserBean userAux1 = TestData.getAuxiliaryFromJson("users_aux1.json");
		UserBean bean = TestData.getNextUser();
		Response response = prepare("", userAux1.getName(), userAux1.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(403, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testI_postUsers_sameName() throws Exception {
		UserBean userAdmin = TestData.getUserFromJson("users_admin.json");
		UserBean bean = TestData.getNextUser();
		UserBean bean2 = TestData.getNextUser();
		bean2.setName(bean.getName());
		prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON));
		Response response = prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean2), MediaType.APPLICATION_JSON));
		AssertHelper.assertException(APException.USER_NAME_INUSE, response);
	}
	@Test
	public void testI_postUsers_sameEmail() throws Exception {
		UserBean userAdmin = TestData.getUserFromJson("users_admin.json");
		UserBean bean = TestData.getNextUser();
		UserBean bean2 = TestData.getNextUser();
		bean2.setEmail(bean.getEmail());
		prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON));
		Response response = prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean2), MediaType.APPLICATION_JSON));
		AssertHelper.assertException(APException.USER_EMAIL_INUSE, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_postUsers() throws Exception {
		UserBean userAdmin = TestData.getUserFromJson("users_admin.json");
		UserBean bean = TestData.getNextUser();
		UserBean response = prepare("", userAdmin.getName(), userAdmin.getPassword()).post(Entity.entity(MAPPER.writeValueAsString(bean), MediaType.APPLICATION_JSON), UserBean.class);
		TestCase.assertEquals(bean.getName(), response.getName());
		TestCase.assertEquals(bean.getEmail(), response.getEmail());
		TestCase.assertEquals(bean.getActive(), response.getActive());
		TestCase.assertEquals(bean.getType(), response.getType());
		TestCase.assertNull(response.getPassword());
	}
}
