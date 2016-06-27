package org.ap.web.entity.mongo;

import java.util.Map;

public class AuxiliaryDataBean {

	private InterventionBean[] missions;
	private Map<String, ServiceBean> services;
	private Map<String, CustomerBean> customers;
	
	public AuxiliaryDataBean() {}

	public InterventionBean[] getMissions() { return missions; }
	public void setMissions(InterventionBean[] missions) { this.missions = missions; }

	public Map<String, ServiceBean> getServices() { return services; }
	public void setServices(Map<String, ServiceBean> services) { this.services = services; }

	public Map<String, CustomerBean> getCustomers() { return customers; }
	public void setCustomers(Map<String, CustomerBean> customers) { this.customers = customers; }
}
