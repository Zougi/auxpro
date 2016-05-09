package module.rest.services;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.ap.web.rest.entity.user.ServiceBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class ServicePutRestTest extends RestTestBase {

	public ServicePutRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */

	@Test
	public void testI_notSameUser() throws Exception {
		Response response = prepare("/" + userSad1.getName(), userAdmin.getName(), userAdmin.getPassword()).put(Entity.entity(MAPPER.writeValueAsString(userSad1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(403, response.getStatus());
	}
	@Test
	public void testI_invalidName() throws Exception {
		Response response = prepare("/dummy", userAdmin.getName(), userAdmin.getPassword()).put(Entity.entity(MAPPER.writeValueAsString(userSad1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(404, response.getStatus());
	}
	@Test
	public void testI_unknownUser() throws Exception {
		Response response = prepare("/myuser", "myuser", "myuser").post(Entity.entity(MAPPER.writeValueAsString(userSad1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(401, response.getStatus());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_update() throws Exception {
		ServiceBean userAux = prepare("/" + userSad1.getName(), userSad1.getName(), userSad1.getPassword()).get(ServiceBean.class);
		AssertHelper.assertService(userSad1, userAux);
		
		userSad1.setSiret("dummy");
		Response response = prepare("/" + userSad1.getName(), userSad1.getName(), userSad1.getPassword()).put(Entity.entity(MAPPER.writeValueAsString(userSad1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(200, response.getStatus());
		
		userAux = prepare("/" + userSad1.getName(), userSad1.getName(), userSad1.getPassword()).get(ServiceBean.class);
		AssertHelper.assertService(userSad1, userAux);
	}
}
