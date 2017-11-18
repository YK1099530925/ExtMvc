package extmvc.dao;

import java.util.List;

import extmvc.entities.Role;
import extmvc.entities.User;

public interface BaseDao {
	/**
	 * 用户登录检测方法
	 * 返回值：User
	 * 参数：loginname,password
	 * */
	public User userLogin(String loginname,String password);
	/**
	 * 查询所有数据
	 * */
	public List<User> selectAllUser();
}
