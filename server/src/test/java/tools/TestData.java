package tools;

import java.io.File;
import java.io.FilenameFilter;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.UriBuilder;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.MongoEntity;
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
		return FileHelper.readFileAsString(new File(file)).replace("\n", "").replace("\t", "");
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
				System.out.println("   - " + path);
				String content = "";
				try {
					content = loadJsonRef(TEST_RSC_ENTITY_VALID + path);
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
					System.out.println(content);
					e.printStackTrace();
					break;
				}
			}
			if (objects.size() > 0) {
				//System.out.println("> inserting " + objects.size() + " " + col.getName());
				Mongo.collection(col.getName()).insertMany(objects);
			}
		}	
		//System.out.println(">> DONE");
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
	
	public static void main(String[] args) {
		EConfigProperties.DB_NAME.setValue(TestData.DB_DEV);
		Mongo.reload();
		createTestDatabase();
		Mongo.client().close();
	}
}
