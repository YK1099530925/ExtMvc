testStore = new Ext.data.JsonStore({
	autoLoad:true,
	fields:[
		{name:"id",type:"int"},
		{name:"username",type:"string"},
		{name:"age",type:"int"},
		{name:"userrole"}
	],
    proxy:{
    	type: 'ajax',
    	//url:"../userDataSelect",
    	url:"../data/user.json",
    	
        reader: {//reader解析器，解析json，array等数据
            type: 'json',
            root: 'roots'
        }
    }
});

//设置复选框
testSelModel = new Ext.selection.CheckboxModel({
	injectCheckbox:0,
	checkOnly:true
});

testUserPanel = function(){
	var gridPanel = new Ext.grid.Panel({
		width:window.innerWidth - 200,
		height:300,
		frame:true,
		tbar:[
			{
				text:"新增",
				iconCls:"btn-add",
				handler:function(){
					//addWindow.show();
				}
			},{
				text:"编辑",
				iconCls:"btn-edit",
				handler:function(){
				}
			},{
				text:"删除",
				iconCls:"btn-del",
				handler:function(){
				}
			}
			
		],
		viewConfig:{
			forceFit:true,
			stripeRows:true
		},
		store:testStore,
		selModel:testSelModel,
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
	return gridPanel;
};

testUserPanel1 = new Ext.grid.Panel({
	width:window.innerWidth - 200,
	height:300,
	frame:true,
	tbar:[
		{
			text:"新增",
			iconCls:"btn-add",
			handler:function(){
				//addWindow.show();
			}
		},{
			text:"编辑",
			iconCls:"btn-edit",
			handler:function(){
			}
		},{
			text:"删除",
			iconCls:"btn-del",
			handler:function(){
			}
		}
		
	],
	viewConfig:{
		forceFit:true,
		stripeRows:true
	},
	store:testStore,
	selModel:testSelModel,
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