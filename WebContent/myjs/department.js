departmentStore = Ext.create('Ext.data.JsonStore',{
	storeId:"id_roleStore",
	autoLoad:true,
	fields:[
		{name:"id",type:"int"},
		{name:"depart",type:"string"},
		{name:"empCount",type:"int"},
		{name:"xz",type:"string"}
	],
    proxy:{
    	type: 'ajax',
    	url:"../data/department.json",
        reader: {
            type: 'json',
            root: 'departs'
        }
    }
});

//设置复选框
selModel = new Ext.selection.CheckboxModel({
	injectCheckbox:0,
	checkOnly:true
});


departmentPanel = function(){
	departmentpanel = Ext.create('Ext.grid.Panel',{
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
		//用这两种方式都能讲Store添加到grid中
		//store:Ext.data.StoreManager.lookup("id_roleStore"),
		store:departmentStore,
		selModel:selModel,
		columns:[
			{
				header:"ID",flex:1,dataIndex:"id",sortable:true
			},{
				header:"部门",flex:1,dataIndex:"depart",sortable:true
			},{
				header:"人数",flex:1,dataIndex:"empCount",sortable:true
			},{
				header:"性质",flex:1,dataIndex:"xz",sortable:true
			}
		]
	});
	return departmentpanel;
}