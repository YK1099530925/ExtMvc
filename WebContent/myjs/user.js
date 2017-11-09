var userDatas = {
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
}

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
var store = new Ext.data.JsonStore({
	autoLoad:true,
	fields:[
		{name:"id"},
		{name:"username"},
		{name:"age"},
		{name:"userrole"}
	],
    proxy:{
    	type: 'ajax',
    	url:"../userDataSelect",
        reader: {//reader解析器，解析json，array等数据
            type: 'json',
            root: 'users'
        }
    }
});

//设置复选框
var selModel = new Ext.selection.CheckboxModel({
	injectCheckbox:0,
	checkOnly:true
});

var submit = function(){
	var formFields = addPanel.getForm().getValues();
	var id = store.data.length + 1;
	var username = formFields.username;
	var age = formFields.age;
	var role = formFields.userrole;
	var rec = Ext.data.Model({
		id:id,
		username:username,
		age:age,
		role:role
	});
	
	store.add(rec);
	addWindow.hide();
};

//创建表单
var addPanel = new Ext.form.Panel({
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
	items:[
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
					["0","超级管理员"],
					["1","管理员"],
					["2","员工"]
				]
			}),
			displayField:"frole",//使用哪个字段作为标签菜单
			mode:"local",//数据源来自本地
			typeAhead:false,//是否会自动填充
			forceSelection:true//是否强制用户只能通过选择的方式交互
		}
	],
	buttons:[
		{
			text:"确定",
			handler:submit
		},{
			text:"重置",
			handler:function(){
				addPanel.getForm().reset();
			}
		}
	]
});

//创建窗口
var addWindow = new Ext.Window({
	title:"新增用户",
	width:400,
	height:300,
	layout:"fit",
	plain:true,//如果渲染窗体背景是透明的，那它就会融合到框架元素中
	modal:true,//如果显示窗口模式并隐藏其后面的所有内容，则为false，以显示它，而不会限制对其他UI元素的访问
	closeAction:"hide",
	items:addPanel
});

userPanel = new Ext.grid.Panel({
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
				
			}
		},{
			text:"删除",
			iconCls:"btn-del",
			handler:function(){}
		}
		
	],
	viewConfig:{
		forceFit:true,
		stripeRows:true
	},
	store:store,
	selModel:selModel,
	columns:[
		{header:"ID",flex:1,dataIndex:"id",sortable:true},
		{header:"姓名",flex:1,dataIndex:"username",sortable:true},
		{header:"年龄",flex:1,dataIndex:"age",sortable:true},
		{header:"角色",flex:1,dataIndex:"userrole",sortable:true}
	]
});