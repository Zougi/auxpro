package org.ap.web.server;

import java.io.IOException;

public interface IFileServer {

	public String storeFile(byte[] fileData);
	
	public byte[] getFile(String id) throws IOException;
}
