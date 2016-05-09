package org.ap.web.service;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public interface IMongoConnection {

	public MongoClient getClient();
	
	public MongoDatabase getDatabase();
	
	public MongoCollection<Document> getCollection(String name);
	
	public void close();
}
