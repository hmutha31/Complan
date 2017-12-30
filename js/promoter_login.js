

$(function()
{
$("#button").click(function()
  {
  	
  	var name= $("#name").val();
     var pass = $("#password").val();
    $.ajax(
    {
    	type: 'POST',
    url: "http://dev.virtualveda.in/h2h_api/user/login",
    dataType: 'json',
    headers :
    {
    	'Authorization' : 'Basic '  +  make_base_auth()
    },
    success: function (data) {
    			console.log(data);
    	
    	        var token1;
               	token1=data.token;
               	// console.log(token1);
               	$("#errormsg").text("");
               	document.cookie="token=" + data.token;
               	var y=document.cookie;
               	// console.log(y);
               	location.href="../admin/info.html";
               
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
