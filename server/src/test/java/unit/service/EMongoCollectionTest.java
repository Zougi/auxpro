package unit.service;

import org.ap.web.service.EMongoCollection;
import org.junit.Test;

import junit.framework.TestCase;

public class EMongoCollectionTest {

	/* TEST CASES */
	
	@Test
	public void testV_checkCollectionsName() {
		TestCase.assertEquals(EMongoCollection.AUXILIARIES.getName(), "auxiliaries");
		TestCase.assertEquals(EMongoCollection.CUSTOMERS.getName(), "customers");
		TestCase.assertEquals(EMongoCollection.INTERVENTIONS.getName(), "interventions");
		TestCase.assertEquals(EMongoCollection.MISSIONS_AFFECTED.getName(), "missions.affected");
		TestCase.assertEquals(EMongoCollection.MISSIONS_OFFERS.getName(), "missions.offers");
		TestCase.assertEquals(EMongoCollection.TOKENS.getName(), "tokens");
		TestCase.assertEquals(EMongoCollection.SERVICES.getName(), "services");
	}
}
