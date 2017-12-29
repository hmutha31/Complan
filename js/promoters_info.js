function getData()
{
	var token1 = _readCookie('token');
	console.log(token1);
	 $.ajax(
	 {
       type : 'GET' ,
       url : 'http://dev.virtualveda.in/vv/len/h2h/api/public/user/list',
       dataType : 'json',
       headers :
       {
       	'Authorization' : 'Bearer ' + token1
       },
       success : function(data)
       {
       	$.each(data.users,function(index,element)
         {
           $("#tbody").append(
           "<tr>" +
           
           "<td class='data'>" + element.mobile + "</td>" +
           "<td class='data'>" + element.password + "</td>"+
           "</tr>"
           )
       })//end of each
       }

         });//end of ajax     		
}//end of fn
	 
function _readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
     for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);

        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function add_promoter()
{
	var mobile=$("#in_mobile").val();
	var pass=$("#in_pass").val();
     var token1 = _readCookie('token');
     $.ajax(
     {
       type : 'POST',
       dataType : 'json',
       url : 'http://dev.virtualveda.in/vv/len/h2h/api/public/user/add',
       data : '{"mobile":"'+mobile+'","password":"'+pass+'"}',
       contentType : 'application/json',
       headers : 
       {
       	'Authorization' : 'Bearer ' + token1
       },

       success : function(data)
       {
          $("#tbody").append(
           	"<tr>" +
           	"<td class='data'>" + mobile + "</td>" +
           	"<td class='data'>" + pass + "</td>" +
           	"</tr>"
          	)
          $("#msg").text(""),
          $("#msg").text("Promoter Successfully Added !"),
          $("#in_mobile").val(""),
          $("#in_pass").val(""),
          $("#tbody").html(""),
          getData()
       },
       error : function(data)
       {
       	// $("#msg").text(""),
       	// $("#msg").text(   data.responseJSON.message),
       	// $("#in_mobile").val(""),
       	// $("#in_pass").val(""),
       	if(data.responseJSON.message=="Invalid or Expired Token")
       	{
       		alert(data.responseJSON.message),
       		location.href="../admin/promoter_login.html";
       	}
       	else
       	{
       		$("#msg").text(""),
       	$("#msg").text(   data.responseJSON.message),
       	$("#in_mobile").val(""),
       	$("#in_pass").val("")
       	}
       	// if(data.responseJSON.message=="Invalid or Expired Token")
       	// {
       	// 	document.cookie="token1=''",
       	// 	location.href="login2.html"
       	// },

       }



     });//end of ajax


	//end of click
}

$(function()
  {
     getData();
  }
	);


