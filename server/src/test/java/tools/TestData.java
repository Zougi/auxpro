package tools;

import java.io.File;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.UriBuilder;

import org.ap.web.internal.EConfigProperties;
import org.ap.web.rest.entity.BeanConverter;
import org.ap.web.rest.entity.constant.EAuxCivility;
import org.ap.web.rest.entity.constant.EUserType;
import org.ap.web.rest.entity.user.AuxiliaryBean;
import org.ap.web.rest.entity.user.CredentialsBean;
import org.ap.web.rest.entity.user.ServiceBean;
import org.ap.web.rest.entity.user.UserBean;
import org.ap.web.service.MongoConnection;
import org.ap.web.service.MongoConstants;
import org.bson.Document;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TestData {

	/* SERVER INFO */

	public static final String HOST_PROTOCOL = "http";
	public static final String HOST_SERVER   = "localhost";
	public static final String HOST_PORT     = "8090";

	public static final String BASE_URL = HOST_PROTOCOL + "://" + HOST_SERVER + ":" + HOST_PORT + "/";
	public static final URI    BASE_URI = UriBuilder.fromUri(TestData.BASE_URL).build();

	public static final String DB_DEV = "db-dev";
	public static final String DB_TEST = "db-test";
	
	/* OBJECT MAPPER */

	private static ObjectMapper _MAPPER; 
	public static ObjectMapper getMapper() {
		if (_MAPPER == null) {
			_MAPPER = new ObjectMapper();
			_MAPPER.setSerializationInclusion(Include.NON_NULL);
		}
		return _MAPPER;
	}

	/* TEST RESOURCES */

	private static final String TEST_RSC = "./src/test/resources/";
	public static final String TEST_RSC_ENTITY_INVALID = TEST_RSC + "db_entity_invalid/";
	public static final String TEST_RSC_ENTITY_VALID = TEST_RSC + "db_entity_valid/";

	public static String loadJsonRef(String file) throws Exception {
		return FileHelper.readFileAsString(new File(file)).replace("\n", "").replace(" ", "").replace("\t", "");
	}

	/* CREATE TEST DB */

	public static void createTestDatabase() {
		MongoConnection CONN = MongoConnection.getInstance();
		CONN.getDatabase().drop();
		List<Document> list = new ArrayList<Document>();
		File dir = new File(TEST_RSC_ENTITY_VALID);
		for (String path : dir.list()) {
			try {
				if (path.contains("_aux")) {
					list.add(BeanConverter.convertToDocument(getAuxiliaryFromJson(path)));
				} else if (path.contains("_sad")) {
					list.add(BeanConverter.convertToDocument(getServiceFromJson(path)));
				} else {
					list.add(BeanConverter.convertToDocument(getUserFromJson(path)));
				}
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("unable to load ref from: " + path);
			}
		}
		CONN.getCollection(MongoConstants.Users.COLLECTION).insertMany(list);
	}
	
	public static UserBean getUserFromJson(String path) throws Exception {
		String content = loadJsonRef(TEST_RSC_ENTITY_VALID + path);
		return getMapper().readValue(content, UserBean.class);
	}
	public static AuxiliaryBean getAuxiliaryFromJson(String path) throws Exception {
		String content = loadJsonRef(TEST_RSC_ENTITY_VALID + path);
		return getMapper().readValue(content, AuxiliaryBean.class);
	}
	public static ServiceBean getServiceFromJson(String path) throws Exception {
		String content = loadJsonRef(TEST_RSC_ENTITY_VALID + path);
		return getMapper().readValue(content, ServiceBean.class);
	}

	private static String USER_NAME = "newUser";
	private static int USER_ID = 0;

	public static CredentialsBean getNextCredentials() {
		return fillNextCredentials(new CredentialsBean());
	}
	public static CredentialsBean fillNextCredentials(CredentialsBean bean) {
		String name = USER_NAME + USER_ID++;
		bean.setName(name + "@" + name + ".com");
		bean.setPassword(name);
		bean.setEmail(name + "@" + name + ".com");
		return bean;
	}
	public static UserBean getNextUser() {
		return fillNextUser(new UserBean());
	}
	public static UserBean fillNextUser(UserBean bean) {
		String name = USER_NAME + USER_ID++;
		bean.setName(name + "@" + name + ".com");
		bean.setPassword(name);
		bean.setEmail(name + "@" + name + ".com");
		bean.setActive(true);
		bean.setType(EUserType.AUXILIARY.getId());
		return bean;
	}
	public static AuxiliaryBean getNextAuxiliary() {
		AuxiliaryBean bean = (AuxiliaryBean)fillNextUser(new AuxiliaryBean());
		bean.setCivility(EAuxCivility.MR.getId());
		bean.setFirstName("first " + bean.getName());
		bean.setLastName("last " + bean.getName());
		bean.setPhone("phone " + bean.getName());
		bean.setType(EUserType.AUXILIARY.getId());
		return bean;
	}
	public static ServiceBean getNextService() {
		ServiceBean bean = (ServiceBean)fillNextUser(new ServiceBean());
		bean.setSociety("society " + bean.getName());
		bean.setPhone("phone " + bean.getName());
		bean.setType(EUserType.SERVICE.getId());
		return bean;
	}

	public static void main(String[] args) {
		EConfigProperties.DB_NAME.setValue(TestData.DB_DEV);
		createTestDatabase();
	}
}
