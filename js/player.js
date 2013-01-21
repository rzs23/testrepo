var baseurl = "http://atd0.spinr.in/dam";
var channel_id = "sonymusic";
var songsApi = "/songs/get_songs";
var artistApi = "/artists/get_artists";
var albumApi = "/albums/get_albums";
var genreApi = "/songs/get_genre_list";
var allGenreApi = "/songs/get_genre_home";
var tagApi = "/songs/get_tag_list";
var flexslider;

$(document).ready(function() {


    songs_in_playlist = initializePlaylist(); /* Instantiate playlist object and add existing items in localstorage to the playlist
                                                     and return an array of all song id's in the playlist */
    initializeJPlayer();

    //Handle clicking on songs appearing in the carousel
    $('#carousel li div').live('click', function() {
        var song_id = $(this).attr("id").trim();
        if (existsInPlaylist(song_id,songs_in_playlist)) {
            //Show a message indicating that song already added to playlist
            $('#clkadd').stop(true).html('Song already exist in playlist').css({
                'background': '#D52224'
            }).animate({
                top: '7%'
            }, "500");
            setTimeout("$('#clkadd').animate({top:'-40%'},'slow')", 1000); //pause for 4 seconds and then fade out
        } else {
	    //Add to playlist
            var song = $('p', $(this)).html();
            myPlaylist.add({
                title: $('span', $(this)).html(),
                artist: $('span:eq(1)', $(this)).html(),
                free: true,
                thumb: $('img', $(this)).attr('src'),
                id: $(this).attr('id'),
                mp3: song,
                oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
                poster: ""
            });
            songs_in_playlist.push(song_id);

	    //Save in localstorage
	    save(song_id);
	    
	    //Start playing the song
	    play(song_id);

            $('#clkadd').stop(true).html('Song added to playlist!').css({
                'background': '#78932D'
            }).animate({
                top: '7%'
            }, "500");
            setTimeout("$('#clkadd').animate({top:'-40%'},'slow')", 1000); //pause for 4 seconds and then fade out
        }
    });

    //Handle clicking on songs in the list that gets shown when an album is clicked
    $('#song-play div').live('click', function() {
        var song_id = $(this).attr("id").trim();
        if (existsInPlaylist(song_id,songs_in_playlist)) {
            $('#clkadd').stop(true).html('Song already exist in playlist').css({
                'background': '#D52224'
            }).animate({
                top: '7%'
            }, "500");
            setTimeout("$('#clkadd').animate({top:'-40%'},'slow')", 1000); //pause for 4 seconds and then fade out
        } else {

            var song = $('p', $(this)).html();
            myPlaylist.add({
                title: $('span', $(this)).html(),
                artist: $('span:eq(1)', $(this)).html(),
                free: true,
                thumb: $('.albm-desc img').attr('src'),
                id: $(this).attr('id'),
                mp3: song,
                oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
                poster: ""
            });
            songs_in_playlist.push(song_id);

            if ($('.jp-play').is(":visible")) {
                $('.jp-controls li:eq(1) a').trigger('click');
            } else {
                myPlaylist.next();
            }

            $('.albmtitle h5').html(myPlaylist.playlist[myPlaylist.current].title);
            $('#clkadd').stop(true).html('Song added to playlist!').css({
                'background': '#78932D'
            }).animate({
                top: '7%'
            }, "500");
            setTimeout("$('#clkadd').animate({top:'-40%'},'slow')", 1000); //pause for 4 seconds and then fade out
        }
    });

    $('.saveplaylist').click(function() {
        if (localStorage.length == 0)
	    console.log("No items exist in playist !");
        else  {
            for (var i = 0; i < songs_in_playlist.length; i++) {
                save(songs_in_playlist[i]);
            }
        }
    });

    $('.deleteplaylist').click(function() {
        if (songs_in_playlist.length == 0) console.log("No items in playlist.");
        else {
            localStorage.clear(); //Remove all song id's from localstorage
	    $('.jp-playlist ul').empty(); //Remove all songs from playlist
            songs_in_playlist.splice(0, songs_in_playlist.length); //Clear the songs_in_playlist array
        }
    });

    //Handle clicking on remove button in the playlist
    $('.jp-playlist ul li .jp-playlist-item-remove').live('click', function() {
        var item_to_remove = $(this).parents('li').attr('id').trim();
        //Remove from songs_in_playlist array
        songs_in_playlist.splice(songs_in_playlist.indexOf(item_to_remove),1);
        //Remove from playlist
	$(".jp-playlist ul li[id='"+item_to_remove+"']").remove();
        //Remove from localstorage
        removeFromLocalStorage(item_to_remove);
        console.log(songs_in_playlist.length);
        if (songs_in_playlist.length == 0) {
            $('.jp-playlist').append('<p>No songs added!!</p>');

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

    $("#playlist-avoid-1").click(function() {
        myPlaylist.remove(2); // Removes the 3rd item
        myPlaylist.remove(3); // Ignored unless removeTime=0: Where it removes the 4th item, which was originally the 5th item.
    });

});


function initializePlaylist() {

    var songs_in_playlist = [];

    myPlaylist = new jPlayerPlaylist({

        jPlayer: "#jquery_jplayer_N",
        cssSelectorAncestor: "#jp_container_N"
    }, [

    ], {
        playlistOptions: {
            enableRemoveControls: true,
            duration: '.jp-duration'
        }
    });

    //Add existing items in localStorage to playlist

    for (var key in localStorage) {
	var item = localStorage.getItem(key);
	songs_in_playlist.push(item);
        var song_url = baseurl + songsApi + ".js?channel_id=" + channel_id + "&track_id=" + item + "&callback=?";
        $.getJSON(song_url, function(data) {
	    var jsonObj = $.parseJSON(data.songs_by_id);
	    myPlaylist.add({
                title: jsonObj.title,
                artist: jsonObj.primary_artist,
                free: true,
                thumb: jsonObj.image_uri,
                id: jsonObj.id,
                mp3: jsonObj.product_uri,
                oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
                poster: ""
	    });
        });
    }

    return songs_in_playlist;
}

function initializeJPlayer() {

    $("#jquery_jplayer_N").jPlayer({
        ready: function() {
            $(this).jPlayer("setMedia", {
                mp3: "",
                preload: "auto",
            }).jPlayer("play"); // auto play
        },
        ended: function(event) {
            $(this).jPlayer("play");
        },
        swfPath: "js",
        supplied: "mp3",
        wmode: "window",
        solution: "html,flash"
    });
}

function isStored(song_id) {
    for(var i = 0 ; i < localStorage.length ; i++) {
	if(localStorage.getItem(i) == song_id)
	    return true;
    }

    return false;
}

function save(song_id) {

    //Save the passed in song id in localStorage if it is not already saved
    if(! isStored(song_id))
      localStorage.setItem(localStorage.length,song_id);
}

function removeFromLocalStorage(song_id) {
    console.log(song_id);
    //Remove the passed in song_id from localstorage if found
    for(var key in localStorage) {
	if(localStorage.getItem(key) == song_id) {
	    localStorage.removeItem(key);
	    return ;
        }
    }

}

function existsInPlaylist(song_id,playlist) {
    //Check if song_id exists in the playlist array
    if($.inArray(song_id,playlist) == -1)
	return false;
    else
	return true;
}


function sizeOfPlaylist() {
   return $(".jp-playlist ul li").size();
}

function play(song_id) {
   console.log(song_id);
   //Get the id's of all songs in the playlist
   var ids = $('.jp-playlist ul li').map(function(i,element) {return $(element).attr('id').trim();});
   console.log(ids);
   //Get the index of the song from the playlist
   var index = 0;
   for(var i = 0 ; i < ids.length ; i++) {
       if(ids[i] == song_id) {
	   index = i;
	   break;
       }
   }
   //Play the song
   myPlaylist.play(index);
   //Set the song thumbnail on the player
   $('.song-thumb img').attr('src',myPlaylist.playlist[myPlaylist.current].thumb);   
   //Set the song title on the player
   $('.albmtitle h5').html(myPlaylist.playlist[myPlaylist.current].title);   
}

function log() {
  console.log("songs_in_playlist length="+songs_in_playlist.length+" localstorage length="+localStorage.length+" playlist length="+sizeOfPlaylist());

}
