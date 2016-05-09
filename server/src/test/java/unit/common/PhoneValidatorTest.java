package unit.common;

import org.ap.web.common.PhoneValidator;
import org.junit.Test;

import junit.framework.TestCase;

public class PhoneValidatorTest {

	/* TEST CASES */

	@Test
	public void testI_InvalidValues() {
		TestCase.assertFalse(PhoneValidator.getInstance().isValid("012345678"));
		TestCase.assertFalse(PhoneValidator.getInstance().isValid("01234567890"));
		TestCase.assertFalse(PhoneValidator.getInstance().isValid("012345678A"));
		TestCase.assertFalse(PhoneValidator.getInstance().isValid("01234/5678A"));
		TestCase.assertFalse(PhoneValidator.getInstance().isValid("0123 4 5 ...678A"));
	}
	
	@Test
	public void testV_ValidValues() {
		TestCase.assertTrue(PhoneValidator.getInstance().isValid("0123456789"));
		TestCase.assertTrue(PhoneValidator.getInstance().isValid("01 23 45 67 89"));
		TestCase.assertTrue(PhoneValidator.getInstance().isValid("01-23-45-67-89"));
		TestCase.assertTrue(PhoneValidator.getInstance().isValid("01.23.45.67.89"));
		TestCase.assertTrue(PhoneValidator.getInstance().isValid("01   23 -.45 ...- 6789"));
	}
}
