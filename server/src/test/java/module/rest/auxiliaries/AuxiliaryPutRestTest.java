package module.rest.auxiliaries;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.ap.web.rest.entity.user.AuxiliaryBean;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class AuxiliaryPutRestTest extends RestTestBase {

	public AuxiliaryPutRestTest() {
		super(AuxiliariesServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */

	@Test
	public void testI_notSameUser() throws Exception {
		Response response = prepare("/" + userAux1.getName(), userAdmin.getName(), userAdmin.getPassword()).put(Entity.entity(MAPPER.writeValueAsString(userAux1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(403, response.getStatus());
	}
	@Test
	public void testI_invalidName() throws Exception {
		Response response = prepare("/dummy", userAdmin.getName(), userAdmin.getPassword()).put(Entity.entity(MAPPER.writeValueAsString(userAdmin), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(404, response.getStatus());
	}
	@Test
	public void testI_unknownUser() throws Exception {
		Response response = prepare("/myuser", "myuser", "myuser").post(Entity.entity(MAPPER.writeValueAsString(userAux1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(401, response.getStatus());
	}
	
	
	/* Positive Testing */
	
	@Test
	public void testV_update() throws Exception {
		AuxiliaryBean userAux = prepare("/" + userAux1.getName(), userAux1.getName(), userAux1.getPassword()).get(AuxiliaryBean.class);
		AssertHelper.assertAuxiliary(userAux1, userAux);
		
		userAux1.setBirthPlace("dummy");
		Response response = prepare("/" + userAux1.getName(), userAux1.getName(), userAux1.getPassword()).put(Entity.entity(MAPPER.writeValueAsString(userAux1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(200, response.getStatus());
		
		userAux = prepare("/" + userAux1.getName(), userAux1.getName(), userAux1.getPassword()).get(AuxiliaryBean.class);
		AssertHelper.assertAuxiliary(userAux1, userAux);
	}
}
