package extmvc.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import extmvc.dao.BaseDao;
import extmvc.entities.User;

@Repository
public class DaoImpl implements BaseDao {

	@Autowired
	private SessionFactory sessionFactory;
	public Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	@Override
	public User userLogin(String loginname, String password) {
		User user = null;
		String hql = "from User where loginname = '"+ loginname 
				+"' and password = '" + password +"'";
		user = (User)getSession().createQuery(hql).uniqueResult();
		return user;
	}

	@Override
	public List<User> selectAllUser() {
		List<User> users = null;
		String hql = "from User";
		users = getSession().createQuery(hql).list();
		return users;
	}

}
