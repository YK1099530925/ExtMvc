package extmvc.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import extmvc.dao.BaseDao;
import extmvc.entities.Role;
import extmvc.entities.User;
import extmvc.entities.UserLogin;

@Repository
public class DaoImpl implements BaseDao {

	@Autowired
	private SessionFactory sessionFactory;
	public Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	@Override
	public UserLogin userLogin(String username, String password) {
		UserLogin userLogin = null;
		String hql = "from UserLogin where username ='"+ username 
				+"' and password ='" + password +"'";
		userLogin = (UserLogin)getSession().createQuery(hql).uniqueResult();
		return userLogin;
	}
	
	@Override
	public User user_Login(String username, String password) {
		User userLogin = null;
		String hql = "from User where username ='"+ username 
				+"' and password ='" + password +"'";
		userLogin = (User)getSession().createQuery(hql).uniqueResult();
		return userLogin;
	}

	@Override
	public List<Object[]> selectAllUser() {
		List<Object[]> users = null;
		String hql = "select u.id, u.username, u.age, r.role from User u, Role r where u.userrole = r.id";
		users = getSession().createQuery(hql).list();
		return users;
	}

	@Override
	public User getUserById(Integer id) {
		String hql = "from User where id=" + id;
		return (User)getSession().createQuery(hql).uniqueResult();
	}

	@Override
	public Role getRole(Integer userrole) {
		String hql = "from Role where id=" + userrole;
		return (Role)getSession().createQuery(hql).uniqueResult();
	}

	@Override
	public void saveOrUpdate(User user) {
		getSession().saveOrUpdate(user);
	}

	@Override
	public void deleteUser(Integer id) {
		String hql = "delete from User where id=" + id;
		getSession().createQuery(hql).executeUpdate();
	}

	@Override
	public List<Role> roleDataSelect() {
		String hql = "from Role";
		return getSession().createQuery(hql).list();
	}

	@Override
	public int chagePassword(Integer id, String userrole, String new_password) {
		String table = "";
		if(userrole.equals("超级管理员")){
			table = "UserLogin";
		}else {
			table = "User";
		}
		String hql = "update " + table +" set password = '" + new_password 
				+"' where id=" + id;
		return getSession().createQuery(hql).executeUpdate();
	}

}
