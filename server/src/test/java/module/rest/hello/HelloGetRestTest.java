package module.rest.hello;

import javax.ws.rs.core.MediaType;

import org.ap.web.rest.entity.user.UserBean;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.TestData;

public class HelloGetRestTest extends RestTestBase {
	
	public HelloGetRestTest() {
		super("/hello");
	}
	
    /* TEST CASES */
	
    @Test
    public void testV_PlainText() throws Exception {
    	UserBean userAdmin = TestData.getUserFromJson("users_admin.json");
        String responseMsg = prepare("", userAdmin.getName(), userAdmin.getPassword()).accept(MediaType.TEXT_PLAIN).get(String.class);
        TestCase.assertEquals("Hello World", responseMsg);
    }
}
