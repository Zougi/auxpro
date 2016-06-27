package module;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

import org.ap.web.internal.ObjectMapperContextResolver;
import org.ap.web.rest.RestApplication;
import org.ap.web.service.Mongo;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.client.ClientConfig;
import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import tools.TestBase;
import tools.TestData;

public class TestModuleBase extends TestBase {

	/* TEST SETUP */

	private static HttpServer SERVER;
	protected static WebTarget TARGET;

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
		//.property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE, new Annotation[] {});
		Client client = ClientBuilder.newClient(config);
		client.register(HttpAuthenticationFeature.basicBuilder().build());
		client.register(ObjectMapperContextResolver.class);
		//client.register(SecurityEntityFilteringFeature.class);
		//client.register(EntityFilteringFeature.class);
		TARGET = client.target(TestData.BASE_URI);
	}
	@AfterClass
	public static void stopHttpServer() {
		SERVER.shutdownNow();
	}
	
	/* TEST SETUP */

	// Database handling
	@Before
	public void createDB() {
		Mongo.database().drop();
		TestData.createTestDatabase();
	}
	@After
	public void destroyDB() {
		Mongo.database().drop();
	}
}
