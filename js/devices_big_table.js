var tableRefresh=30000;
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}



function getDeviceListing()
{
	var token=readCookie('token');
console.log(token);
	$.ajax(
	{
       type : 'GET' ,
       url: 'http://dev.virtualveda.in/vv/len/h2h/api/public/mis/devices',
        dataType: 'json',
        //whatever you need
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer "+token);
        },
        success : function(data,status)
        {
        	$("#tbody").html("");
        	$.each(data.devices,function(index,element)
         {
         	// $("#tbody").html("");
           console.log("inside each");
           $("#tbody").append("<tr>" + 
           	"<td class='id'>" + element.id + "</td>" + 
           	"<td class='name'><a  target='_blank' href='calls.html?device=" + element.id + "'>" + element.name + "</a></td>" + 
           	// "<td class='complete_calls_today'>" + element.complete_calls.today + "</td>"+    
           	"<td class='cctoday'>" + element.stats["complete_calls"].today + "</td>"+
           	"<td class='ccall'>" + element.stats["complete_calls"].alltime + "</td>"+
           	"<td class='icctoday'>" + element.stats["incomplete_calls"].today + "</td>"+
           	"<td class='iccall'>" + element.stats["incomplete_calls"].alltime + "</td>"+
           	"<td class='saletoday'>" + element.stats["sale"].today + "</td>"+
           	"<td class='saleall'>" + element.stats["sale"].alltime + "</td>"+
           	"<td class='sampletoday'>" + element.stats["sample"].today + "</td>"+
           	"<td class='sampleall'>" + element.stats["sample"].alltime + "</td>"+
           	"</tr>");
         }

        	)//end of each loop
        },
        error : function(data)
        {
        	alert(data.responseJSON.message ),
        	location.href="../mis/index.html"
        }
	});
}

 setInterval(getDeviceListing,tableRefresh);

$(function()
  {
     getDeviceListing();
    
     var token=$.cookie("token");
  
  }
	);