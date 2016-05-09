package org.ap.web.internal;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public enum EConfigProperties {

	/* MEMBERS */
	
	SERV_PORT   ("serv_port", "8090"),
	SERV_ORIGIN ("serv_origin", "*"),
	SERV_LOGIN  ("serv_login", "true"),
	
	DB_HOST ("db_host", "127.0.0.1"),
	DB_PORT ("db_port", "4242"),
	DB_NAME ("db_name", "db-test"),
	DB_USER ("db_user", ""),
	DB_PASS ("db_pass", ""),
	DB_PATH ("db_path", "./data/db"),
	;
	
	/* STATIC */
	
	public static void loadProperties() throws IOException {
		File f = new File("./src/main/resources/config/config.properties");
		Properties properties = new Properties();
		properties.load(new FileInputStream(f));
		for (EConfigProperties prop : EConfigProperties.values()) {
			String value = properties.getProperty(prop.getProperty());
			if (value != null && !value.trim().equals("")) {
				prop.setValue(value);
			}
		}
	}
	
	/* ATTRIBUTES */
	
	private String _property;
	private String _value;
	
	/* CONSTRUCTOR */
	
	private EConfigProperties(String prop, String def) {
		_property = prop;
		_value = def;
	}
	
	/* METHODS */
	
	public String getProperty() { return _property; }
	
	public String getValue() { return _value; }
	public void setValue(String value) { _value = value; }
}
