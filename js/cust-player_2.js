$(document).ready(function(){

  
	var myPlaylist = new jPlayerPlaylist({
	   
		jPlayer: "#jquery_jplayer_N",
		cssSelectorAncestor: "#jp_container_N"
	}, [
		/*{
			title:"Cro Magnon Man",
			artist:"The Stark Palace",
			mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
			oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
			poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
		},
		{
				title:"Hidden",
				artist:"Miaow",
				free: true,
				mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
				oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
				poster: "http://www.jplayer.org/audio/poster/Miaow_640x360.png"
			} */ 
	], {
		playlistOptions: {
			enableRemoveControls: true
		}
		//swfPath: "js",
		 //supplied: "mp3, oga",
		// wmode:"window",
		//solution: "html,flash"
	});
  
   $("#jquery_jplayer_N").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                mp3: "",
            }).jPlayer("play"); // auto play
        },
        ended: function (event) {
            $(this).jPlayer("play");
        },
        swfPath: "js",
        supplied: "mp3",
		 wmode:"window",
		solution: "html,flash"
    })
  
   
    	/*console.log(myPlaylist.playlist.push({
            title:   "loreum ipsum",
            artist: "dolor",
            free:  true,
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
			poster: ""
        }));*/
         
	 
	$("#clkadd").click(function() {
		    
			myPlaylist.add({
            title:   $(this).html(),
            artist: "dolor",
            free:  true,
			//mp3:"http://audio.spinr.in/audio/26/prod_26258837/26258837_128k_44S_2C_cbr1x.mp3",  
			 mp3:"http://audio.spinr.in/audio/26/prod_26243254/26243254_128k_44S_2C_cbr1x.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
			poster: "http://localhost/spinr-web/img/thumb.jpg"
           });
		 }); 	 
		
	
	// Click handlers for jPlayerPlaylist method demo

	// Audio mix playlist

	/*$("#playlist-setPlaylist-audio-mix").click(function() {
		myPlaylist.setPlaylist([
			{
				title:"Cro Magnon Man",
				artist:"The Stark Palace",
				mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
				oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
				poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
			},
			{
				title:"Your Face",
				artist:"The Stark Palace",
				mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
				oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg",
				poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
			},
			{
				title:"Hidden",
				artist:"Miaow",
				free: true,
				mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
				oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
				poster: "http://www.jplayer.org/audio/poster/Miaow_640x360.png"
			},
			{
				title:"Cyber Sonnet",
				artist:"The Stark Palace",
				mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
				oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg",
				poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
			},
			{
				title:"Tempered Song",
				artist:"Miaow",
				mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
				oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg",
				poster: "http://www.jplayer.org/audio/poster/Miaow_640x360.png"
			},
			{
				title:"Lentement",
				artist:"Miaow",
				mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
				oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg",
				poster: "http://www.jplayer.org/audio/poster/Miaow_640x360.png"
			}
		]);
	}); */



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