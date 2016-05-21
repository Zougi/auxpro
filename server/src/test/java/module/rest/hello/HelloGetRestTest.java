package module.rest.hello;

import javax.ws.rs.core.MediaType;

import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class HelloGetRestTest extends RestTestBase {
	
	public HelloGetRestTest() {
		super("/hello");
	}
	
    /* TEST CASES */
	
    @Test
    public void testV_PlainText() throws Exception {
        String responseMsg = prepare("", accountAdmin.getUser()).accept(MediaType.TEXT_PLAIN).get(String.class);
        TestCase.assertEquals("Hello World", responseMsg);
    }
}
