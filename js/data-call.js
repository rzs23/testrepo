// JavaScript Document

var baseurl = "http://atd0.spinr.in/dam";
var channel_id = "sonymusic";
var songsApi = "/songs/get_songs";
var artistApi = "/artists/get_artists";
var albumApi = "/albums/get_albums";
var genreApi = "/songs/get_genre_list";
var allGenreApi = "/songs/get_genre_home";
var tagApi = "/songs/get_tag_list";
var flexslider;
var playlist_hidden = true;
var showing_album_contents = false;
var showing_albums = false;
var settings_hidden = true;
var disc_sng = true;
var disc_alb = true;
var disc_art = true;
$(document).ready(function() {
    $('.alphabet').hide();
    init();

    /***----------------------------------------------------- CATEGORIES API CALL ------------------------------------------------------***/
    var url1 = baseurl + genreApi + ".js?channel_id=" + channel_id + "&callback=?";
    $.getJSON(url1, function(data) {
        var jsonObj = $.parseJSON(data.genres);
        var count = 0;
        $.each(jsonObj['genre_name'], function(i, item) {
            count = i + 1;
            $('#collapseThree ul').append('<li><a href="#" id="top-cat-' + count + '">' + item + '</a></li>');
        });

        $('#collapseThree ul li a').each(function() {

            $(this).click(function() {

                /** Hide playlist on Discover > items accordian click *****/
                if (playlist_hidden == false) {
                    $('.jp-playlist').animate({
                        left: '100%'
                    }, 'slow', function() {
                        playlist_hidden = true;
                        $('.jp-playlist').hide();
                    });
                } else if (settings_hidden == false) {
                    $('#app-settings').animate({
                        top: '-85%'
                    }, 'slow', function() {
                        settings_hidden = true;
                    });
                }

                //destroy divisions and flexsliders
                flexRemove();
                $(".album-detail-wrap").remove();

                var genre = escape($(this).text());
                var url = baseurl + allGenreApi + ".js?channel_id=" + channel_id + "&genre=" + genre + "&callback=?"; //console.log(url); 
                $("#circularG").show();
                $.getJSON(url, function(data) {
                    $("#circularG").hide();
                    var temp = $.parseJSON(data.songs_by_category)[0];
                    var obj = temp.genre;
                    var len = obj.length;
                    var p = (len / 6) + 1;
                    var pages = Math.floor(p);
                    createSongTemplate();
                    for (var c = 1; c <= pages; c++) {
                        $("#carousel").append('<li id="page-' + c + '"></li>');
                    }
                    $.each(temp.genre, function(z, item_cat) {
                        var j2 = z + 1;
                        var k = item_cat.id;
                        var x = Math.floor(j2 / 6);
                        if (j2 % 6 != 0) {
                            x = x + 1;
                        }
                        var index = "#page-" + x;
                        $(index).append('<div tabindex="' + j2 + '" id="' + k + ' "><a><img src="' + item_cat.image_uri + '" alt="thumbnail" /></a><span class="span2">' + item_cat.title + '</span><span class="span2">' + item_cat.primary_artist + '</span><p class="hidden">' + item_cat.product_uri + '</p></div>');
                    });
   
                    flexInit();
                });
            });
        });
    });


    /***------------------------------------------------ TOP SONGS API CALL -------------------------------------------------------------------------- ****/

    $('#top-songs-accordion').click(function() {
         showing_albums = false;
	 showing_album_contents = false;
         hidePlaylistAndSettings();
        //destroy divisions and flexsliders
        flexRemove();
        $(".album-detail-wrap").remove();
        $("#circularG").show();
        var url = baseurl + tagApi + ".js?channel_id=" + channel_id + "&tag=top20&product_type=item&callback=?"; //console.log(url);
        $.getJSON(url, function(data) {
            $("#circularG").hide();
            var jsonObj = $.parseJSON(data['items_by_tag']);
            console.log(jsonObj);
            var len = jsonObj.length;
            var p = (len / 6) + 1;
            var pages = Math.floor(p);
            createSongTemplate();
            for (var c = 1; c <= pages; c++) {
                $("#carousel").append('<li id="page' + c + '"></li>');
            }
            $.each(jsonObj, function(i, item) {
                var j = i + 1;
                var k = item.id;
                var x = Math.floor(j / 6);
                if (j % 6 != 0) {
                    x = x + 1;
                }
                var index = "#page" + x;
                $(index).append('<div tabindex="' + j + '" id="' + k + ' "><a><img src="' + item.image_uri + '" alt="thumbnail" /></a><span class="span2">' + item.title + '</span><span class="span2">' + item.primary_artist + '</span><p class="hidden">' + item.product_uri + '</p></div>');
            });

            flexInit();
        });
    });
    /**** On DOM ready show top songs by default *****/
    $("#top-songs-accordion").trigger('click');
    /***------------------------------------------------------------- TOP ARTISTS API CALL -------------------------------------------------------------------****/

    $('#top-artists-accordion').click(function artistsClick() {
        showing_albums = false;
	showing_album_contents = false;
        hidePlaylistAndSettings();
        //destroy divisions and flexsliders
        flexRemove();
        $(".album-detail-wrap").remove();
        $("#circularG").show();
        var url = baseurl + tagApi + ".js?channel_id=" + channel_id + "&tag=top20&product_type=contributor&callback=?"; //console.log(url);
        console.log("--------->" + url);
        $.getJSON(url, function(data) {
            $("#circularG").hide();
            var jsonObj = $.parseJSON(data['items_by_tag']); //$.parseJSON(data['items_by_tag']);
            var len = jsonObj.length;
            console.log('foooooooooooooo ' + len);
            var p = (len / 6) + 1;
            var pages = Math.floor(p);
            createFlexSliderTemplate("top_artists_songs_back");
            for (var c = 1; c <= pages; c++) {
                $("#other-carousel").append('<li id="page' + c + '"></li>');
            }
            $.each(jsonObj, function(i, item) {
                var j = i + 1;
                var k = "#top-artists" + j;
                var x = Math.floor(j / 6);
                if (j % 6 != 0) {
                    x = x + 1;
                }
                var index = "#page" + x;
                $(index).append('<div tabindex="' + j + '"><a><img src="' + item.image_uri + '" alt="thumbnail" id="' + k + ' "/></a><span class="span2">' + item.name + '</span><span class="span2">' + item.role + '</span><p class="hidden">' + item.id + '</p></div>');
            });
            flexInit();
            getAlbumsOfArtistOnClick("other-carousel","top_artists_albums_back");
        });
    });

    /***----------------------------------------- TOP ALBUMS API CALL -----------------------------------------------------****/
    $('#top-albums-accordion').click(function() {
	showing_albums = true;
	showing_album_contents = false;
	hidePlaylistAndSettings();
        //destroy divisions and flexsliders
        flexRemove();
        flex2Remove();
        $(".album-detail-wrap").remove();
        $("#circularG").show();

        var url = baseurl + tagApi + ".js?channel_id=" + channel_id + "&tag=top20&product_type=collection&callback=?"; //console.log(url);
        $.getJSON(url, function(data) {
            $("#circularG").hide();
            var jsonObj = $.parseJSON(data['items_by_tag']);
            var len = jsonObj.length;
            var p = (len / 6) + 1;
            var pages = Math.floor(p);
            createFlexSliderTemplate("top_albums_songs_back");
            for (var c = 1; c <= pages; c++) {
                $("#other-carousel").append('<li id="page' + c + '"></li>');
            }
            $.each(jsonObj, function(i, item) {
                var j = i + 1;
                var k = "#top-albums" + j;
                var x = Math.floor(j / 6);
                if (j % 6 != 0) {
                    x = x + 1;
                }
                var index = "#page" + x;
                $(index).append('<div tabindex="' + j + '"><a><img src="' + item.image_uri + '" alt="thumbnail" id="' + k + ' "/></a><span class="span2">' + item.title + '</span><span class="span2">' + item.primary_artist + '</span><p class="hidden">' + item.label_collection_code + '</p><p class="hidden">' + item.id + '</p></div>');
            });
            flexInit();

            getSongsOfAlbumOnClick("other-carousel");


        });
    });

    /***------------------------------------------------ ALPHABET WISE API CALL -------------------------------------------------------------------------- ****/


    $('.alphabet a').each(function() {
        var tempp = $(this).html();
        $(this).click(function() {
            flexRemove();
            var url;
            if (disc_sng == true) {
                url = baseurl + songsApi + ".js?channel_id=" + channel_id + "&songs_limit=20&start_alpha=" + tempp + "&callback=?"; //console.log(url);
                key = "songs_list_by_alphabet";
            } else if (disc_alb == true) {
                url = baseurl + albumApi + ".js?channel_id=" + channel_id + "&songs_limit=20&start_alpha=" + tempp + "&callback=?"; //console.log(url);
                key = "albums";
            } else if (disc_art == true) {
                url = baseurl + artistApi + ".js?channel_id=" + channel_id + "&songs_limit=20&start_alpha=" + tempp + "&callback=?"; //console.log(url);
                key = "artists";
            }
            console.log(url)
            $('#circularG').show();
            $.getJSON(url, function(data) {
                $('#circularG').hide();
                var jsonObj = $.parseJSON(data[key]);
                console.log(data);
                var len = jsonObj.length;
                var p = (len / 6) + 1;
                var pages = Math.floor(p);
                createDiscoverSongTemplate(pages);
                $.each(jsonObj, function(i, item) {
                    var j = i + 1;
                    var k = item.id;
                    var x = Math.floor(j / 6);
                    if (j % 6 != 0) {
                        x = x + 1;
                    }
                    var index = "#page" + x;
                    if (disc_sng) {

                        $(index).append('<div tabindex="' + j + '" id="' + k + ' "><a><img src="' + item.image_uri + '" alt="thumbnail" /></a><span class="span2">' + item.title + '</span><span class="span2">' + item.primary_artist + '</span><p class="hidden">' + item.product_uri + '</p></div>');
                    } else if (disc_art) {

                        $(index).append('<div tabindex="' + j + '"><a><img src="' + item.image_uri + '" alt="thumbnail" id="' + k + ' "/></a><span class="span2">' + item.name + '</span><span class="span2">' + item.role + '</span><p class="hidden">' + item.id + '</p></div>');

                    } else if (disc_alb) {

                        $(index).append('<div tabindex="' + j + '"><a><img src="' + item.image_uri + '" alt="thumbnail" id="' + k + ' "/></a><span class="span2">' + item.title + '</span><span class="span2">' + item.primary_artist + '</span><p class="hidden">' + item.label_collection_code + '</p><p class="hidden">' + item.id + '</p></div>');
                    }

                });

                flexInit();
                if (disc_alb) {
                    getSongsOfAlbumOnClick("carousel");
                } else if (disc_art) {
                    getAlbumsOfArtistOnClick("other-carousel","discover_artists_albums_back");
                }


            });
        });
    });



    /***------------------------------------------------ DISCOVER SONGS API CALL -------------------------------------------------------------------------- ****/


    $('#discover-songs-accordion').click(function() {
        console.log("Discover Songs");
        disc_sng = true;
        disc_art = false;
        disc_alb = false;
        showing_albums = false;
	showing_album_contents = false;
	hidePlaylistAndSettings();
        //destroy divisions and flexsliders
        flexRemove();
        $(".album-detail-wrap").remove();
        $("#circularG").show();
        var url = baseurl + songsApi + ".js?channel_id=" + channel_id + "&songs_limit=20&callback=?"; //console.log(url);
        $.getJSON(url, function(data) {
            $("#circularG").hide();
            var jsonObj = $.parseJSON(data['tracks']);
            var len = jsonObj.length;
            var p = (len / 6) + 1;
            var pages = Math.floor(p);
            createDiscoverSongTemplate(pages);
            for (var c = 1; c <= pages; c++) {
                $("#carousel").append('<li id="page' + c + '"></li>');
            }
            $.each(jsonObj, function(i, item) {
                var j = i + 1;
                var k = item.id;
                var x = Math.floor(j / 6);
                if (j % 6 != 0) {
                    x = x + 1;
                }
                var index = "#page" + x;
                $(index).append('<div tabindex="' + j + '" id="' + k + ' "><a><img src="' + item.image_uri + '" alt="thumbnail" /></a><span class="span2">' + item.title + '</span><span class="span2">' + item.primary_artist + '</span><p class="hidden">' + item.product_uri + '</p></div>');
            });

            flexInit();

        });
    });



    /***------------------------------------------------------------- DISCOVER ARTISTS API CALL -------------------------------------------------------------------****/

    $('#discover-artists-accordion').click(function artistsClick() {
        console.log("Discover Artists");
        disc_sng = false;
        disc_art = true;
        disc_alb = false;
        showing_albums = false
        showing_album_contents = false;
        $('.alphabet').show();
	hidePlaylistAndSettings();
        //destroy divisions and flexsliders
        flexRemove();
        $(".album-detail-wrap").remove();
		$('#sec-div').css({'right':'-104%'});
        $("#circularG").show();
        var url = baseurl + artistApi + ".js?channel_id=" + channel_id + "&songs_limit=20&callback=?"; //console.log(url);
        $.getJSON(url, function(data) {
            $("#circularG").hide();
            var jsonObj = $.parseJSON(data['artists']);
            var len = jsonObj.length;
            var p = (len / 6) + 1;
            var pages = Math.floor(p);
            $('.alphabet').show();
            $('#sec-div').css({'right':'-104%'});
            createFlexSliderTemplate("discover_artists_songs_back");
            for (var c = 1; c <= pages; c++) {
                $("#other-carousel").append('<li id="page' + c + '"></li>');
            }
            $.each(jsonObj, function(i, item) {
                var j = i + 1;
                var k = "#top-artists" + j;
                var x = Math.floor(j / 6);
                if (j % 6 != 0) {
                    x = x + 1;
                }
                var index = "#page" + x;
                $(index).append('<div tabindex="' + j + '"><a><img src="' + item.image_uri + '" alt="thumbnail" id="' + k + ' "/></a><span class="span2">' + item.name + '</span><span class="span2">' + item.role + '</span><p class="hidden">' + item.id + '</p></div>');
            });
            flexInit();
            getAlbumsOfArtistOnClick("other-carousel","discover_artists_albums_back");

        });
    });

    /***----------------------------------------- DISCOVER ALBUMS API CALL -----------------------------------------------------****/
    $('#discover-albums-accordion').click(function() {
        console.log("Discover Albums");
        disc_sng = false;
        disc_art = false;
        disc_alb = true;
        $('.alphabet').show();
	hidePlaylistAndSettings();
        //destroy divisions and flexsliders
        flexRemove();
        flex2Remove();
        $(".album-detail-wrap").remove();
        $("#circularG").show();

        var url = baseurl + albumApi + ".js?channel_id=" + channel_id + "&limit=20&callback=?"; //console.log(url);
        $.getJSON(url, function(data) {
            $("#circularG").hide();
            var jsonObj = $.parseJSON(data['albums_list']);
            var len = jsonObj.length;
            var p = (len / 6) + 1; 
            var pages = Math.floor(p);
     	    $('.alphabet').show();
	    $('#sec-div').css({'right':'-104%'});
	    createFlexSliderTemplate("discover_albums_songs_back");
            for (var c = 1; c <= pages; c++) {
                $("#other-carousel").append('<li id="page' + c + '"></li>');
            }
            $.each(jsonObj, function(i, item) {
                var j = i + 1;
                var k = "#top-albums" + j;
                var x = Math.floor(j / 6);
                if (j % 6 != 0) {
                    x = x + 1;
                }
                var index = "#page" + x;
                $(index).append('<div tabindex="' + j + '"><a><img src="' + item.image_uri + '" alt="thumbnail" id="' + k + ' "/></a><span class="span2">' + item.title + '</span><span class="span2">' + item.primary_artist + '</span><p class="hidden">' + item.label_collection_code + '</p><p class="hidden">' + item.id + '</p></div>');
            });
            flexInit();

            getSongsOfAlbumOnClick("other-carousel");
        });
    });

   
}); //END OF DOM

function initializeBackButtons() {

          //Top Artists
	 
	  $('#top_artists_albums_back').live('click',function(){
	     $('#sec-div').animate({right: '-104%' },500,function() {
			$('#main-div:eq(0) .flexslider').animate({ 'left':'0px'});
		});
	  });
	  
          $('#top_artists_songs_back').live('click',function(){
	     $('.album-detail-wrap').animate({right: '-100%' },500,function() {
			$('#sec-div #flex2').animate({ 'left':'0px'});
		});
	  });

	
         //Top Albums 

	 $('#top_albums_songs_back').live('click',function(){
		$('.album-detail-wrap').animate({right: '-104%' },500,function() {
			$('.flexslider').animate({ 'left':'0px'});
		});
	  });

          //Discover Artists

	  $('#discover_artists_albums_back').live('click',function(){
	     $('#sec-div').animate({right: '-104%' },500,function() {
			$('#main-div:eq(0) .flexslider').animate({ 'left':'0px'});
		        $('.alphabet').show();
		});
	  });

          $('#discover_artists_songs_back').live('click',function(){
	     $('.album-detail-wrap').animate({right: '-100%' },500,function() {
			$('#sec-div #flex2').animate({ 'left':'0px'});
		});
	  });

         //Discover Albums	

	 $('#discover_albums_songs_back').live('click',function(){
		$('.album-detail-wrap').animate({right: '-104%' },500,function() {
			$('.flexslider').animate({ 'left':'0px'});
		        $('.alphabet').show();
		});
	  });



}

function flexInit() {
    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        slideshow: false,
        keyboard: false,
        controlsContainer: ".flexslider"
    });
    $('#text_msg').html("Use Controls to Navigate");
}

function flexRemove() {
    $(flexslider).remove();
    $('.alphabet').hide();
}

function flex2Init() {
    $('#flex2').flexslider({
        animation: "slide",
        controlNav: false,
        slideshow: false,
        keyboard: false,
        controlsContainer: "#flex2"
    });
    //$('flex2 div').focus();
    $('#text_msg').html("Press BACK to return to previous Menu");
    $('.alphabet').hide();
}

function flex2Remove() {
    $("#flex2").remove();
}

function createSongTemplate() {
    $("#main-div").append('<div class="flexslider"><ul class="slides" id="carousel"></ul></div>');
}

function createFlexSliderTemplate(songs_back_button_id) {
    $("#main-div").append('<div class="flexslider"><ul class="slides" id="other-carousel"></ul></div><div id="sec-div" class="row main-carousel"></div>' +
        '<div class="row album-detail-wrap"> <div class="span3 albm-desc"><img src="" alt="" />' +
        '<div class="span3"><span id="song-detail1" class="span3"></span><span id="song-detail2" class="span3"></span><span id="song-detail3" class="span3"></span></div></div>' +
        '<div class="span8 song-item" id="song-play"></div> <div id="'+songs_back_button_id+'" class="span2"></div></div>');
}



function createFlex2Template(albums_back_button_id) {
    $("#sec-div").empty();
    $("#sec-div").append('<div class= "flexslider" id="flex2"><ul class="slides" id="sec-carousel"></ul></div><div class="" id="'+albums_back_button_id+'"></div>');

}

function createDiscoverSongTemplate(no_of_pages) {
    $('.alphabet').show();
    $('#sec-div').css({'right':'-104%'});
    var color = $('#accordion2 .accordion-group:eq(1) .accordion-body li#discover-artists-accordion a').css('color');

    var id = (color == 'rgb(255, 0, 0)') ? 'other-carousel' : 'carousel';

    $("<div class='flexslider'><ul class='slides' id=" + id + "></ul></div>").appendTo('#main-div');

    for (var c = 1; c <= no_of_pages; c++) {
        $("#" + id).append('<li id="page' + c + '"></li>');
    }

}

function getSongsOfAlbumOnClick(div_id) {
    /***-----------GETTING SONGS OF A PARTICULAR ALBUM ----------------------****/
    $('#' + div_id + ' li div').each(function() {

        $(this).click(function() {
            showing_albums = false;
	    showing_album_contents = true;
            $('.alphabet').hide();
            var tmp1 = $('p', $(this)).html();
            var tmp2 = $('p:eq(1)', $(this)).html();
            $(flexslider).animate({
                'left': '-104%'
            }, 200, function() {
                $('#circularG').show();
                var url3 = baseurl + albumApi + ".js?channel_id=" + channel_id + "&album_id=" + tmp2 + "&label_collection_code=" + tmp1 + "&callback=?";
                console.log(url3);
                $.getJSON(url3, function(data) {
                    $('#circularG').hide();
                    var details = $.parseJSON(data.albums_details);
                    $(".album-detail-wrap div img").attr("src", details.image_uri);
                    $("#song-detail1").append(details.title);
                    $("#song-detail2").append(details.primary_artist);
                    $("#song-detail3").append(details.year);
                    //$("#song-details").append(details.primary_copyright_owner);
                    $("#song-play").empty();
                    $.each($.parseJSON(data['album_tracks']), function(p, item1) {
                        var song_id = item1.id;
                        $("#song-play").append('<div class="span6 albmsongs" id="' + song_id + '"><span>' + item1.title + ' - </span><span>' + item1.primary_artist + '</span><p class="hidden">' + item1.product_uri + '</p></div>');
                     });

                });

                $('.album-detail-wrap').animate({
                    right: '0%'
                }, 500, function() {
                    showing_album_contents = true;
                });

            });

        });
    }); //End of other-carousel

}


function getAlbumsOfArtistOnClick(div_id,albums_back_button_id) {

    /***------------ GETTING ALBUMS OF THE ARTIST -------------***/

    $('#' + div_id + ' li div').each(function() {
        //console.log(div_id);
        $(this).click(function() {
            showing_albums = true;
            showing_album_contents = false;
            $('.alphabet').hide();
	    showing_albums = true;
            var temp = $('p', $(this)).html(); //console.log(temp);
            $(flexslider).animate({
                'left': '-104%'
            }, 200, function() {
                //destroy divisions and flexsliders
                flex2Remove();
                $('#circularG').show();
                var url2 = baseurl + artistApi + ".js?channel_id=" + channel_id + "&artist_id=" + temp + "&callback=?"; //console.log(url2);

                $.getJSON(url2, function(data) {
                    $('#circularG').hide();
                    var list = $.parseJSON(data['albums_list']);
                    var len = list.length;
                    var p = (len / 6) + 1;
                    var pages = Math.floor(p);
                    createFlex2Template(albums_back_button_id);
                    for (var c = 1; c <= pages; c++) {
                        $("#sec-carousel").append('<li id="page-' + c + '"></li>');
                    }
                    $.each(list, function(z, item_cat) {
                        var j2 = z + 1;
                        var k = "#album-" + j2;
                        var x = Math.floor(j2 / 6);
                        if (j2 % 6 != 0) {
                            x = x + 1;
                        }
                        var index = "#page-" + x;
                        $(index).append('<div tabindex="' + j2 + '" id="' + k + ' "><a><img src="' + item_cat.image_uri + '" alt="thumbnail" /></a><span class="span2">' + item_cat.title + '</span><span class="span2">' + item_cat.primary_artist + '</span><p class="hidden">' + item_cat.label_collection_code + '</p><p class="hidden">' + item_cat.id + '</p></div>');
                    });
                    flex2Init();
                    getSongsOfAlbumOnClick("sec-carousel");
                });


                $('#sec-div').animate({
                    right: '0%'
                }, 500, function() {
                    //showing_albums = false;

                });
            });
        });
    });

}

function handleKeyboardAndRemoteEvents() {

    $(document).keydown(function(event) {
        if (event.keyCode == VK_BACK_SPACE || event.keyCode == 27) {
            if (showing_album_contents == 1) {
                $('.album-detail-wrap').animate({
                    right: '-107%'
                }, 500, function() {
                    $(flexslider).animate({
                        'left': '0px'
                    });
                    showing_albums = false;
                    showing_album_contents = 0;

                });

            } else if (showing_albums == false) {
                $('#sec-div').animate({
                    right: '-104%'
                }, 500, function() {
                    showing_albums = true;
                    $(flexslider).animate({
                        'left': '0px'
                    });
                    $('.alphabet').show();
                });
            }
        }



    });

}

function debug() {
    console.log("showing albums "+showing_albums+" showing album contents "+showing_album_contents);
}

function hidePlaylistAndSettings() {
        if (! playlist_hidden) {
            $('.jp-playlist').animate({
                left: '100%'
            }, 'slow', function() {
                playlist_hidden = true;
                $('.jp-playlist').hide();
            });
        } else if (! settings_hidden) {
            $('#app-settings').animate({
                top: '-85%'
            }, 'slow', function() {
                settings_hidden = true;
            });
        }

}


function init() {
    
    initializeAccordion();
    initializeFlexSlider();
    initializePlaylistBackButton();
    initializeSettings();
    initializeBackButtons();
    handleKeyboardAndRemoteEvents();

}

function initializeAccordion() {

    /*** TOGGLE ACCORDIAN COLOR ON SELECTED STATE *******/
    $('.accordion-body ul li a').each(function() {
        $(this).click(function() {
            $('.accordion-body ul li a').css({
                'color': '#fff'
            });
            $(this).css({
                'color': 'red'
            });
        })
    });

    $('.collapse').live('show', function() {
        //$(this).parent().find('a').addClass('open'); //add active state to button on open
        $(this).parent().find('.accordion-heading').children('a').addClass('open'); //add active state to button on open
    });

    $('.collapse').live('hide', function() {
        $(this).parent().find('.accordion-heading').children('a').removeClass('open'); //remove active state to button on close
        $('.accordion-body ul li a').css({
            'color': '#fff'
        });
    });

}

function initializeFlexSlider() {
   if ($('.flexslider').length) {
        flexslider = $('.flexslider');
    } else {
        flexslider = '.flexslider';
    }
}

function initializePlaylistBackButton() {
    $('.backplaylist').click(function() {
        $('.jp-playlist').animate({
            left: '100%'
        }, 'slow', function() {
            playlist_hidden = true;
            $('.jp-playlist').hide();
        });
    });


    /***---------------DISPLAY PLAYLIST -------------------------------------------------------------------***/
    $('#accordion2 .accordion-group:eq(3) .accordion-heading .accordion-toggle').click(function() {
        if (! $(".jp-playlist").is(":hidden")) {
            $(".backplaylist").click();
            return;
        }

        if (settings_hidden == false) {
            $('#app-settings').animate({
                top: '-85%'
            }, 'slow', function() {
                settings_hidden = true;

            });
        }


        if ($('.jp-playlist ul li').length == 0) {
            $('.jp-playlist').append('<p>No Songs added.</p>');
        } else {
            $('.jp-playlist p').remove();
        }

        $('.jp-playlist').show().animate({
            left: '21%'
        }, 'slow', function() {
            playlist_hidden = false;
        });

    });

}

function initializeSettings() {

    /** ----------------------------DISPLAY SETTINGS------------------------------------------------------****/
    $('#accordion2 .accordion-group:eq(4)').click(function() {
        //console.log("playlist_hidden="+playlist_hidden+"settings_hidden="+settings_hidden);

        if (parseInt($("#app-settings").css("top"), 10) > 0) {

            $('#app-settings').animate({
                top: '-85%'
            }, 'slow', function() {
                settings_hidden = true;

            });
            return;
        }
        if (playlist_hidden == false) {
            $('.jp-playlist').animate({
                left: '100%'
            }, 'slow', function() {
                playlist_hidden = true;
                $('.jp-playlist').hide();
            });
        }

        $('#app-settings').animate({
            top: '8%'
        }, 'slow', function() {
            settings_hidden = false;
        });
    });

    $('#accordion2 .accordion-group:eq(5)').click(function() {
        window.close();
    });


}
