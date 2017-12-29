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

function getData()
{
	var token1 = _readCookie('token');
	console.log(token1);
	 $.ajax(
	 {
       type : 'GET' ,
       url : 'http://dev.virtualveda.in/vv/len/h2h/api/public/device/list',
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
           
           "<td class='data'>" + element.name + "</td>" +
           "<td class='data'>" + element.imei1 + "</td>"+
           "<td class='data'>" + element.imei2 + "</td>" +
           "</tr>"
           )
       })//end of each
       }

         });//end of ajax     		
}//end of fn


function add_device()
{
	var token1 = _readCookie('token');
	var name=$("#device_name").val();
	var id1=$("#id1").val();
	var id2=$("#id2").val();
	$.ajax(
	{
		type : 'POST' ,
		dataType : 'json',
		url : 'http://dev.virtualveda.in/vv/len/h2h/api/public/device/add',
		headers :
		{
			'Authorization' : 'Bearer ' + token1
		},
		contentType : 'application/json',
		 data : '{"name":"'+name+'","imei1":"'+id1+'","imei2":"'+id2+'"}',
		 success : function(data)
		 {
		 	$("#tbody").append(
              "<tr>"+
              "<td class='data'>"+ name + "</td>" +
              "<td class='data'>" + id1 + "</td>" +
              "<td class='data'>" + id2 + "</td>" +
              "</tr>" 
		 	) 
		  $("#msg").text(""),
          $("#msg").text("Device Successfully Added !"),
          $("#device_name").val("");
          $("#id1").val("");
          $("#id2").val("");
          getData();

		 },
		 error : function(data)
		 {
		 	if(data.responseJSON.message=="Invalid or Expired Token")
		 	{
		 		alert(data.responseJSON.message);
		 		location.href='../admin/promoter_login.html'
		 	}
		 	else
		 	{
		 		$("#device_name").val("");
          $("#id1").val("");
          $("#id2").val("");
           $("#msg").text("");
           $("#msg").text(data.responseJSON.message)
		 	}
		 }
	});//end of ajax
}

$(function()
   {
   	getData();
   }
	);