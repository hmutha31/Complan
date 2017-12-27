var refreshTime=30000;//to refresh data
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

// var token=readCookie('token');
// console.log(token);

// "http://dev.virtualveda.in/vv/len/h2h/api/public/calls/stats"

// function getData_old() //function to get JSON 
// {
//    $.getJSON("http://dev.virtualveda.in/vv/len/h2h/api/public/calls/stats" ,function(data,status)
//       {
//           if(status=="error" || status=="notmodified" || status=="timeout" || status=="parsererror")
//           {
//           	console.log("check link!");
//           }
//           else
//           {
//           try
//           {
//           console.log("inside func");
//           $("#completeCallsToday").text(validate(data.stats["complete_calls"].today));
//           $("#completeCallsAllTime").text(validate(data.stats["complete_calls"].alltime));            
//           console.log("end of row1");
//            $("#sampleToday").text(validate(data.stats["sample"].today));
//            $("#sampleAllTime").text(validate(data.stats["sample"].alltime));
//            console.log("end of row2");
//            $("#saleToday").text(validate(data.stats["sale"].today));
//            $("#saleAllTime").text(validate(data.stats["sale"].alltime));  
//               }
//             catch(e)
//             {
//             	console.log("check api!");
//             }
//           }
//     }) //brackets for JSON fn

// } //end of fn getData 

function getData() //function to get JSON 
{
	console.log("in getData");
	var token = _readCookie('token');
	console.log(token);

    $.ajax(
    {
        type: 'GET',
        url: 'http://dev.virtualveda.in/h2h_api/user/stats',
        dataType: 'json',
        //whatever you need
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer "+token);
        },
        success: function(data,status)
        {
          if(status=="error" || status=="notmodified" || status=="timeout" || status=="parsererror")
          {
            console.log("check link!");
          }
          else
          {
                  console.log("inside func");
                  $("#completeCallsToday").text(validate(data.stats["complete_calls"].today));
                  $("#completeCallsAllTime").text(validate(data.stats["complete_calls"].alltime));            
                  console.log("end of row1");
                   $("#sampleToday").text(validate(data.stats["sample"].today));
                   $("#sampleAllTime").text(validate(data.stats["sample"].alltime));
                   console.log("end of row2");
                   $("#saleToday").text(validate(data.stats["sale"].today));
                   $("#saleAllTime").text(validate(data.stats["sale"].alltime));  
          }
        }
    }); //brackets for JSON 
} //end of fn getData 


setInterval(getData,refreshTime);  //interval to update data in the table 

function validate(obj) //function to validate content of obj
{
   if(obj==null)
   	return "null";
   else
   	return obj;
}

function createChart1()
{
	var token=readCookie('token');
console.log(token);
	$.ajax(
	{
					type:'GET',
					url : "http://dev.virtualveda.in/h2h_api/user/stats",
					dataType:'json',
					headers :
					{
						'Authorization' : 'Bearer '+token
					},
					success : function(data)
					{
				console.log("1");
				var chartRefresh=10000;
			    
			var ctx = document.getElementById("myChart1");
			var myChart1 = new Chart(ctx, 
			{
			    type: 'pie',
			    data: {
			        labels: ["Sale", "Sample"],
			        datasets: [{
			            label: 'All Time',
			            data: [data.stats["sale"].alltime, data.stats["sample"].alltime],
			            backgroundColor: [
			                '#f1183b',
			                '#929091',
			            ],
			            borderColor: [
			                'white',
			                'white',
			            ],
			            borderWidth: 1
			        }]
			    },
			    options: {
			    	 legend :
			         {
			         	position:"bottom"
			         }
			             }        
            })
                    }
    });
}
setInterval(createChart1,refreshTime);

function createChart2()
{
	var token=readCookie('token');
console.log(token);
    $.ajax(
    {
    	type : 'GET',
    	url : "http://dev.virtualveda.in/h2h_api/user/stats",
		dataType:'json',
		headers :
			{
			  'Authorization' : 'Bearer '+token
			},
			success : function(data)
			{
				console.log("2");
			var ctx1 = document.getElementById("myChart2");
			var myChart2 = new Chart(ctx1, {
			    type: 'pie',
			    data: {
			        labels: ["Sale", "Sample"],
			        datasets: [{
			            label: 'All Time',
			            data: [data.stats["sale"].today, data.stats["sample"].today],
			            backgroundColor: [
			                '#f1183b',
			                '#929091',
			            ],
			            borderColor: [
			                'white',
			                'white',
			            ],
			            borderWidth: 1
			        }]
			    },
			    options: {
			         legend :
			         {
			         	position:"bottom"
			         }
			    }
			})
		}
			
});
}
setInterval(createChart2,refreshTime);


// function toggle()
// {
// 	var deviceTable=document.getElementById("dd");
// 	if(deviceTable.style.display=="none")
// 	{
// 		deviceTable.style.display="block";
// 		$("#buttonText").text("^");
// 	}
// 	else
// 	{
// 		deviceTable.style.display="none";
// 		$("#buttonText").text("View Device Listing");
// 	}
// }

//toggle2

$(function()
{
   getData();
   //createChart1();
   //createChart2();
   console.log(document.cookie);
   // toggle();
	});
