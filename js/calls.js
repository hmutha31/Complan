var refreshTime=30000;
//code to get token 
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
	$("#tbody").html("");
	var base_url_string="https://s3.ap-south-1.amazonaws.com/virtualveda/";
    var base_url = new URL(base_url_string);
	var url_string = window.location.href;
	var url = new URL(url_string);
	var c = url.searchParams.get("device");
    var date= $("#selected_date").val(); //variable for date filter;
    if(date==undefined || date == ""){
    	date = "";
    }
    else{
    	date = "/"+date;
    }
    console.log(date);
	var api_url = "http://dev.virtualveda.in/h2h_api/mis/calls/"+c+date;
	console.log(api_url);
	var rec1_string="";
	var rec2_string="";
	var img_string="";
	var i=1;
	var token = _readCookie('token');
	$.ajax(
	{
        type : 'GET' ,
        url : api_url,
        dataType : 'json',
        headers : 
        {
        	'Authorization' : 'Bearer ' +token
        },
        success : function(data)
        {
        $.each(data.calls,function(index,element)
             {
              var rec1;
              var rec2;
                if(element.recording1=="")
                {
                	rec1_string=base_url+element.recording1;
                }
                else
                {
                	rec1_string=base_url+element.recording1;
                	rec1=new URL(rec1_string);
                }

                if(element.recording2=="")
                {
                	rec2_string=base_url+element.recording2;
                }
                else
                {
                	rec2_string=base_url+element.recording2;
                	rec2=new URL(rec2_string);
                }
                // var img = element.photo;
                if(element.photo=="")
                {
                img_string = base_url+element.photo;
                 // var img_url = new URL(img_string);
                }
                else
                {
                	img_string=base_url+element.photo;
                	var img_url=new URL(img_string);
                }
                
              $("#tbody").append(
               "<tr>" + 
               "<td class='no'>" + i+"</td>"+
               "<td class='promoter'>" + validateObj(element.username) + "</td>" +
               "<td class='saleType'>" + validateObj(element.sale_type) + "</td>" +
               "<td class='consumer_mobile'>" + validateObj(element.mobile_number) + "</td>"+
               "<td class='feedText'>" +   validateFeedback(element.feedback_text) + " </td>"+
               "<td class='location'>" + "<a target='_blank' href='http://maps.google.com/?q="+ validateObj(element.lat) +"," + validateObj(element.lng)+"'>" +validateObj(element.lat) +"," + validateObj(element.lng)+"</a>" + "</td>"+
               "<td class='recording'>" + "1." + validateRec(rec1) + "<br>" + "2." + validateRec(rec2) + "</td>" +              
               "<td class='photo'>" +  validatePhoto(img_url) + "</td>"+
               "<td class='date_time'>" + element.created + "</td>" +
               "<td class='choice'>" + validateChoice(element.complan) +"</td>"+
               "<td class='choice'>" + validateChoice(element.horlicks) +"</td>"+
               "<td class='choice'>" + validateChoice(element.boost) +"</td>"+
               "<td class='choice'>" + validateChoice(element.bournvita) +"</td>"+
               "<td class='choice'>" + validateChoice(element.other) +"</td>"+
               "<td class='choice'>" + validateChoice(element.none) +"</td>"+
               "<td class='interactions'>" + validateInteraction(element.new) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.start) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.protein_challenge) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.play_video) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.promo_offer) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.sale) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.sample) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.mobile) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.otp) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.dosage) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.feedback) + "</td>"+
                "<td class='interactions'>" + validateInteraction(element.end) + "</td>"+
                "</tr>"+
                 i++
                
              	)//end of append         

             }//end of each
        	);//end of each
      
      },//end of success fn
      error : function(xhr)
      {
      	console.log(xhr.status + "Error receiving data")
      }
		
});//end of ajax

}//end of fn getData

function validateObj(obj)
{
	if(obj==null)
	{
		return "No data available";
	}
	else
	{
		return obj;
	}
}

function validateRec(obj1)
{
   if(obj1==undefined)
   {
   	return null;
   }
   else
   {
   	return obj1;
   }
}

function validateChoice(obj2)
{
   if(obj2=='true')
   {
   	return ('<i class="fa fa-check" style="color:green; font-size:20px" aria-hidden="true"></i>');
   }
   else
   {
   	return('<i class="fa fa-times " style="color:#B02121;  font-size:20px" aria-hidden="true"></i>');
   }
}

function validatePhoto(obj3)
{
	try
	{
		if(obj3==null || obj3=="" || obj3==undefined)
		{
			return ("<p>No image</p>");
		}
		else
		{
			return ("<img onclick='showImage(\""+obj3+"\")' width='50' height='50' class='lazy' style='margin:auto'  src='"+obj3+"'>");
		}
	}
	catch(e)
	{
		console.log(e);
	}
}

function validateRec(obj)
{
	try
	{
		if(obj==null || obj=="" || obj==undefined)
		{
			return ("<p> No Recording taken </p>");
		}
		else
		{
			return("<audio controls preload='none'>" + "<source src='"+obj+"'>"+ "</audio>");
		}
	}
	catch(e)
	{
		console.log(e);
	}
}

function validateInteraction(obj4)
{
	if(obj4=="")
		return ('<i class="fa fa-times " style="color:#B02121;  font-size:20px" aria-hidden="true"></i>');
	else
	{
		return ('<i class="fa fa-check" style="color:green; font-size:20px" aria-hidden="true"></i>');
	}
}

function validateFeedback(obj5)
{
	if(obj5=="")
		{
			var text="no feedback given!";
			return ('<p style="color:#B02121">' + text + "</p>");
		}
	else
		{
			return('<p style="color:green">' + obj5+"</p>");
		}
}


	
	

$(function()
{
	var year=new Date().getFullYear();
	var month=new Date().getMonth()+1;
	
	var day=new Date().getDate();
	
	var date=year +"-"+month+"-"+day;
	$("#selected_date").val(date);
   getData();
   $(".thumb").click(function() {
   	var src_string=$(".thumb").attr("src");
   	var src=new URL(src_string);
			$('.enlargeImageModalSource').attr('src',src);
			$('#enlargeImageModal').modal('show');
		});
}
	);

function showImage(src_string)
{
	$('.enlargeImageModalSource').attr('src',src_string);
	$('#enlargeImageModal').modal('show');

}

