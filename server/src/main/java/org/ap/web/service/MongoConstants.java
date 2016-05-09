package org.ap.web.service;

public class MongoConstants {
	
	public static class Users {
		public static final String COLLECTION = "users";
		public static final String NAME         = "name";
		public static final String EMAIL        = "email";
		public static final String PASSWORD     = "password";
		public static final String ACTIVE       = "active";
		public static final String TYPE         = "type";
		public static final String REGISTRATION = "registrationDate";
		public static final String TUTOSKIPPED  = "tutoSkipped";
	}
	
	public static class Auxiliaries extends Users {
		public static final String CIVILITY   = "civility";
		public static final String FIRST_NAME = "firstName";
		public static final String LAST_NAME  = "lastName";
		public static final String PHONE      = "phone";
		public static final String ADDRESS    = "address";
		public static final String BIRTHDATE  = "birthDate";
		public static final String BIRTHPLACE = "birthPlace";
		public static final String DIPLOMA    = "diploma";
	}
	
	public static class Services extends Users {
		public static final String PHONE        = "phone";
		public static final String ADDRESS      = "address";
		public static final String SOCIETY      = "society";
		public static final String SOCIALREASON = "social";
		public static final String SIRET        = "siret";
	}
	
	public static class Address {
		public static final String ADDRESS = "address";
		public static final String POSTAL  = "postal";
		public static final String CITY    = "city";
	}
}
