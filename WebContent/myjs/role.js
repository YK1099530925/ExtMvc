roleStore = Ext.create('Ext.data.JsonStore',{
	storeId:"id_roleStore",
	autoLoad:true,
	fields:[
		{name:"id",type:"int"},
		{name:"role",type:"string"},
		{name:"describ",type:"string"}
	],
    proxy:{
    	type: 'ajax',
    	url:"../roleDataSelect",
        reader: {
            type: 'json',
            root: 'roles'
        }
    }
});

//设置复选框
selModel = new Ext.selection.CheckboxModel({
	injectCheckbox:0,
	checkOnly:true
});

rolePanel = function(){
	rolepanel = Ext.create('Ext.grid.Panel',{
		width:window.innerWidth - 200,
		height:300,
		frame:true,
		tbar:[
			{
				text:"新增",
				iconCls:"btn-add",
				handler:function(){				
					
				}
			},{
				text:"编辑",
				iconCls:"btn-edit",
				handler:function(){
					
				}
			},{
				text:"日志",
				iconCls:"btn-del",
				handler:function(){
					Ext.Ajax.request({
						url:"../login_log",
						method:"post",
						params:{'username':'yk',
								'password':'123123'},
						success:function(response,options){
							alert(response.responseText);
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
		//用这两种方式都能讲Store添加到grid中
		//store:Ext.data.StoreManager.lookup("id_roleStore"),
		store:roleStore,
		selModel:selModel,
		columns:[
			{
				header:"ID",flex:1,dataIndex:"id",sortable:true
			},{
				header:"角色",flex:1,dataIndex:"role",sortable:true
			},{
				header:"描述",flex:1,dataIndex:"describ",sortable:true
			}
		]
	});
	return rolepanel;
}