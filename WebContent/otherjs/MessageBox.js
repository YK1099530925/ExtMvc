Ext.onReady(
		function(){
			/*Ext.MessageBox.alert("欢迎","欢迎光临",function(e){
				if(e == "ok"){
					document.write("你点击了ok");
				}else{
					document.write("你点击了取消");
				}
			});*///弹出对话框，之后可以跟一个回调函数，它接收一个值（你点击确定还是×）作为参数，然后可以对这个值进行判断
			
			//Ext.MessageBox.confirm("确定");//用来确定和取消
			//Ext.MessageBox.prompt("确定");//用来输入一些信息
			//Ext.MessageBox.show();//可以用show实现上面的功能，还可以实现进度条
			
			/*Ext.MessageBox.confirm("保存文件","是否保存文件",function(e){
				if(e == "yes"){
					Ext.MessageBox.alert("成功","保存文件成功");
				}else{
					Ext.MessageBox.alert("失败","不保存文件");
				}
			});*/
			
			/*Ext.MessageBox.prompt("姓 名","请输入您的姓名",function(e,text){
				alert(e);
				alert(text);
			},null,true);*/
			
			/*Ext.MessageBox.show({
				title:"欢迎",
				msg:"很高兴见到你",
				buttons:Ext.MessageBox.OKCANCEL
			});*///接收的参数是一个对象
			
			//进度条
			Ext.MessageBox.show({
				title:"进度条",
				msg:"5秒后进入系统",
				progress:true,
				width:500,
				wait:true,
				waitConfig:{
					interval:500,
					duration:5000,
					fn:function(){
						Ext.MessageBox.hide();
					}
				}
			});
		}
);