package tools;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class FileHelper {

	public static String readFileAsString(File f) throws IOException {
		FileReader fr = new FileReader(f);
		BufferedReader br = new BufferedReader(fr);
		StringBuffer out = new StringBuffer();
		while(br.ready()) {
			out.append(br.readLine() + "\n");
		}
		br.close();
		fr.close();
		return out.toString();
	}
}
