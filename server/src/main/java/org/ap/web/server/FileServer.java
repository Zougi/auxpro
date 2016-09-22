package org.ap.web.server;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.ap.web.internal.EConfigProperties;

public class FileServer implements IFileServer {

	/* ATTRIBUTES */
	
	private String _root;
	
	/* CONSTRUCTORS */
	
	public FileServer() {
		_root = EConfigProperties.FILES_ROOT.getValue();;
	}
	
	public FileServer(String root) {
		_root = root;
	}
	
	/* METHODS */
	
	public String storeFile(byte[] fileData) {
		return null;
	}
	
	public byte[] getFile(String id) throws IOException {
		Path path = Paths.get(_root + "/1.jpg");
		return Files.readAllBytes(path);
	}
}
