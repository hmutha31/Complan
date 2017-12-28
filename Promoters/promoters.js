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
           "<td class='data'>" + element.id + "</td>" +
           "<td class='data'>" + element.mobile + "</td>" +
           "<td class='data'>" + element.password + "</td>"+
           "<td class='delete'>" + "<button class='pure-button delete_btn' type='button'>" + "<i class='fa fa-trash' id='del' aria-hidden='true'></i>"+
           "</button>" + "</td>" +  
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

$(function()
  {
     getData();
  }
	);

