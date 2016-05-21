package org.ap.web.service.users;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.ap.web.internal.APException;
import org.ap.web.service.MongoConstants;
import org.ap.web.service.Mongo;
import org.bson.Document;

import com.mongodb.Block;
import com.mongodb.client.FindIterable;

import static com.mongodb.client.model.Filters.*;

public class UsersMongoService implements IUsersService {

	/* ATTRIBUTES */

	/* CONSTRUCTOR */

	public UsersMongoService() { }

	/* METHODS */

	// IUsersService Implementation //

	@Override public Document checkUser(String name, String password) throws APException {
		FindIterable<Document> iterable = Mongo.collection("users").find(and(eq("name", name), eq("password", password)));
		Document document = iterable.first();
		if (document == null) {
			throw APException.INVALID_USER;
		} else {
			return document;
		}
	}
	@Override public Document getUserByName(String name) {
		Document document = Mongo.collection("users").find(eq("name", name)).first();
		if (document == null) {
			return null;
		} else {
			return document;
		}
	}
	@Override public Document getUserByEmail(String email) {
		Document document = Mongo.collection("users").find(eq("email", email)).first();
		if (document == null) {
			return null;
		} else {
			return document;
		}
	}
	@Override public List<Document> getUsers(Map<String, Object> filters) throws APException {
		final List<Document> result = new ArrayList<Document>();
		Document filter = new Document(filters);
		FindIterable<Document> iterable = Mongo.collection("users").find(filter);
		iterable.forEach(new Block<Document>() {
			@Override
			public void apply(final Document document) {
				result.add(document);
			}
		});
		return result;
	}
	@Override public Document createUser(Document user) throws APException {
		if (getUserByName(user.getString(MongoConstants.Users.NAME)) != null) throw APException.USER_NAME_INUSE;
		if (getUserByEmail(user.getString(MongoConstants.Users.EMAIL)) != null) throw APException.USER_EMAIL_INUSE;
		Mongo.collection("users").insertOne(user);
		return getUserByName(user.getString(MongoConstants.Users.NAME));
	}
	@Override public Document updateUser(Document user) throws APException {
		if (getUserByName(user.getString(MongoConstants.Users.NAME)) == null) throw APException.USER_NOT_FOUND;
		Mongo.collection("users").updateOne(eq(MongoConstants.Users.NAME, user.getString(MongoConstants.Users.NAME)), new Document("$set", user));
		return getUserByName(user.getString(MongoConstants.Users.NAME));
	}
	@Override public Document deleteUser(Document user) throws APException {
		if (getUserByName(user.getString(MongoConstants.Users.NAME)) == null) throw APException.USER_NOT_FOUND;
		Mongo.collection("users").deleteOne(user);
		return user;
	}

}
