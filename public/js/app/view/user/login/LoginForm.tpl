<div id="vk_api_transport"></div>
<script type="text/javascript">
	window.vkAsyncInit = function() {
    	VK.init({
      		apiId: <%= vkAppId %>
    	});
  	};

  	setTimeout(function() {
    	var el = document.createElement("script");
    	el.type = "text/javascript";
    	el.src = "http://vkontakte.ru/js/api/openapi.js";
    	el.async = true;
    	document.getElementById("vk_api_transport").appendChild(el);
  	}, 0);
</script>
</script>
<div class="alert-box"></div>
<div class="app-description">
	<h1><%= welcome %></h1>
	<div style="line-height:20px" class="text">
		&nbsp;&nbsp;&nbsp;&nbsp;<%= ssDescription %>
	</div>
</div>

<div class="auth-container">
	<span>Log In</span>
	<form action="#" method="post" id="login-form">
		<input type="text" placeholder="E-mail" name="email" class="email textfield"><br/>
		<input type="password" id="password" placeholder="<%= passwordPlaceholder %>" name="password" class="textfield">
		<input type="submit" id="login-button" class="btn" style="width: 100px" value="<%= logIn %>"></input>
	</form>
	<center><%= socialLogIn %></center>
	<br/>
	<br/>
</div>