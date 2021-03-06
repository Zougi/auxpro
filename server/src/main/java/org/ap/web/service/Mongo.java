package org.ap.web.service;

import org.ap.web.internal.EConfigProperties;
import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class Mongo {

	/* STATIC */
	
	private static MongoClient CLIENT;
	private static MongoDatabase DATABASE;
	
	public static String DB_NAME;
	
	public static synchronized void reload() {
		String host = EConfigProperties.DB_HOST.getValue();
		int port = Integer.valueOf(EConfigProperties.DB_PORT.getValue());
		DB_NAME = EConfigProperties.DB_NAME.getValue();
		System.err.println("INFOS: Creating connection to " + host + ":" + port + " - " + DB_NAME);
		CLIENT = new MongoClient(host, port);
		DATABASE = CLIENT.getDatabase(DB_NAME);
	}
	
	/* METHODS */

	public static MongoClient client() { return CLIENT; }
	public static MongoDatabase database() { return DATABASE; }
	public static MongoCollection<Document> collection(String name) { return DATABASE.getCollection(name); }
	public static MongoCollection<Document> collection(EMongoCollection collection) { return DATABASE.getCollection(collection.getName()); }
}
