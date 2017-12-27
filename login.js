var name= $("#name").val();
     var pass = $("#password").val();

$(function()
{
$("#button").click(function()
  {
    $.ajax(
    {
    	type: 'POST',
    url: 'http://dev.virtualveda.in/vv/len/h2h/api/public/user/login',
    dataType: 'json',
    //whatever you need
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', make_base_auth(name, pass));
    },
    success: function (data) {
    	console.log(data);
    	window.load("devices.html");
    }

    })
  }//end of click
	)//end of click

});



	
  function make_base_auth(user,password)
  {
  	var tok = user + ':' + password;
    var hash = btoa(tok);
    console.log(hash);
    $.cookie("username" , user);
    $.cookie("password" , password);
    console.log($.cookie("username"));
    return 'Basic ' + hash;
  }