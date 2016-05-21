package module.rest.services;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.Response;

import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class ServicesGetRestTest extends RestTestBase {

	public ServicesGetRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() {
		Response response = prepare("", "dummy", "dummy").get();
		TestCase.assertEquals(401, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asAdmin_checkStatus() throws Exception {
		Response rsp = prepare("", accountAdmin.getUser()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asAdmin_withFilter() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("postal", 31000);
		ServiceBean[] rsp = prepare("", params, accountAdmin.getUser()).get(ServiceBean[].class);
		TestCase.assertEquals(1, rsp.length);
	}
}
