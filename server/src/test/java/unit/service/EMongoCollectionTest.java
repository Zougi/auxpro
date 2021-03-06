package unit.service;

import org.ap.web.service.EMongoCollection;
import org.junit.Test;

import junit.framework.TestCase;

public class EMongoCollectionTest {

	/* TEST CASES */
	
	@Test
	public void testV_checkCollectionsName() {
		TestCase.assertEquals(EMongoCollection.CUSTOMERS.getName(), "customers");
		TestCase.assertEquals(EMongoCollection.AUXILIARIES.getName(), "auxiliaries");
		TestCase.assertEquals(EMongoCollection.INTERVENTIONS.getName(), "interventions");
		TestCase.assertEquals(EMongoCollection.INDISPONIBILITIES.getName(), "indisponibilities");
		TestCase.assertEquals(EMongoCollection.OFFERS.getName(), "offers");
		TestCase.assertEquals(EMongoCollection.TOKENS.getName(), "tokens");
		TestCase.assertEquals(EMongoCollection.SERVICES.getName(), "services");
	}
}
