// var name= $("#name").val();
//      var pass = $("#password").val();

$(function()
{
$("#button").click(function()
  {

  	var name= $("#name").val();
     var pass = $("#password").val();
    $.ajax(
    {
    	type: 'POST',
    url: "http://dev.virtualveda.in/vv/len/h2h/api/public/user/login",
    dataType: 'json',
    //whatever you need
    // beforeSend: function (xhr) {
    //     xhr.setRequestHeader('Authorization', make_base_auth(name, pass));
    // },
    headers :
    {
    	'Authorization' : 'Basic '  +  make_base_auth()
    },
    success: function (data) {
    			console.log(data);
    	// window.load("devices.html");
    	        var token;
               	token=data.token;
               	console.log(token);
               
    	}
    }
    )

    })
  

});

// http://dev.virtualveda.in/vv/len/h2h/api/public/user/login'

	
  function make_base_auth()
  {
  	var name= $("#name").val();
     var pass = $("#password").val();
     console.log(name,pass);
  	var tok = name + ':' + pass;
    var hash = btoa(tok);
    console.log(hash);
    // $.cookie("username" , user);
    // $.cookie("password" , password);
   //  document.cookie="username="+user;
   //  document.cookie="password="+password;
   // var x =decodeURIComponent(document.cookie);
   //  console.log(x);
    // console.log($.cookie("username"));
    return  hash;
  }

  function bearerToken(token)
  {
  	document.cookie = "Bearer="+token;
  	console.log(token);
  	return 'Bearer' + token;
  }