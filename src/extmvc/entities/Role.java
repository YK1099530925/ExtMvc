package extmvc.entities;

import java.io.Serializable;

/* 角色与用户之间的关系：角色-用户：一对多
 *   role  ：管理员、超级管理员、普通员工
 * describe：每一个角色的描写
 * */

public class Role implements Serializable{
	private Integer id;
	private String role;
	private String describ;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getDescrib() {
		return describ;
	}
	public void setDescrib(String describ) {
		this.describ = describ;
	}
	
	@Override
	public String toString() {
		return "Role [id=" + id + ", role=" + role + ", describ=" + describ + "]";
	}
}
