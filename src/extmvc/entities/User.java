package extmvc.entities;

import java.io.Serializable;

/* 角色与用户之间的关系：角色-用户：一对多
 * username：用户姓名
 *    age  ：用户的年龄
 * userrole：用户的角色属性
 * */

public class User implements Serializable{
	private Integer id;
	private String username;
	private int age;
	private Role userrole;
	private String password;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public Role getUserrole() {
		return userrole;
	}
	public void setUserrole(Role userrole) {
		this.userrole = userrole;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", age=" + age + ", userrole=" + userrole + ", password="
				+ password + "]";
	}
	
}
