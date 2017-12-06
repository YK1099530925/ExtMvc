/*var userDatas = {
	"rows":[
		{
			"id":"1",
			"username":"张三",
			"age":"23",
			"userrole":"管理员"
		},
		{
			"id":"2",
			"username":"李四",
			"age":"24",
			"userrole":"超级管理员"
		},
		{
			"id":"3",
			"username":"王五",
			"age":"25",
			"userrole":"员工"
		}
	]
}*/

/* Store数据源的定义
 * 1）ArrayStore适合用来读取数组类型的数据
 * 	数组的fields:["id","username","age","role"]
 *  数组的data:[
 *  			["1","杨宽","21","管理员"]
 *  		  ]
 * 2）JsonStore用来读取json格式的数据
 * 	json的格式如下
 * 	json格式的字段定义还可以指定类型，例如：年龄必须是一个int型
 * 	fields:[
 * 				{"id","name",
 * 					{name:"age",type:"int"},
 * 				 	"role"
 * 				}
 * 			]
 * 3）JsonStore使用远程数据时，只需要指定url和fields字段，接下来
 * 的事情JsonStore会自动处理，例
 * 	var userJson = Ext.data.JsonStore({
 * 		fields:["id","name","age","role"],
 * 		url:"...."
 * });
 * */
userStore = new Ext.data.JsonStore({
	id:"userStore",
	autoLoad: true,
	pageSize:4,
	fields:[
		{name:"id",type:"int"},
		{name:"username",type:"string"},
		{name:"age",type:"int"},
		{name:"userrole"}
	],
    proxy:{
    	type: 'ajax',
    	url:"../userDataSelect",
    	//url:"../data/user.json",
        reader: {//reader解析器，解析json，array等数据
            type: 'json',
            root: 'roots',
        	totalProperty:"total"
        }
    }
});

//设置复选框
selModel = new Ext.selection.CheckboxModel({
	injectCheckbox:0,
	checkOnly:true
});

sub = function(){
	var user = add_edit_Panel.getForm().getValues();
	/*var lastStore = store.data.length - 1;
	  var id = store.data.items[lastStore].data.id + 1;
	  var username = user.username;
	  var age = user.age;
	  var userrole = user.userrole;
	  var userrole1 = Ext.getCmp('userrole').getRawValue();
	  */
	//id为空表示新增，判断新增
	if(user.id == null){
		if(window.session_userrole_id == 2 && user.userrole == 2){
			Ext.Msg.alert("提示","您只能添加员工");
			return;
		}
	}
	Ext.Ajax.request({
		url:"../addOrUpdateUser",
		method:"post",
		params:user,
		success:function(response,options){
			// 将后台json格式字符串解析成前台对象，解析json时需要加（）
			var res = eval("(" + response.responseText + ")");
			Ext.Msg.alert("提示", res.data);
			//添加成功后，通过重新加载来动态添加我们添加的对象
			userStore.reload();
		},
		type:"json"
		
	});
	/*var rec = Ext.data.Model({
		id:id,
		username:username,
		age:age,
		userrole:userrole1
	});
	store.add(rec);*/
	add_edit_Panel.getForm().reset();
	add_edit_Window.close();
};

items = [
		{
			xtype:"hidden",
			id:"id",
			name:"id",
			value:""
		},{
			id:"username",
			name:"username",
			fieldLabel:"姓名"
		},{
			id:"age",
			name:"age",
			fieldLabel:"年龄"
		},{
			/*combo用来显示下拉框与分页功能
			 * 如果从远程加载数据较多，可以使用分页功能
			 * 设置pageSize，然后还需要返回数据的总条数，
			 * 这样JsonStore才能计算分页*/
			xtype:"combo",
			id:"userrole",
			name:"userrole",
			fieldLabel:"角色",
			store:new Ext.data.ArrayStore({
				autoLoad:true,
				fields:["fid","frole"],
				data:[
					//["1","超级管理员"],
					["2","管理员"],
					["3","员工"]
				]
			}),
			value:"3",
			displayField:"frole",//使用哪个字段作为标签菜单
			valueField:"fid",
			mode:"local",//数据源来自本地
			typeAhead:false,//是否会自动填充
			forceSelection:true//是否强制用户只能通过选择的方式交互
		}
	];

//创建表单
add_edit_Panel = new Ext.form.Panel({
	buttonAlign:"center",
	layout:"anchor",
	frame:true,
	defaultType:"textfield",
	defaults:{
		margin:"20 75 0 75",
		labelSeparator:":",//用冒号间隔字段与label
		labelWidth:50,
		width:200,//字段宽度
		allowBlank:false,
		blankText:"不能为空",
		selectOnFocus:true
	},
	items:items,
	buttons:[
		{
			text:"确定",
			handler:sub
		},{
			text:"重置",
			handler:function(){
				addPanel.getForm().reset();
			}
		}
	]
});

//创建窗口
add_edit_Window = new Ext.Window({
	title:"",
	width:400,
	height:300,
	layout:"fit",
	plain:true,//如果渲染窗体背景是透明的，那它就会融合到框架元素中
	modal:true,//如果显示窗口模式并隐藏其后面的所有内容，则为false，以显示它，而不会限制对其他UI元素的访问
	closeAction:"hide",
	items:add_edit_Panel
});

whatRole = function(userrole){
	if (userrole == "超级管理员") {
		return 1;
	} else if (userrole == "管理员") {
		return 2;
	} else {
		return 3;
	}
}

userPanel = function(){
	userpanel = new Ext.grid.Panel({
		width:window.innerWidth - 210,
		height:200,
		frame:true,
		tbar:[{
				text:"新增",
				iconCls:"btn-add",
				handler:function(){
					/**判断用户等级
					 * 1：超级管理员：可新增2.3
					 * 2：管理员：可新增3
					 * 3：员工：无法新增
					 * */
					if(window.session_userrole_id == 3){
						Ext.Msg.alert("提示","您无法新增");
						return;
					}
					add_edit_Window.setTitle("新增用户");
					add_edit_Window.show();
				}
			},{
				text:"编辑",
				iconCls:"btn-edit",
				handler:function(){
					/**判断用户等级
					 * 1：超级管理员：可编辑2.3
					 * 2：管理员：可编辑2.3
					 * 3：员工：可编辑3
					 * */
					if(userpanel.getSelectionModel().hasSelection()){
						//获取单行数据：如下，获取一行或多行getSelectionModel().getSelections();
						var rec = userpanel.getSelectionModel().selected.items[0].data;
						//拿到用户角色，因为拿到的是文本（如：管理员），则需要将它对应的value值给userrole
						var userrole = whatRole(rec.userrole);//返回userrole对应的数值
						//新增与修改是一个界面，因此只需要给新增界面赋值，则就成为修改界面
						var values = {
										id:rec.id,
										username:rec.username,
										age:rec.age,
										userrole:userrole
									};
						//判断是否是员工，员工只能修改自己，即session_id要是自己的id:rec.id
						if(window.session_userrole_id == 3 && 
							window.session_id != rec.id){
							Ext.Msg.alert("提示","您只能修改自己");
							return;
						}else if(window.session_userrole_id == 2){
							if(userrole != 3 && window.session_id != rec.id){
								Ext.Msg.alert("提示","您只能修改自己");
								return;
							}
						}
						add_edit_Window.setTitle("编辑用户");
						add_edit_Panel.form.setValues(values);
						add_edit_Window.show();
					}else{
						Ext.Msg.alert("提示","请选择要编辑的用户");
					}
					
				}
			},{
				text:"删除",
				iconCls:"btn-del",
				handler:function(){
					if(window.session_userrole_id == 3){
						Ext.Msg.alert("提示","您不能删除任何人");
						return;
					}
					//判断是否选中某条记录
					if(userpanel.getSelectionModel().hasSelection()){
						var rec = userpanel.getSelectionModel().selected.items[0].data;
						var userrole = whatRole(rec.userrole);
						if(window.session_userrole_id == 2 && userrole != 3){
							Ext.Msg.alert("提示","您只能删除员工");
							return;
						}
						Ext.Msg.confirm("确认","确认删除以下用户？<br/>" + rec.username, function(btn){
							if(btn == "yes"){
								Ext.Ajax.request({
									method:"post",
									url:"../deleteUser",
									params:{"id":rec.id},
									//response:响应值，options:执行请求时的options参数
									success:function(response,options){
										//将后台json格式字符串解析成前台对象，解析json时需要加（）
										var res = eval("("+response.responseText+")");
										Ext.Msg.alert("提示",res.data);
										userStore.reload();
									},
									type:"json"
								});
							}
						});
					}else{
						Ext.Msg.alert("提示","请选择要删除的用户");
					}
				}
		}],
		//添加分页
		bbar: [{
	        xtype: 'pagingtoolbar',
	        store: userStore,
	        displayInfo: true,
	        displayMsg:"记录：第{0}条-第{1}条，共{2}条"
	    }],
		viewConfig:{
			forceFit:true,
			stripeRows:true
		},
		store:userStore,
		selModel:selModel,
		columns:[
			{
				header:"ID",flex:1,dataIndex:"id",sortable:true
			},{
				header:"姓名",flex:1,dataIndex:"username",sortable:true
			},{
				header:"年龄",flex:1,dataIndex:"age",sortable:true
			},{
				header:"角色",flex:1,dataIndex:"userrole",sortable:true
			}
		]
	});
	return userpanel;
};

//这种方式：使用对象引用的方法，当关闭tab页面再次打开的时候，将会报userPanel未定义的错
//因此将选用上面方式，利用函数的方法
/*userPanel = new Ext.grid.Panel({
	width:window.innerWidth - 200,
	height:300,
	frame:true,
	tbar:[
		{
			text:"新增",
			iconCls:"btn-add",
			handler:function(){
				addWindow.show();
			}
		},{
			text:"编辑",
			iconCls:"btn-edit",
			handler:function(){
				Ext.Ajax.request({
					url:"../userDataSelect",
					params:{},
					customer:"自定义属性",
					callback:function(options,success,response){
						var msg = ["请求是否发送成功",success,"\n",
							"服务器返回值",response.responseText,"\n",
							"本地自定义属性",options.customer];
							alert(msg);
							
					}
				});
			}
		},{
			text:"删除",
			iconCls:"btn-del",
			handler:function(){
				Ext.Ajax.request({
					url:"../getName",
					params:{"id":2},
					callback:function(options,success,response){
						alert(success);
						alert(response.responseText);
						alert(response.result.username);
					},
					type:"json"
				});
			}
		}
		
	],
	viewConfig:{
		forceFit:true,
		stripeRows:true
	},
	store:store,
	selModel:selModel,
	columns:[
		{
			header:"ID",flex:1,dataIndex:"id",sortable:true
		},{
			header:"姓名",flex:1,dataIndex:"username",sortable:true
		},{
			header:"年龄",flex:1,dataIndex:"age",sortable:true
		},{
			header:"角色",flex:1,dataIndex:"userrole",sortable:true
		}
	]
});*/