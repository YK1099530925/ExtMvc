package extmvc.entities;

/* 角色与用户之间的关系：角色-用户：一对多
 * username：用户姓名
 * password：用户的密码
 *    age  ：用户的年龄
 * userrole：用户的角色属性
 * */

public class User {
	private int id;
	private String username;
	private String password;
	private int age;
	private Role userrole;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	
	
}
