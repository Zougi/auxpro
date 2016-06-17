package tools;

import java.io.File;
import java.io.FilenameFilter;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.core.UriBuilder;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.MongoEntity;
import org.ap.web.entity.constant.EPersonSex;
import org.ap.web.entity.mongo.AddressBean;
import org.ap.web.entity.mongo.ContactBean;
import org.ap.web.entity.mongo.CredentialsBean;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.PersonBean;
import org.ap.web.entity.mongo.SkillsBean;
import org.ap.web.internal.EConfigProperties;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.Mongo;
import org.bson.Document;

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


	/* TEST RESOURCES */

	private static final String TEST_RSC = "./src/test/resources/";
	public static final String TEST_RSC_ENTITY_INVALID = TEST_RSC + "db_entity_invalid/";
	public static final String TEST_RSC_ENTITY_VALID = TEST_RSC + "db_entity_valid/";

	public static String loadJsonRef(String file) throws Exception {
		return FileHelper.readFileAsString(new File(file)).replace("\n", "").replace(" ", "").replace("\t", "");
	}

	/* CREATE TEST DB */

	public static void createTestDatabase() {
		Mongo.database().drop();
		File dir = new File(TEST_RSC_ENTITY_VALID);
		
		for (final EMongoCollection col : EMongoCollection.values()) {
//			System.out.println("- " + col.name());
			List<Document> objects = new ArrayList<Document>();

			for (String path : dir.list(new FilenameFilter() {
				public boolean accept(File dir, String name) {
					return name.startsWith(col.getName() + "_");
				}
			}))	{
//				System.out.println("   - " + path);
				try {
					String content = loadJsonRef(TEST_RSC_ENTITY_VALID + path);
					MongoEntity obj = (MongoEntity)BeanConverter.localStringToBean(content, col.getClazz());
					String id = path.replaceFirst(col.getName() + "_", "").replace(".json", "");
					id = StringConverter.stringToHex(id);
					obj.setId(id);
					for (Field f : obj.getClass().getDeclaredFields()) {
						if (f.getDeclaredAnnotation(MongoId.class) != null) {
							String get = "get" + f.getName().substring(0, 1).toUpperCase() + f.getName().substring(1);
							String set = "set" + f.getName().substring(0, 1).toUpperCase() + f.getName().substring(1);
							Method getMethod = obj.getClass().getMethod(get);
							Method setMethod = obj.getClass().getMethod(set, String.class);
							String id2 = (String)getMethod.invoke(obj);
							String hexId = StringConverter.stringToHex(id2);
							setMethod.invoke(obj, hexId);
						}
					}
					Document document = BeanConverter.convertToMongo(obj);
					objects.add(document);
				} catch (Exception e) {
					e.printStackTrace();
					break;
				}
			}
			if (objects.size() > 0) {
//				System.out.println("  > inserting " + objects.size());
				Mongo.collection(col.getName()).insertMany(objects);
			}
		}
	}
	
	public static <T extends MongoEntity> T getFromJson(String path, Class<T> clazz) throws Exception {
		String content = loadJsonRef(TEST_RSC_ENTITY_VALID + path);
		//T obj = BeanConverter.stringToBean(content, clazz);
		T obj = BeanConverter.localStringToBean(content, clazz);
		String id = path.split("_")[1].replace(".json", "");
		id = StringConverter.stringToHex(id);
		obj.setId(id);
		for (Field f : obj.getClass().getDeclaredFields()) {
			if (f.getDeclaredAnnotation(MongoId.class) != null) {
				String get = "get" + f.getName().substring(0, 1).toUpperCase() + f.getName().substring(1);
				String set = "set" + f.getName().substring(0, 1).toUpperCase() + f.getName().substring(1);
				Method getMethod = obj.getClass().getMethod(get);
				Method setMethod = obj.getClass().getMethod(set, String.class);
				String id2 = (String)getMethod.invoke(obj);
				String hexId = StringConverter.stringToHex(id2);
				setMethod.invoke(obj, hexId);
			}
		}
		return (T)obj;
	}
	
	private static int ADDRESS_ID = 0;
	private static int CONTACT_ID = 0;
	private static int CUSTOMER_ID = 0;
	private static int PERSON_ID = 0;
	private static int SKILL_ID = 0;
	private static int USER_ID = 0;

	public static CredentialsBean getNextCredentials() {
		return next(new CredentialsBean());
	}
	
	public static AddressBean next(AddressBean bean) {
		bean.setAddress(ADDRESS_ID++ + " nouvelle rue");
		bean.setCity("Paris");
		bean.setCountry("France");
		bean.setLattitude("0");
		bean.setLongitude("0");
		bean.setPostalCode(75000);
		return bean;
	}
	public static CredentialsBean next(CredentialsBean bean) {
		String name = "user" + USER_ID++;
		bean.setName(name + "@" + name + ".com");
		bean.setPassword(name);
		bean.setEmail(name + "@" + name + ".com");
		return bean;
	}
	public static ContactBean next(ContactBean bean) {
		bean.setAddress(next(new AddressBean()));
		bean.setAddressChecked(true);
		bean.setEmail("contact" + CONTACT_ID++ + "@contact.com");
		bean.setEmailChecked(true);
		bean.setPhone("0102030405");
		bean.setPhoneChecked(false);
		return bean;
	}
	public static CustomerBean next(CustomerBean bean) {
		bean.setAddresses(new AddressBean[] { next(new AddressBean()) });
		bean.setContact(next(new ContactBean()));
		bean.setId(StringConverter.stringToHex(String.valueOf(CUSTOMER_ID++)));
		bean.setServiceId(String.valueOf(CUSTOMER_ID));
		bean.setPerson(new PersonBean());
		bean.setSkills(new SkillsBean());
		return bean;
	}
	public static PersonBean next(PersonBean bean) {
		bean.setBirthDate(new Date());
		bean.setBirthPlace(next(new AddressBean()));
		bean.setCiNumber(PERSON_ID++);
		bean.setCivility(EPersonSex.M.getId());
		bean.setFirstName("Prenom " + PERSON_ID);
		bean.setLastName("Nom " + PERSON_ID);
		bean.setNationality("Francaise");
		bean.setSocialNumber("SecSociale " + PERSON_ID);
		return bean;
	}
	public static SkillsBean next(SkillsBean bean) {
		bean.setAdministrative(1 + SKILL_ID++);
		bean.setChildhood(2 + SKILL_ID);
		bean.setCompagny(3 + SKILL_ID);
		bean.setDoityourself(4 + SKILL_ID);
		bean.setHousework(5 + SKILL_ID);
		bean.setNursing(6 + SKILL_ID);
		bean.setShopping(7 + SKILL_ID);
		return bean;
	}

	public static void main(String[] args) {
		EConfigProperties.DB_NAME.setValue(TestData.DB_DEV);
		createTestDatabase();
		Mongo.client().close();
	}
}
