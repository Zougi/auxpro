package unit.rest.internal;

import org.ap.web.rest.security.Encoder;
import org.junit.Test;

public class EncoderTest {

	@Test
	public void testV_() {
		String decoded = Encoder.decode("YmFzaWM6IGFkbWluOmFkbWlu");
		System.out.println(decoded);
		String decodedAuth[] = Encoder.decodeBasicAuth("YWRtaW46YWRtaW4=");
		System.out.println(decodedAuth[0] + " - " + decodedAuth[1] );
	}
}
