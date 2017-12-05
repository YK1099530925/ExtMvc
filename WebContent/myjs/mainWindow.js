Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	/*var mainWindow = new Ext.window.Window({
		renderTo:Ext.getBody(),
		width:window.innerWidth,
		height:window.innerHeight,
		items:[{
			xtype:"panel",
			width:200,
			height:500,
			html:"添加面板"
		}]
	});
	mainWindow.show();*/

	//获取jsp页面id为session_的值的方法，将session保存为window的全局对象，以便使用，还可以使用cookie保存全局s
	//var username = document.getElementById('session_username').value
	window.session_id = Ext.getDom('session_id').value;
	window.session_username = Ext.getDom('session_username').value;
	window.session_password = Ext.getDom('session_password').value;
	window.session_userrole_id = Ext.getDom('session_userrole_id').value;
	window.session_userrole = Ext.getDom('session_userrole').value;
	
	creatViewport = function(){
		var viewport = new Ext.Viewport({
			id:"viewport",
			layout:"border",
			defaults:{//设置默认属性
				collapsible:true
			},
			items:[
				northPanel,
				westPanel,
				centerPanel
			]
		});
	};
	
	//多字段验证用vtype
	Ext.apply(Ext.form.VTypes,{  
	    password:function(val,field){  
	        if(field.initialPassField){  
	            var pwd = Ext.getCmp(field.initialPassField);  
	            return (val == pwd.getValue());  
	        }  
	        return true;  
	    },  
	    passwordText:'两次密码不一致'  
	}); 
	
	changePasswordPanel = new Ext.form.Panel({
		buttonAlign:"center",
		layout:"anchor",
		height:220,
		frame:true,
		defaultType:"textfield",
		defaults:{
			margin:"15 0 0 90",
			labelSeparator:":",//用冒号间隔字段与label
			labelWidth:60,
			//width:200,//字段宽度
			allowBlank:false,
			blankText:"密码不能为空",
			selectOnFocus:true
		},
		items:[{
			xtype:"hidden",
			id:"id",
			name:"id",
			value:window.session_id
		},{
			xtype:"hidden",
			id:"userrole",
			name:"userrole",
			value:window.session_userrole
		},{
			id:"old_password",
			name:"old_password",
			fieldLabel:"原密码",
			inputType:"password"
		},{
			id:"new_password",
			name:"new_password",
			fieldLabel:"新密码",
			inputType:"password"
		},{
			id:"confirm_password",
			name:"confirm_password",
			fieldLabel:"确认密码",
			inputType:"password",  
            vtype:'password',  
            initialPassField:'new_password'//Ext.apply将该字段与initialPassField所指定id的字段值进行比较
		}],
		buttons:[{
			text:"确定",
			handler:function(){
				//通过字段的自动验证，获取其值，如：字段为空会返回false，密码不一致会返回false
				if(!changePasswordPanel.getForm().isValid()){
					Ext.Msg.alert("提示","请输入正确的密码...");
					return;
				}
				//得到面板的所有字段的值
				var session_userLogin = changePasswordPanel.getForm().getValues();
				//判断旧密码是否输入正确
				if(session_userLogin.old_password.trim() == window.session_password){
					//判断新密码和确认密码是否已填
					if(session_userLogin.new_password.trim() != ""){
						Ext.Ajax.request({
						url:"../changePassword",
						method:"post",
						params:session_userLogin,
						success:function(response,options){
							var data = eval("("+response.responseText+")");
							Ext.Msg.alert("提示",data.data+"，请重新登录...");
							changePasswordWindow.close();
							window.location.href="../index.jsp";
						},
						type:"json"
					});
					}else{
						Ext.Msg.alert("提示","新密码和确认密码为空，请重新输入");
					}
				}else{
					Ext.Msg.alert("提示","密码错误，请重新输入");
					changePasswordPanel.getForm().reset();
				}
				
			}
		},{
			text:"重置",
			handler:function(){
				changePasswordPanel.getForm().reset();
			}
		}]
	});
	
	changePasswordWindow = new Ext.Window({
		title:"修改密码",
		width:400,
		height:250,
		plain:true,
		modal:true,
		closeAction:"hide",
		items:changePasswordPanel
	});
	
	/* 主题栏 */
	var northPanel = new Ext.panel.Panel({
			region:"north",
			height:70,
			frame:true,
			items:[{
				xtype:"box",//设置为box图片充满整个panel
				name:"ykImg",
				id:"ykImg",
				autoEl:{
					tag:"img",//指定为img标签
					src:"../imgs/logo.png",//指定路径，一般为相对路劲
					cls:"main-logo"
				}
			},{
				xtype:"splitbutton",
				minWidth:125,
				iconCls:"x-btn-user",
				cls:"main-btn",
				enabelToggle: true,
				pressed: true,
				text: window.session_username,
				menu: new Ext.menu.Menu({
					items: [{
						text: "修改密码",
						iconCls: "x-btn-lock",
						handler:function(){
							//弹出窗口
							changePasswordWindow.show();
						}
					}, {
						text: "退出系统",
						iconCls: "x-btn-exit",
						handler: function() {
							Ext.Ajax.request({
								url:"../exit",
								method:"post",
								params:{"username":window.session_username},
								callback:function(options,success,response){
									window.location.href = "../index.jsp";
								}
							});
						}
					}]
				})
			}]
		});
	
	/* 节点数据源 */
	var store = Ext.create('Ext.data.TreeStore', {
		root:{
			expanded:true,//默认展开根节点
			children:[{
				id:"userManage",
				text:"用户管理",
				leaf:false,//是否是叶子节点
				expanded:true,
				children:[{
					id:"userInfo",
					text:"用户信息",
					leaf:true
				}]
			},{
				id:"deparManage",
				text:"部门管理",
				leaf:false,
				expanded:true,
				children:[{
					id:"deparInfo",
					text:"部门信息",
					leaf:true
				}]
			},{
				id:"roleManage",
				text:"角色管理",
				leaf:false,
				expanded:true,
				children:[{
					id:"roleInfo",
					text:"角色信息",
					leaf:true
				}]
			}]
		}
	});
		
	//导航栏
	var root1 = Ext.create('Ext.tree.Panel',{
		title:"管理界面",
		rootVisible:false,//设置根节点是否隐藏
		//通过数据源的方式将节点添加进来
		store:store,
		listeners:{ //添加监听，当按下节点到时候，增加一个标签页
			itemclick : function(view,node,item,index,e){
				if(node.get("leaf")){//通过leaf判断，如果是叶子节点，就添加tab页
					addTabPage(node);//添加新的标签页
					/* 获取叶子节点的文本值
					 * alert(record.get("text"));//获取叶子节点的text文本值
					 * alert(record.raw.text);//获取叶子节点的text文本值
					 */
				}
		} } 
	});
	
	var root2 = Ext.create('Ext.tree.Panel',{
		title:"其他",
		fields:["name","description"],//字段
		columns:[{
			xtype:"treecolumn",//树状表格列表
			text:"名称",
			dataIndex:"name",
			width:100,
			sortable:true
		},{
			text:"描述",
			dataIndex:"description",
			flex:1,
			sortable:true
		}],
		root:{
			name:"其他",//用title不能显示
			expanded:true,
			description:"树根的描述",
			children:[{
				name:"节点1",
				description:"节点1的描述",
				leaf:true
			},{
				name:"节点2",//用text不能显示
				description:"节点2的描述",
				leaf:true
			}]
		}
	});
	
	//用函数的方式
	/*westPanel = function(){
		var panel = new Ext.panel.Panel({
			layout:"accordion",
			collapsible:true,//是否能够收缩
			split:true,
			region:"west",//位于左边
			title:"导航菜单",
			frame:true,
			height:window.innerHeight-50,
			width:200,
			items:root
		});
		return panel;
	};*/
	
	//用变量的方式-对象的引用
	var westPanel = new Ext.panel.Panel({
			layout:"accordion",
			collapsible:true,//是否能够收缩
			split:true,
			region:"west",//位于左边
			title:"导航菜单",
			frame:true,
			height:window.innerHeight-50,
			width:200,
			items:[
				root1,
				root2
			]
		});
		
	creatViewport();
	
	//轮训session，判断当前用户是否还存在（即：是否在其他地方登录）
var IsHasSession = {
	run:function(){
		Ext.Ajax.request({
			url:"../isHasSession",
			method:"post",
			params:{"username":window.session_username,
					"userrole":window.session_userrole},
			disableCaching:true,
			timeout:300000,//最大等待时间
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

//循环检测后台是否有存在false的用户，是则显示提示框，允许或者不允许
var checkHasNewUser = {
	run:function(){
		Ext.Ajax.request({
			url:"../checkHasNewUser",
			method:"post",
			params:{"username":window.session_username},
			disableCaching:true,
			timeout:300000,//最大等待时间
			success:function(response,options){
				var res = Ext.JSON.decode(response.responseText);
				//(返回键sessionid对应的值)如果存在则提示，并确认（如果返回了false，代表是该用户是第一个用户，能处理后续用户的登录状态）
				if(!res.success){
					Ext.MessageBox.confirm("提示","是否允许该用户在另一处登录",function(e){
						var isAllow = false;
						if(e == "yes"){
							isAllow = true;
						}
						Ext.Ajax.request({
								url:"../isAllowLogin",
								method:"post",
								params:{"username":window.session_username,
										"isAllow":isAllow},
								success:function(response,options){
								}
							});
					});
				}else{
					//如果此用户不存在了，那么停止此定时器
				}
			},
			failure:function(response,options){
				Ext.Msg.alert("错误提示","请求等待时间超时");
				Ext.TaskManager.stop(checkHasNewUser);
				window.location.href="../index.jsp";
			}
		});
	},
	interval:5000
}
Ext.TaskManager.start(checkHasNewUser);
})

