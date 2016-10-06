package module.rest.auxiliaries;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class AuxiliaryPutRestTest extends RestTestBase {

	public AuxiliaryPutRestTest() {
		super(AuxiliariesServlet.PATH);
	}

	public String getBaseUrl() {
		return "/" + auxiliary1.getId();
	}
	
	/* TEST CASES */

	/* Negative Testing */

	@Test
	public void testI_asUnknown() throws Exception {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").post(write(auxiliary1));
		TestCase.assertEquals(401, response.getStatus());
	}
	@Test
	public void testI_putUnknown() throws Exception {
		Response response = prepare("/dummy", auxiliary1.getUser()).put(write(auxiliary1));
		AssertHelper.assertException(APException.AUXILIARY_NOT_FOUND, response);
	}
	@Test
	public void testI_notSameUser() throws Exception {
		Response response = prepare(getBaseUrl(), auxiliary2.getUser()).put(write(auxiliary1));
		AssertHelper.assertException(APException.AUXILIARY_NOT_FOUND, response);
	}
	@Test
	public void testI_invalidAuxiliary() throws Exception {
		Response response = prepare(getBaseUrl(), auxiliary1.getUser()).put(write(auxiliary2));
		AssertHelper.assertException(APException.AUXILIARY_INVALID, response);
	}


	/* Positive Testing */

	@Test
	public void testV_update() throws Exception {
		AuxiliaryBean userAux = prepare(getBaseUrl(), auxiliary1.getUser()).get(AuxiliaryBean.class);
		AssertHelper.assertAuxiliary(auxiliary1, userAux);

		auxiliary1.getInfos().setDiploma("dummy");
		Response response = prepare(getBaseUrl(), auxiliary1.getUser()).put(write(auxiliary1));
		TestCase.assertEquals(Status.OK.getStatusCode(), response.getStatus());

		userAux = prepare(getBaseUrl(), auxiliary1.getUser()).get(AuxiliaryBean.class);
		AssertHelper.assertAuxiliary(auxiliary1, userAux);
	}
}
