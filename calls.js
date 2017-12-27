var refreshTime=30000;


function getData()
{
	console.log("1");
	$("#tbody").html("");
	var base_url_string="https://s3.ap-south-1.amazonaws.com/virtualveda/";
    var base_url = new URL(base_url_string);
    console.log(base_url);
	var url_string = window.location.href;
	var url = new URL(url_string);
	var c = url.searchParams.get("device");
    var date= $("#selected_date").val(); //variable for date filter;
    //conso'.log
    console.log(date);
    if(date==undefined || date == ""){
    	date = "";
    }
    else{
    	date = "/"+date;
    }
    console.log(date);
	var api_url = "http://dev.virtualveda.in/vv/len/h2h/api/public/mis/calls/"+c+date;
	var url_link = new URL(api_url);
	console.log(url_link);
	var rec1_string="";
	var rec2_string="";
	var img_string="";
	var i=1;
	$.ajax(
	{
		type : 'GET',
		dataType : 'json',
		url : url_link,
		beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer "+token);
        },
        succcess : function(data)
        {
        $.each(data.calls,function(index,element)
             {
             	// console.log(element.recording1);
             	// rec1_string=base_url+element.recording1;
             	// var rec1 = new URL(rec1_string);
             	// // console.log(rec1);
             	// rec2_string=base_url+element.recording2;
              //   var rec2 = new URL(rec2_string);
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
                // img_string = base_url+element.photo;
                // var img_url = new URL(img_string);
                // console.log(img_url);
              $("#tbody").append(
               "<tr>" + 
               "<td class='no'>" + i+"</td>"+
               "<td class='promoter'>" + validateObj(element.username) + "</td>" +
               "<td class='saleType'>" + validateObj(element.sale_type) + "</td>" +
               "<td class='consumer_mobile'>" + validateObj(element.mobile_number) + "</td>"+
               "<td class='feedText'>" +   validateFeedback(element.feedback_text) + " </td>"+
               "<td class='location'>" + "<a target='_blank' href='http://maps.google.com/?q="+ validateObj(element.lat) +"," + validateObj(element.lng)+"'>" +validateObj(element.lat) +"," + validateObj(element.lng)+"</a>" + "</td>"+
               // "<td class='recording'>"+"1." +"<audio controls preload='none'>"+"<source src='"+validateRec(rec1)+"'>" + "</audio>"+ "<br>" +
               // "2."+"<audio controls preload='none'>"+"<source src='"+validateRec(rec2)+"'>" + "</audio>" +"</td>"+
               "<td class='recording'>" + "1." + validateRec(rec1) + "<br>" + "2." + validateRec(rec2) + "</td>" +
               // "<td class='recording'>" +"<audio controls>"+"<source src='rec1'>" + "</audio>"+
               "<td class='photo'>" +  validatePhoto(img_url) + "</td>"+
               //"<td class='photo'>" + "<img class='thumb' width='50' height='50' src='"+img_url+"' data-src='"+img_url+"' >"+"</td>" +
               "<td class='date_time'>" + element.created + "</td>" +
               "<td class='choice'>" + validateChoice(element.complan) +"</td>"+
               "<td class='choice'>" + validateChoice(element.horlicks) +"</td>"+
               "<td class='choice'>" + validateChoice(element.boost) +"</td>"+
               "<td class='choice'>" + validateChoice(element.bournvita) +"</td>"+
               "<td class='choice'>" + validateChoice(element.other) +"</td>"+
               "<td class='choice'>" + validateChoice(element.none) +"</td>"+
               // "<td>" +validateChoice(element.none)+"</td>"+
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
                // "<td class='interactions'>" + validateInteraction(element.created) + "</td>"+
                "</tr>"+ i++
                
              	)//end of append         

             }//end of each
        	)//end of each
	}
});
      
      
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
   getData();
  //  $(".thumb").on("click",function()
  //    {
  //    	var src = $(this).attr("src");
  //    	console.log(src);
  //    	$("#modalImage").attr("src" , src);
  //    	$("#imgmod").modal("show");
  //    }
		// );
   $(".thumb").click(function() {
   	var src_string=$(".thumb").attr("src");
   	console.log(src_string);
   	var src=new URL(src_string);
   	console.log(src);
			$('.enlargeImageModalSource').attr('src',src);
			$('#enlargeImageModal').modal('show');
		});
   console.log(document.cookie);
   
   // $(".thumb"),error(function()
   //    {
   //    	$(this).hide();
   //    }   	);
   //  // $('.thumb').lazyload();  
}
	);

function showImage(src_string)
{
	console.log('here');
	//var src_string=$(".thumb").attr("src");
   	console.log(src_string);
   	//var src=new URL(src_string);
   	//console.log(src);
	$('.enlargeImageModalSource').attr('src',src_string);
	$('#enlargeImageModal').modal('show');


}

// "<img width='50' height='50' class='lazy thumb' style='margin:auto'  src='"+obj3+"'>";
