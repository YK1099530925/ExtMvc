//轮训session，判断当前用户是否还存在（即：是否在其他地方登录）

var IsHasSession = {
	run:function(){
		Ext.Ajax.request({
			url:"../isHasSession",
			method:"post",
			params:{"username":window.session_username},
			disableCaching:true,//禁止缓存
			timeout:300000,//最大等待时间，超时则会触发超时
			success:function(response,options){
				var res = Ext.JSON.decode(response.responseText);//Json对象化
				if(!res.success){
					Ext.Msg.alert("成功","系统已超时，请重新登录...",function(){
						window.location.href = "../index.jsp";
					});
					Ext.TaskManager.stop(IsHasSession);//停止该任务
				}
			},
			failure:function(response,options){
				Ext.Msg.alert("失败","系统已超时，请重新登录...",function(){
						window.location.href = "../index.jsp";
					});
				Ext.TaskManager.stop(IsHasSession);//停止该任务
			}
		});
	},
	interval:10000//1000=1s 经过20秒请求一次
}
Ext.TaskManager.start(IsHasSession);