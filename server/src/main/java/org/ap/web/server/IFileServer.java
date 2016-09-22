package org.ap.web.server;

import java.io.IOException;

public interface IFileServer {

	public String storeFile(String fileName, byte[] fileData) throws IOException;
	
	public byte[] getFile(String id) throws IOException;
}
