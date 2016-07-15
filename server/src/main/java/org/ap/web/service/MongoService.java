package org.ap.web.service;

import org.ap.web.service.Mongo;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;

import static com.mongodb.client.model.Filters.*;

import java.util.Map;

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
	public Document findOne(Bson bson, Bson projection) {
		return findAll(bson, projection).first();
	}
	public FindIterable<Document> findAll(String prop, String value) {
		return findAll(eq(prop, value));
	}
	public FindIterable<Document> findAll(Bson bson) {
		return _collection.find(bson);
	}
	public FindIterable<Document> findAll(Bson bson, Bson projection) {
		return _collection.find(bson).projection(projection);
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
	public Document push(String id, String field, Document doc) {
		return _collection.findOneAndUpdate(eq("_id", new ObjectId(id)), new Document("$push", new Document(field, doc)));
	}
	public Document deleteOne(String id) {
		return _collection.findOneAndDelete(eq("_id", new ObjectId(id)));
	}
	public Document deleteFromArray(String id, Map<String, String> matchingfields) {
		Document document = new Document("_id", id);
		Document listMatchKeys = new Document();
		for (Map.Entry<String, String> entry : matchingfields.entrySet()){
			listMatchKeys.append(entry.getKey(), entry.getValue());
		}
		Document test = new Document("geoZones", listMatchKeys);
		Document result = _collection.findOneAndUpdate(document, new Document("$pull", test));
		return result;
	}
}
