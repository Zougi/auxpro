package unit.common;

import org.ap.web.common.EmailValidator;
import org.junit.Test;

import junit.framework.TestCase;

public class EmailValidatorTest {
	
	/* TEST CASES */
	
	@Test
	public void testI_InvalidValues() {
		TestCase.assertFalse(EmailValidator.getInstance().isValid("nameATdomain.com"));
		TestCase.assertFalse(EmailValidator.getInstance().isValid("name@domainDOTcom"));
		TestCase.assertFalse(EmailValidator.getInstance().isValid("name@domain."));
		TestCase.assertFalse(EmailValidator.getInstance().isValid("name@.com"));
		TestCase.assertFalse(EmailValidator.getInstance().isValid("name@domain.c"));
		TestCase.assertFalse(EmailValidator.getInstance().isValid("@domain.com"));
		
		TestCase.assertFalse(EmailValidator.getInstance().isValid("kiko@kiko.lol"));
	}

	@Test
	public void testV_NullValues() {
		TestCase.assertFalse(EmailValidator.getInstance().isValid(null));
		TestCase.assertFalse(EmailValidator.getInstance().isValid(""));
		TestCase.assertTrue(EmailValidator.getInstance().isValid(null, true));
		TestCase.assertTrue(EmailValidator.getInstance().isValid("", true));
	}
	
	@Test
	public void testV_ValidValues() {
		TestCase.assertTrue(EmailValidator.getInstance().isValid("name@domain.com"));
		TestCase.assertTrue(EmailValidator.getInstance().isValid("name@domain.co"));
		TestCase.assertTrue(EmailValidator.getInstance().isValid("name@d.com"));
		TestCase.assertTrue(EmailValidator.getInstance().isValid("name.name@domain.com"));
		TestCase.assertTrue(EmailValidator.getInstance().isValid("name_name@domain.com"));
		TestCase.assertTrue(EmailValidator.getInstance().isValid("name-name@domain.com"));
		TestCase.assertTrue(EmailValidator.getInstance().isValid("1@domain.com"));
	}
}
