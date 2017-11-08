package extmvc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import extmvc.dao.BaseDao;
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
	public List<User> selectAllUser() {
		return baseDao.selectAllUser();
	}

}
