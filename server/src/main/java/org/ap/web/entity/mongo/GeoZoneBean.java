package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class GeozoneBean extends MongoEntity {

	/* ATTRIBUTES */
	
	@MongoId
	private String auxiliaryId;

	private String lattitude;
	private String longitude;
	
	private String radius;
	
	private int postalCode;
	private String city;
	
	/* CONSTRUCTORS */
	
	public GeozoneBean() {}
	
	/* METHODS */
	
	public String getLattitude() { return lattitude; }
	public void setLattitude(String lattitude) { this.lattitude = lattitude; }

	public String getLongitude() { return longitude; }
	public void setLongitude(String longitude) { this.longitude = longitude; }
	
	public String getRadius() { return radius; }
	public void setRadius(String radius) { this.radius = radius; }

	public int getPostalCode() { return postalCode; }
	public void setPostalCode(int postalCode) { this.postalCode = postalCode; }

	public String getCity() { return city; }
	public void setCity(String city) { this.city = city; }

	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId;	}
}
