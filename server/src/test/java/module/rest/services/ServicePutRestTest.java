package module.rest.services;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.internal.Mappers;
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
		Response response = prepare("/" + service_1.getId(), accountAdmin.getUser()).put(Entity.entity(Mappers.DEFAULT.getMapper().writeValueAsString(service_1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(403, response.getStatus());
	}
	@Test
	public void testI_invalidName() throws Exception {
		Response response = prepare("/dummy", accountAdmin.getUser()).put(Entity.entity(Mappers.DEFAULT.getMapper().writeValueAsString(service_1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(403, response.getStatus());
	}
	@Test
	public void testI_unknownUser() throws Exception {
		Response response = prepare("/myuser", "myuser", "myuser").post(Entity.entity(Mappers.DEFAULT.getMapper().writeValueAsString(service_1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(401, response.getStatus());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_update() throws Exception {
		ServiceBean userAux = prepare("/" + service_1.getId(), service_1.getUser()).get(ServiceBean.class);
		AssertHelper.assertService(service_1, userAux);
		
		service_1.setSiret("dummy");
		Response response = prepare("/" + service_1.getId(), service_1.getUser()).put(Entity.entity(Mappers.DEFAULT.getMapper().writeValueAsString(service_1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(200, response.getStatus());
		
		userAux = prepare("/" + service_1.getId(), service_1.getUser()).get(ServiceBean.class);
		AssertHelper.assertService(service_1, userAux);
	}
}
