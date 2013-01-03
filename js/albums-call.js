// JavaScript Document

$(document).ready(function(){
		$.getJSON("albums.js",function(data){
			var jsonObj = data['albums_list'];
			var len = jsonObj.length;
			//console.log(len);
			var p = (len/9) + 1;
			var pages = Math.floor(p);
			//console.log(pages);
			for (var c = 1; c <=pages; c++)
			{
				$("#carousel").append('<li id="page' + c + '"></li>');
				//console.log(c);
			}
			$.each(data['albums_list'], function(i,item){
				var j = i +1;
				var k="#img" + j;
				var x = Math.floor(j/9);
				if (j%9 != 0)
				{
					x = x+1;
				}
				var index = "#page" + x;
				//console.log(index);
				//console.log(item.created_by);
				$(index).append('<div tabindex="' + j + '"><a><img src="' + item.image_uri + '" alt="thumbnail" id="' + k + ' "/></a><span class="span2">' + item.title + '</span><span class="span2">' + item.primary_artist + '</span><p class="hidden">' + item.product_uri + '</p></div>');
				console.log(item.product_uri);
			});
			
			$('.flexslider').flexslider({animation: "slide",controlNav: false, slideshow: false, keyboard: false});
		});
		
			$('#setting-tab').bind('click',function(){
					console.log('clicked....!!!')
			});
	});