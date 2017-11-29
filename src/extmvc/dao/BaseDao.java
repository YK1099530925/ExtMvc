package extmvc.dao;

import java.util.List;

import extmvc.entities.Role;
import extmvc.entities.User;
import extmvc.entities.UserLogin;

public interface BaseDao {
	/**
	 * 用户登录检测方法
	 * 返回值：User
	 * 参数：loginname,password
	 * */
	public UserLogin userLogin(String username,String password);
	public User user_Login(String username, String password);
	/**
	 * 查询所有数据
	 * */
	public List<Object[]> selectAllUser();
	/**
	 * 通过id查询是否存在此人
	 * */
	public User getUserById(Integer id);
	
	public Role getRole(Integer userrole);
	/**
	 * 添加修改用户
	 * */
	public void saveOrUpdate(User user);
	/**
	 * 删除用户
	 * */
	public void deleteUser(Integer id);
	
	public List<Role> roleDataSelect();
	
	public int chagePassword(Integer id, String userrole, String new_password);
	
}
