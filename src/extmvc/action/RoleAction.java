package extmvc.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import extmvc.entities.Role;
import extmvc.logger.MyLogger;
import extmvc.service.BaseService;
import net.sf.json.JSONObject;

@Controller
public class RoleAction {
	
	@Autowired
	private BaseService baseService;
	
	@RequestMapping(value="/roleDataSelect",produces="application/json;charset=utf-8")
	@ResponseBody
	public String roleDataSelect(){
		List<Role> roles = baseService.roleDataSelect();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("roles", roles);
		return jsonObject.toString();
	}
	
	//修改密码
	@RequestMapping(value="/changePassword",method=RequestMethod.POST,produces="application/json;charset=utf-8")
	@ResponseBody
	public String changePassword(Integer id, String userrole,String new_password){
		String msString = "";
		//修改成功，返回一条记录，int类型
		MyLogger.roleActionLogger.info("修改密码：userrole:"+userrole+":new_password"+new_password);
		int i = baseService.changePassword(id,userrole,new_password.trim());
		if(i == 1){
			msString = "{data:'修改成功'}";
		}else{
			msString = "{data:'修改失败'}";
		}
		return msString;
	}
	
	@RequestMapping(value="/login_log",method=RequestMethod.POST,produces="application/json;charset=utf-8")
	@ResponseBody
	public String login_log(String username, String password){
		
		MyLogger.roleActionLogger.info("info请求登录"+username+":"+password);
		
		return "记录日志";
	}
	
}
