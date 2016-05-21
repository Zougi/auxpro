package org.ap.web.service;

import org.ap.web.service.Mongo;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;

import static com.mongodb.client.model.Filters.*;

public class MongoService {

	/* ATTRIBUTES */

	private MongoCollection<Document> _collection;
	
	/* CONSTRUCTOR */

	public MongoService(EMongoCollection collection) { 
		_collection = Mongo.collection(collection); 
	}

	/* METHODS */
	
	public MongoCollection<Document> getCollection() {
		return _collection;
	}
	
	public Document findOne(String prop, String value) {
		return findOne(eq(prop, value));
	}
	public Document findOne(Bson bson) {
		return findAll(bson).first();
	}
	public FindIterable<Document> findAll(Bson bson) {
		return _collection.find(bson);
	}
	public FindIterable<Document> find() {
		return _collection.find();
	}
	public Document create(Document doc) {
		_collection.insertOne(doc);
		return doc;
	}
	public Document update(Document doc) {
		return _collection.findOneAndUpdate(eq("_id", doc.get("_id")), new Document("$set", doc));
	}
	public Document deleteOne(String id) {
		return _collection.findOneAndDelete(eq("_id", new ObjectId(id)));
	}
}
