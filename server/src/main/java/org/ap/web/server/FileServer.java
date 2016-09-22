package org.ap.web.server;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.ap.web.internal.EConfigProperties;

public class FileServer implements IFileServer {

	/* ATTRIBUTES */
	
	private String _root;
	
	/* CONSTRUCTORS */
	
	public FileServer() {
		this(EConfigProperties.FILES_ROOT.getValue());
	}
	
	public FileServer(String root) {
		_root = root;
		File f = new File(_root);
		if (!f.exists() || !f.isDirectory()) {
			_root = new File("").getAbsolutePath();
		}
	}
	
	/* METHODS */
	
	// IFileServer Immplementation //
	
	@Override
	public String storeFile(String fileName, byte[] fileData) throws IOException {
		String[] f = fileName.split("\\.");
		String ext = "";
		if (f.length > 1) {
			ext = f[f.length - 1];
		}		
		String id = UUID.randomUUID().toString() + "." + ext;
		Path path = Paths.get(_root + "/FILE_" + id);
		Files.write(path, fileData);
		return id;
	}
	
	@Override
	public byte[] getFile(String id) throws IOException {
		Path path = Paths.get(_root + "/FILE_" + id);
		if (!path.toFile().exists()) {
			return null;
		}
		return Files.readAllBytes(path);
	}
	
	// OTHER METHODS //

}
