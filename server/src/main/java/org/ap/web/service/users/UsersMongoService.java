package org.ap.web.service.users;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.ap.web.internal.APException;
import org.ap.web.service.MongoConstants;
import org.ap.web.service.MongoConnection;
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
		Document filter = new Document(MongoConstants.Users.NAME, name).append(MongoConstants.Users.PASSWORD, password);
		FindIterable<Document> iterable = MongoConnection.getInstance().getCollection(MongoConstants.Users.COLLECTION).find(filter);
		Document document = iterable.first();
		if (document == null) {
			throw APException.INVALID_USER;
		} else {
			return document;
		}
	}
	@Override public Document getUserByName(String name) {
		Document document = MongoConnection.getInstance().getCollection(MongoConstants.Users.COLLECTION).find(new Document(MongoConstants.Users.NAME, name)).first();
		if (document == null) {
			return null;
		} else {
			return document;
		}
	}
	@Override public Document getUserByEmail(String email) {
		Document document = MongoConnection.getInstance().getCollection(MongoConstants.Users.COLLECTION).find(new Document(MongoConstants.Users.EMAIL, email)).first();
		if (document == null) {
			return null;
		} else {
			return document;
		}
	}
	@Override public List<Document> getUsers(Map<String, Object> filters) throws APException {
		final List<Document> result = new ArrayList<Document>();
		Document filter = new Document(filters);
		FindIterable<Document> iterable = MongoConnection.getInstance().getCollection(MongoConstants.Users.COLLECTION).find(filter);
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
		MongoConnection.getInstance().getCollection(MongoConstants.Users.COLLECTION).insertOne(user);
		return getUserByName(user.getString(MongoConstants.Users.NAME));
	}
	@Override public Document updateUser(Document user) throws APException {
		if (getUserByName(user.getString(MongoConstants.Users.NAME)) == null) throw APException.USER_NOT_FOUND;
		MongoConnection.getInstance().getCollection(MongoConstants.Users.COLLECTION).updateOne(eq(MongoConstants.Users.NAME, user.getString(MongoConstants.Users.NAME)), new Document("$set", user));
		return getUserByName(user.getString(MongoConstants.Users.NAME));
	}
	@Override public Document deleteUser(Document user) throws APException {
		if (getUserByName(user.getString(MongoConstants.Users.NAME)) == null) throw APException.USER_NOT_FOUND;
		MongoConnection.getInstance().getCollection(MongoConstants.Users.COLLECTION).deleteOne(user);
		return user;
	}

}
