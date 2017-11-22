package extmvc.service;

import java.util.List;

import extmvc.entities.User;

public interface BaseService {
	/**
	 * 用户登录检测方法
	 * 返回值：User
	 * 参数：loginname,password
	 * */
	public User userLogin(String loginname,String password);
	/**
	 * 查询所有数据
	 * */
	public List<Object[]> selectAllUser();
}
