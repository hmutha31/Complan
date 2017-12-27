// var name= $("#name").val();
//      var pass = $("#password").val();

$(function()
{
$("#button").click(function()
  {
  	// document.cookie="token=sometoken" ;
  	// location.href="devices.html";
  	// return;

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
               	$("#errormsg").text("");
               	document.cookie="token=" + data.token;
               	var x=document.cookie;
               	console.log(x);
               	location.href="devices.html";
               
    	},
    error : function(xhr)
    {
    	console.log(xhr.status,"Error"),
    	$("#name").val(""),
    	$("#password").val(""),
    	$("#errormsg").text("Incorrect Username or Password !")
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
   
    return  hash;
  }

  // function bearerToken(token)
  // {
  // 	document.cookie = "Bearer="+token;
  // 	console.log(token);
  // 	return 'Bearer' + token;
  // }