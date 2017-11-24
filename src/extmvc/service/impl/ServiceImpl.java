package extmvc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import extmvc.dao.BaseDao;
import extmvc.entities.Role;
import extmvc.entities.User;
import extmvc.service.BaseService;

@Service
public class ServiceImpl implements BaseService {
	
	@Autowired
	private BaseDao baseDao;
	
	@Override
	public User userLogin(String loginname, String password) {
		return baseDao.userLogin(loginname, password);
	}

	@Override
	public List<Object[]> selectAllUser() {
		return baseDao.selectAllUser();
	}

	@Override
	public User getUserById(Integer id) {
		return baseDao.getUserById(id);
	}

	@Override
	public Role getRole(Integer userrole) {
		return baseDao.getRole(userrole);
	}

	@Override
	public void saveOrUpdate(User user) {
		baseDao.saveOrUpdate(user);
	}

}
