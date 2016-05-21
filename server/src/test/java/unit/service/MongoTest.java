package unit.service;

import org.ap.web.service.Mongo;
import org.junit.Test;

import junit.framework.TestCase;

public class MongoTest {

	@Test
	public void testV_checkTestDatabase() {
		TestCase.assertEquals("127.0.0.1", Mongo.client().getAddress().getHost());
		TestCase.assertEquals(4242, Mongo.client().getAddress().getPort());
		TestCase.assertEquals("db-test", Mongo.database().getName());
	}
}
