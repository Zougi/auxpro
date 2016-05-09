package org.ap.web.service;

import org.ap.web.internal.EConfigProperties;
import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class MongoConnection implements IMongoConnection {

	/* STATIC */
	
	private static MongoConnection INSTANCE = Factory.open();
	public static synchronized MongoConnection getInstance() {
		return INSTANCE;
	}
	public static synchronized void reload() {
		INSTANCE = Factory.open();
	}

	/* ATTRIBUTES */

	private MongoClient _client;
	private MongoDatabase _db;

	/* CONSTRUCTOR */
	
	public MongoConnection(MongoClient client, MongoDatabase db) {
		_client = client;
		_db = db;
	}
	private static class Factory {
		public static MongoConnection open() {
			String host = EConfigProperties.DB_HOST.getValue();
			int port = Integer.valueOf(EConfigProperties.DB_PORT.getValue());
			String db = EConfigProperties.DB_NAME.getValue();
			return Factory.open(host, port, db);
		}
		public static MongoConnection open(String host, int port, String db) {
			MongoClient client = new MongoClient(host, port);
			return new MongoConnection(client, client.getDatabase(db));
		}
	}
	
	/* METHODS */
	
	@Override public MongoClient getClient() { return _client; }
	@Override public MongoDatabase getDatabase() { return _db; }
	@Override public MongoCollection<Document> getCollection(String name) { return _db.getCollection(name); }
	@Override public void close() { _client.close(); }
}
