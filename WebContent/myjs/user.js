var datas = [
	["101","张三","23","管理员"],
	["102","李四","24","超级管理员"],
	["103","王五","25","员工"]
]

var userDatas = {
	"total": 3,
	"rows":[
		{
			"id":"101",
			"name":"张三",
			"age":"23",
			"role":"管理员"
		},
		{
			"id":"102",
			"name":"李四",
			"age":"24",
			"role":"超级管理员"
		},
		{
			"id":"103",
			"name":"王五",
			"age":"25",
			"role":"员工"
		}
	]
}

var store = new Ext.data.JsonStore({
	fields:[
		{name:"id"},
		{name:"name"},
		{name:"age"},
		{name:"role"}
	],
	autoLoad:true,
	totalProperty: "total",
	data:userDatas,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});

//设置复选框
var selModel = new Ext.selection.CheckboxModel({
	injectCheckbox:0,
	checkOnly:true
});

var submit = function(){
	var form = addPanel.getForm();
	var userRecord = Ext.data.Model([
		{name:"id"},
		{name:"name"},
		{name:"age"},
		{name:"role"}
	]);
/*	var formFields = addPanel.getValues();
	formFields.id = store.data.length + 1 ;
	var rec = new userRecord(formFields,formFields.id);*/
	//store.add();
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
			id:"role",
			name:"role",
			fieldLabel:"角色"
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
			handler:function(){}
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
		{header:"姓名",flex:1,dataIndex:"name",sortable:true},
		{header:"年龄",flex:1,dataIndex:"age",sortable:true},
		{header:"角色",flex:1,dataIndex:"role",sortable:true}
	]
});