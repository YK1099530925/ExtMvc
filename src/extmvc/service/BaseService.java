package extmvc.service;

import java.util.List;

import extmvc.entities.Role;
import extmvc.entities.User;
import extmvc.entities.UserLogin;

public interface BaseService {
	/**
	 * 用户登录检测方法
	 * 返回值：User
	 * 参数：loginname,password
	 * */
	public UserLogin userLogin(String username,String password);
	/**
	 * 查询所有数据
	 * */
	public List<Object[]> selectAllUser();
	/**
	 * 通过id查询是否存在此人
	 * */
	public User getUserById(Integer id);
	/**
	 * 通过userrole查询role
	 * */
	public Role getRole(Integer userrole);
	/**
	 * 添加和修改用户
	 * */
	public void saveOrUpdate(User user);
	/**
	 * 删除用户
	 * */
	public void deleteUser(Integer id);
	
	/**
	 * 查询所有角色
	 * */
	public List<Role> roleDataSelect();
}
