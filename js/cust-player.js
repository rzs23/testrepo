var baseurl = "http://atd0.spinr.in/dam";
var channel_id = "sonymusic";
var songsApi = "/songs/get_songs";
var artistApi = "/artists/get_artists";
var albumApi = "/albums/get_albums";
var genreApi = "/songs/get_genre_list";
var allGenreApi = "/songs/get_genre_home";
var tagApi = "/songs/get_tag_list";
var flexslider;

$(document).ready(function(){
	var myPlaylist = new jPlayerPlaylist({
	   
		jPlayer: "#jquery_jplayer_N",
		cssSelectorAncestor: "#jp_container_N"
	}, [

	], {
		playlistOptions: {
			enableRemoveControls: true,
			duration: '.jp-duration'
		}
	});
  
   $("#jquery_jplayer_N").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                mp3: "",
				preload: "auto",
            }).jPlayer("play"); // auto play
        },
       ended: function (event) {
           $(this).jPlayer("play");
        },
        swfPath: "js",
        supplied: "mp3",
		 wmode:"window",
		solution: "html,flash"
    });
	
	//localStorage.clear();
	////console.log(localStorage);
	for(var i = 0; i < localStorage.length; i++) {
	    console.log("foo"); 
	////console.log(localStorage.key(i));
		var item = localStorage.getItem(i);
	        console.log(item);
		var song_url = baseurl + songsApi + ".js?channel_id=" + channel_id + "&track_id=" + item+"&callback=?";
		console.log(song_url);
		$.getJSON(song_url,function(data){
		var jsonObj = $.parseJSON(data.songs_by_id);
			myPlaylist.add({
				title:   jsonObj.title,
				artist: jsonObj.primary_artist,
				free:  true,
				thumb: jsonObj.image_uri,  /* custom prop*/
				id : jsonObj.id,/* custom prop*/
				mp3:jsonObj.product_uri,
				oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
				poster: "http://localhost/spinr-web/img/thumb.jpg"
			});
		});
	}
	
	var index=0;
	var items = [];
	$('#carousel li div').live('click',function(){
		var tmpid = $(this).attr("id");
		//console.log(tmpid);
		if($.inArray(tmpid,items) > -1) {
			$('#clkadd').stop(true).html('Song already exist in playlist').css({'background':'#D52224'}).animate({top:'7%'},"500");
			setTimeout("$('#clkadd').animate({top:'-40%'},'slow')", 1000); //pause for 4 seconds and then fade out
		}

		else {
			
			items.push(tmpid);
			localStorage.setItem(index,tmpid);
			index++;
			var song = $('p',$(this)).html();
			myPlaylist.add({
				title:   $('span',$(this)).html(),
				artist: $('span:eq(1)',$(this)).html(),
				free:  true,
				thumb: $('img',$(this)).attr('src'),  /* custom prop*/
				id : $(this).attr('id'),/* custom prop*/
				mp3:song,
				oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
				poster: "http://localhost/spinr-web/img/thumb.jpg"
			});
			
			if($('.jp-play').is(":visible")){
				$('.jp-controls li:eq(1) a').trigger('click');
			}
			else{
				myPlaylist.next();
				//$('.jp-controls li:eq(3) a').trigger('click');
			}
			$('.song-thumb img').attr('src',myPlaylist.playlist[myPlaylist.current].thumb);
			$('.albmtitle h5').html(myPlaylist.playlist[myPlaylist.current].title); 
			$('#clkadd').stop(true).html('Song added to playlist!').css({'background':'#78932D'}).animate({top:'7%'},"500");
			setTimeout("$('#clkadd').animate({top:'-40%'},'slow')", 1000); //pause for 4 seconds and then fade out
		} 
	});
	
	$('#song-play div').live('click',function(){
		var tmpid = $(this).attr("id");
		//console.log(tmpid);
		if($.inArray(tmpid,items) > -1) {
			$('#clkadd').stop(true).html('Song already exist in playlist').css({'background':'#D52224'}).animate({top:'7%'},"500");
			setTimeout("$('#clkadd').animate({top:'-40%'},'slow')", 1000); //pause for 4 seconds and then fade out
		}

		else {
		
			items.push(tmpid);
			//localStorage.setItem(index,tmpid);
			index++;
			var song = $('p',$(this)).html();
			myPlaylist.add({
				title:   $('span',$(this)).html(),
				artist: $('span:eq(1)',$(this)).html(),
				free:  true,
				thumb: $('.albm-desc img').attr('src'),  /* custom prop*/
				id : $(this).attr('id'),/* custom prop*/
				mp3:song,
				oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
				poster: "http://localhost/spinr-web/img/thumb.jpg"
			});
			
			if($('.jp-play').is(":visible")){
				$('.jp-controls li:eq(1) a').trigger('click');
			}
			else{
				myPlaylist.next();
				//$('.jp-controls li:eq(3) a').trigger('click');
			}
			$('.song-thumb img').attr('src',$(".album-detail-wrap div img").attr("src"));
			$('.albmtitle h5').html(myPlaylist.playlist[myPlaylist.current].title); 
			$('#clkadd').stop(true).html('Song added to playlist!').css({'background':'#78932D'}).animate({top:'7%'},"500");
			setTimeout("$('#clkadd').animate({top:'-40%'},'slow')", 1000); //pause for 4 seconds and then fade out
		} 
	});
	
	$('.saveplaylist').click(function(){
		if(items.length == 0)
		alert("Add items to the playlist.");
		else
		{
			for( var i = 0; i<items.length; i++)
			{
					localStorage.setItem(i,items[i]);
			}
		}
	});
	
	$('.deleteplaylist').click(function(){
		if(items.length == 0)
		alert("No items in playlist.");
		else
		{
			localStorage.clear();
			items.splice(0,items.length);
		  
		}
		
	
	});
	
	
	$('.jp-playlist ul li .jp-playlist-item-remove').live('click',function(){
		var item_rmv = $(this).parents('li').attr('id');
		////console.log("item of play list"+$(this).parents('li').attr('id'));
		items.splice($.inArray($(this).parents('li').attr('id'), items),1);
		var c = items.length;
		////console.log(c);
		for(var i = 0; i < localStorage.length; i++) 
		{
			if(i < c)
			{
				localStorage.setItem(i, items[i]);
			}
			else
			{ localStorage.removeItem(i); }
		} 
		if(items.length == 0)
		 {
		    $('.jp-playlist').append('<p>No songs exists!!</p>');
		 
		  }
	});
			

	// The next/previous commands
	
	$("#playlist-next").click(function() {
		myPlaylist.next();
							
	});
	$("#playlist-previous").click(function() {
		myPlaylist.previous();
			});

	// The play commands

	$("#playlist-play").click(function() {
		myPlaylist.play();
	});

	// The pause command

	$("#playlist-pause").click(function() {
		myPlaylist.pause();
	});

	// Option: autoPlay

	$("#playlist-option-autoPlay-true").click(function() {
		myPlaylist.option("autoPlay", true);
	});
	$("#playlist-option-autoPlay-false").click(function() {
		myPlaylist.option("autoPlay", false);
	});

	// Option: enableRemoveControls

	$("#playlist-option-enableRemoveControls-true").click(function() {
		myPlaylist.option("enableRemoveControls", true);
	});
	$("#playlist-option-enableRemoveControls-false").click(function() {
		myPlaylist.option("enableRemoveControls", false);
	});

	// Option: displayTime

	$("#playlist-option-displayTime-0").click(function() {
		myPlaylist.option("displayTime", 0);
	});
	$("#playlist-option-displayTime-fast").click(function() {
		myPlaylist.option("displayTime", "fast");
	});
	$("#playlist-option-displayTime-slow").click(function() {
		myPlaylist.option("displayTime", "slow");
	});
	$("#playlist-option-displayTime-2000").click(function() {
		myPlaylist.option("displayTime", 2000);
	});

	// Option: addTime

	$("#playlist-option-addTime-0").click(function() {
		myPlaylist.option("addTime", 0);
	});
	$("#playlist-option-addTime-fast").click(function() {
		myPlaylist.option("addTime", "fast");
	});
	$("#playlist-option-addTime-slow").click(function() {
		myPlaylist.option("addTime", "slow");
	});
	$("#playlist-option-addTime-2000").click(function() {
		myPlaylist.option("addTime", 2000);
	});

	// Option: removeTime

	$("#playlist-option-removeTime-0").click(function() {
		myPlaylist.option("removeTime", 0);
	});
	$("#playlist-option-removeTime-fast").click(function() {
		myPlaylist.option("removeTime", "fast");
	});
	$("#playlist-option-removeTime-slow").click(function() {
		myPlaylist.option("removeTime", "slow");
	});
	$("#playlist-option-removeTime-2000").click(function() {
		myPlaylist.option("removeTime", 2000);
	});

	// Option: shuffleTime

	$("#playlist-option-shuffleTime-0").click(function() {
		myPlaylist.option("shuffleTime", 0);
	});
	$("#playlist-option-shuffleTime-fast").click(function() {
		myPlaylist.option("shuffleTime", "fast");
	});
	$("#playlist-option-shuffleTime-slow").click(function() {
		myPlaylist.option("shuffleTime", "slow");
	});
	$("#playlist-option-shuffleTime-2000").click(function() {
		myPlaylist.option("shuffleTime", 2000);
	});

	// Equivalent commands

// AVOID COMMANDS

	$("#playlist-avoid-1").click(function() {
		myPlaylist.remove(2); // Removes the 3rd item
		myPlaylist.remove(3); // Ignored unless removeTime=0: Where it removes the 4th item, which was originally the 5th item.
	});



});
