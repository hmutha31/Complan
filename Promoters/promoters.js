function getData()
{
	var token = _readCookie('token');
	 $.ajax(
	 {
       type : 'GET' ,
       dataType : 'json',
       headers :
       {
       	'Authorization' : 'Bearer ' + token
       },
       success : function(data)
       {
       	$.each(data.users,function(index,element)
         {
           $("#tbody").html("");
           $("tbody").append(
           "<tr>" +
           "<td class='data'>" + element.id + "</td>" +
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
	console.log("readCookie c:"+c);
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	console.log("readCookie c:"+c);

        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

$(function()
  {
     getData();
  }
	);

