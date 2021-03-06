package org.ap.web.common.string;

import java.math.BigInteger;

public class StringConverter {

	public static String stringToHex(String s) {
		if (s == null) return null;
		return String.format("%024x", new BigInteger(1, s.getBytes()));
	}
}
