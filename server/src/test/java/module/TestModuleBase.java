package module;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

import org.ap.web.internal.EConfigProperties;
import org.ap.web.rest.RestApplication;
import org.ap.web.service.MongoConnection;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.client.ClientConfig;
import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;

import com.fasterxml.jackson.databind.ObjectMapper;

import tools.TestBase;
import tools.TestData;

public class TestModuleBase extends TestBase {

	/* TEST SETUP */

	private static HttpServer SERVER;
	protected static WebTarget TARGET;

	protected static MongoConnection CONN;

	
	protected static ObjectMapper MAPPER = TestData.getMapper();
	
	@BeforeClass
	public static void startHttpServer() {
		final ResourceConfig rc = new RestApplication();
		try {
			SERVER = GrizzlyHttpServerFactory.createHttpServer(TestData.BASE_URI, rc);
		} catch (Exception e) {
			if (!e.getMessage().contains("Address already in use: bind")) {
				throw e;
			}
		}
	}
	@BeforeClass
	public static void startHttpClient() {
		ClientConfig config = new ClientConfig();
		Client client = ClientBuilder.newClient(config);
		client.register(HttpAuthenticationFeature.basicBuilder().build());
		TARGET = client.target(TestData.BASE_URI);
	}
	@AfterClass
	public static void stopHttpServer() {
		SERVER.shutdownNow();
	}
	@BeforeClass
	public static void setUpDBClient() {
		EConfigProperties.DB_NAME.setValue(TestData.DB_TEST);
		MongoConnection.reload();
		CONN = MongoConnection.getInstance();
	}
	
	/* TEST SETUP */

	// Database handling
	@Before
	public void createDB() {
		TestData.createTestDatabase();
	}
	@After
	public void destroyDB() {
		CONN.getDatabase().drop();
	}
}
