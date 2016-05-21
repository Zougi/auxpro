package module.rest.auxiliaries;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.internal.Mappers;
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
		Response response = prepare("/" + auxiliary1.getUser().getName(), accountAdmin.getUser()).put(Entity.entity(Mappers.DEFAULT.getMapper().writeValueAsString(auxiliary1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(403, response.getStatus());
	}
	@Test
	public void testI_invalidName() throws Exception {
		Response response = prepare("/dummy", accountAdmin.getUser()).put(Entity.entity(Mappers.DEFAULT.getMapper().writeValueAsString(accountAdmin), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(403, response.getStatus());
	}
	@Test
	public void testI_unknownUser() throws Exception {
		Response response = prepare("/myuser", "myuser", "myuser").post(Entity.entity(Mappers.DEFAULT.getMapper().writeValueAsString(auxiliary1), MediaType.APPLICATION_JSON));
		TestCase.assertEquals(401, response.getStatus());
	}


	/* Positive Testing */

	@Test
	public void testV_update() throws Exception {
		try {
			AuxiliaryBean userAux = prepare("/" + auxiliary1.getId(), auxiliary1.getUser()).get(AuxiliaryBean.class);
			AssertHelper.assertAuxiliary(auxiliary1, userAux);

			auxiliary1.setDiploma("dummy");
			Response response = prepare("/" + auxiliary1.getId(), auxiliary1.getUser()).put(Entity.entity(Mappers.DEFAULT.getMapper().writeValueAsString(auxiliary1), MediaType.APPLICATION_JSON));
			TestCase.assertEquals(200, response.getStatus());

			userAux = prepare("/" + auxiliary1.getId(), auxiliary1.getUser()).get(AuxiliaryBean.class);
			AssertHelper.assertAuxiliary(auxiliary1, userAux);
		} catch (Exception e) {
			throw e;
		}
	}
}
