<div id="vk_api_transport"></div>
<script type="text/javascript">
	// window.vkAsyncInit = function() {
 //    	VK.init({
 //      		apiId: <%= vkAppId %>
 //    	});
 //  	};

 //  	setTimeout(function() {
 //    	var el = document.createElement("script");
 //    	el.type = "text/javascript";
 //    	el.src = "http://vkontakte.ru/js/api/openapi.js";
 //    	el.async = true;
 //    	document.getElementById("vk_api_transport").appendChild(el);
 //  	}, 0);
</script>

<div id="fb-root"></div>
<script>
  // Additional JS functions here
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '305283736244595', // App ID
      channelUrl : "http://#{window.location.host}/public/channel.html",
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional init code here

  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
     ref.parentNode.insertBefore(js, ref);
   }(document));
</script>
<div class="root">
	<h1 class="inline" style="font-size:120px">20 Shots</h1>
	<p class="help-inline" style="margin-top: 15px;">
		To Remember the best moments ever!
	</p>
	<input 
    style="margin-top:-50px;padding:10px 36px" 
    type="button" 
    id="fb-login-btn" 
    class="btn" value="Login Via Facebook" />
</div>