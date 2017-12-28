function getData()
{
	var token1 = _readCookie('token1');
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
	console.log(mobile,pass);
     var token1 = _readCookie('token1');
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
       	 // 'Content-Type' : 'application/json'
       },

       success : function(data)
       {
          $("#tbody").append(
           	"<tr>" +
           	"<td class='data'>" + data.mobile + "</td>" +
           	"<td class='data'>" + data.password + "</td>" +
           	"</tr>"
          	)
       }



     });//end of ajax


	//end of click
}

$(function()
  {
     getData();
  }
	);

