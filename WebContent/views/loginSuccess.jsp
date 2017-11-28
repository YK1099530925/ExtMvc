<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="../jquery/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="../extjs/ext-all-debug.js"></script>
<link rel="stylesheet" type="text/css" href="../resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="../css/main.css">
<script type="text/javascript" src="../myjs/role.js"></script>
<script type="text/javascript" src="../myjs/user.js"></script>
<script type="text/javascript" src="../myjs/centerPanel.js"></script>
<script type="text/javascript" src="../myjs/addTabPage.js"></script>
<script type="text/javascript" src="../myjs/mainWindow.js"></script>

<title>用户管理</title>
</head>
<body>
	<!-- 用input来保存session中用户的信息，以便在Ext中获取值
		  保存的信息只需要：id，username，password，userrole.role
	 -->
	 <input type="hidden" id="session_id" name="session_id" 
		value="${sessionScope.userLogin.id }">
	<input type="hidden" id="session_username" name="session_username" 
		value="${sessionScope.userLogin.username }">
	<input type="hidden" id="session_password" name="session_password" 
		value="${sessionScope.userLogin.password }">
	<input type="hidden" id="session_userrole" name="session_userrole" 
		value="${sessionScope.userLogin.userrole.role }">
	<!-- <div id="mainWindow"></div> -->
</body>
</html>