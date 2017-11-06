var datas = [
	["101","张三","23","管理员"],
	["102","李四","24","超级管理员"],
	["103","王五","25","员工"]
]

Ext.grid.Panel({
	title:"用户数据",
	width:200,
	height:200,
	frame:true,
	viewConfig:{
		forceFit:true,
		stripeRows:true
	},
	store:{
		fields:["id","name","age","role"],
		autoLoad:true,
		data:datas
	},
	columns:[
		{header:"ID",width:30,dataIndex:"id",sortable:true},
		{header:"姓名",width:30,dataIndex:"name",sortable:true},
		{header:"年龄",width:30,dataIndex:"age",sortable:true},
		{header:"角色",width:30,dataIndex:"role",sortable:true}
	]
});