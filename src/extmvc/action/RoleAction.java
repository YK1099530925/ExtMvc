package extmvc.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import extmvc.entities.Role;
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
}
