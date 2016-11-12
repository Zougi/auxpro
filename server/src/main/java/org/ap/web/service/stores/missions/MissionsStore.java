package org.ap.web.service.stores.missions;

import org.ap.web.entity.constant.EMissionStatus;
import org.ap.web.entity.constant.ERecurencePeriod;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.StoreBase;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

public class MissionsStore extends StoreBase<MissionBean> implements IMissionsStore {

	public MissionsStore() {
		super(EMongoCollection.MISSIONS, MissionBean.class);
	}

	@Override
	public MissionBean[] getCustomerMissions(String serviceId, String customerId) throws APException {
		List<MissionBean> result = getEntityWhere(and(eq("serviceId", serviceId), eq("customerId", customerId)));
		return result.toArray(new MissionBean[result.size()]);
	}
	@Override
	public MissionBean[] getServiceMissions(String serviceId) throws APException {
		List<MissionBean> result = getEntityWhere(eq("serviceId", serviceId));
		return result.toArray(new MissionBean[result.size()]);
	}
	@Override
	public MissionBean[] getAuxiliaryMissions(String auxiliaryId) throws APException {
		List<MissionBean> result = getEntityWhere(eq("auxiliaryId", auxiliaryId));
		return result.toArray(new MissionBean[result.size()]);
	}
	@Override
	public MissionBean[] getInterventionMissions(String interventionId) throws APException {
		List<MissionBean> result = getEntityWhere(eq("interventionId", interventionId));
		return result.toArray(new MissionBean[result.size()]);
	}
	@Override
	public MissionBean[] createMissions(InterventionBean bean) throws APException {
		switch (ERecurencePeriod.fromString(bean.getPeriod())) {
		case ONE:
			MissionBean m = new MissionBean();
			m.setAuxiliaryId(bean.getAuxiliaryId());
			m.setCustomerId(bean.getCustomerId());
			m.setInterventionId(bean.getId());
			m.setServiceId(bean.getServiceId());
			m.setDate(bean.getStartDate());
			m.setStatus(EMissionStatus.PENDING.getId());
			createMission(m);
			break;
		case P1W:
		case P2W:
		case P3W:
		case P4W:
			List<DayOfWeek> days = Arrays.asList(bean.getDays());
			LocalDate startDate = bean.getStartDate();
			LocalDate endDate = bean.getEndDate();
			LocalDate currentDate = startDate.plusDays(0);
			while (!currentDate.isAfter(endDate)) {
				if (days.contains(currentDate.getDayOfWeek())) {
					m = new MissionBean();
					m.setAuxiliaryId(bean.getAuxiliaryId());
					m.setCustomerId(bean.getCustomerId());
					m.setInterventionId(bean.getId());
					m.setServiceId(bean.getServiceId());
					m.setDate(currentDate);
					m.setStatus(EMissionStatus.PENDING.getId());
					createMission(m);
				}
				currentDate = currentDate.plusDays(1);
			}
			break;
		}
		return getInterventionMissions(bean.getId());
	}
	@Override
	public MissionBean createMission(MissionBean bean) throws APException {
		return createEntity(bean);
	}
	@Override
	public MissionBean getMission(String id) throws APException {
		return getEntityById(id);
	}
	@Override
	public MissionBean updateMission(MissionBean bean) throws APException {
		return updateEntity(bean);
	}
	@Override
	public MissionBean deleteMission(String id) throws APException {
		return deleteEntity(id);
	}
}
