package unit.service;

import org.ap.web.service.MongoConnection;
import org.bson.Document;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import junit.framework.TestCase;

public class MongoConnectionTest {

	/* TEST DATA */
	
	private MongoClient _client;
	private MongoDatabase _db;
	private MongoCollection<Document> _coll;
	@SuppressWarnings("unchecked")
	@Before
	public void setUp() {
		_client = Mockito.mock(MongoClient.class);
		_db = Mockito.mock(MongoDatabase.class);
		_coll = Mockito.mock(MongoCollection.class);
		Mockito.when(_db.getCollection("test")).thenReturn(_coll);
	}
	
	/* TEST CASES */

	@Test
	public void testV_ValidConstrutor() {
		MongoConnection conn = new MongoConnection(_client, _db);
		TestCase.assertEquals(_client, conn.getClient());
		TestCase.assertEquals(_db, conn.getDatabase());
		TestCase.assertEquals(_coll, conn.getCollection("test"));
	}
}
