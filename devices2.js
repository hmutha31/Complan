var tableRefresh=30000;
// http://dev.virtualveda.in/vv/len/h2h/api/public/mis/devices

function getDeviceListing()
{
    $("#tbody").html("");   
	console.log("inside list");
	$.getJSON("http://dev.virtualveda.in/h2h_api/user/devices" , function(data)
      {
      	console.log("got json data");
        $.each(data.devices,function(index,element)
         {
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
      }//end of json fn 

		)//end of json fn
}//end of func

 setInterval(getDeviceListing,tableRefresh);

$(function()
  {
     getDeviceListing();
     console.log(document.cookie);
  }
	);