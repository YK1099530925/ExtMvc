package extmvc.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import extmvc.dao.BaseDao;
import extmvc.entities.Role;
import extmvc.entities.User;

@Repository
public class DaoImpl implements BaseDao {

	@Autowired
	private SessionFactory sessionFactory;
	public Session getSession(){
		return sessionFactory.openSession();
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
	public List<Object[]> selectAllUser() {
		List<Object[]> users = null;
		String hql = "select u.id as id,u.username,u.age,r.role from User u, Role r where u.userrole = r.id";
		users = getSession().createQuery(hql).list();
		return users;
	}

}
