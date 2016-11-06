package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties(ignoreUnknown = true, value = {"_id"})
public class CustomerBean extends MongoEntity {

	/* ATTRIBUTES */
	
	private PersonBean person;
	private ContactBean contact;
	
	private AddressBean[] addresses;
	
	private int housework;
	private int nursing;
	private int childhood;
	private int shopping;
	private int compagny;
	private int administrative;
	private int doityourself;
	
	@MongoId
	private String serviceId;
	
	/* CONSTRUCTOR */
	
	public CustomerBean() {
		person = new PersonBean();
		contact = new ContactBean();
		addresses = new AddressBean[0];
	}

	/* METHODS */
	
	public String getServiceId() { return serviceId; }
	public void setServiceId(String serviceId) { this.serviceId = serviceId; }
	
	public PersonBean getPerson() { return person; }
	public void setPerson(PersonBean person) { this.person = person; }

	public ContactBean getContact() { return contact; }
	public void setContact(ContactBean contact) { this.contact = contact; }

	public AddressBean[] getAddresses() { return addresses; }
	public void setAddresses(AddressBean[] addresses) { this.addresses = addresses; };
	
	public int getHousework() { return housework; }
	public void setHousework(int housework) { this.housework = housework; }
	
	public int getNursing() { return nursing; }
	public void setNursing(int nursing) { this.nursing = nursing; }
	
	public int getChildhood() { return childhood; }
	public void setChildhood(int childhood) { this.childhood = childhood; }
	
	public int getShopping() { return shopping; }
	public void setShopping(int shopping) { this.shopping = shopping; }	
	
	public int getCompagny() { return compagny; }
	public void setCompagny(int compagny) { this.compagny = compagny; }
	
	public int getAdministrative() { return administrative; }
	public void setAdministrative(int administrative) { this.administrative = administrative; }
	
	public int getDoityourself() { return doityourself; }
	public void setDoityourself(int doityourself) { this.doityourself = doityourself; }
}
