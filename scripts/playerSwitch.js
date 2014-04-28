var channel = "dopelives";
var checkInterval = 5000;
var lookupEnabled = false;
var onLivestream = true;
var onTwitch = false;
var onHitbox = false;

function init(){
    if(typeof(Storage)!=="undefined" && localStorage.lookupEnabled != null) lookupEnabled = (localStorage.lookupEnabled == "true");
    $(document).ready(function() { $("#autoswitch").prop("checked", lookupEnabled); checkLive(); } );
}

function checkLive(){
    checkTwitch();
    checkHitbox();
}

function checkTwitch(){
    if(lookupEnabled){
        var switchDelay = 1;
        $.ajax({
               type: "GET",
               url: "https://api.twitch.tv/kraken/streams/" + channel,
               dataType: "jsonp",
               cache: false,
               async: false,
               success: function( data ){
               if (data.stream != null && !onTwitch){ switchDelay = 6; setTwitch(); }
               if (data.stream == null && onTwitch){ switchDelay = 6; setPlayer(); }
               setTimeout(checkTwitch, switchDelay * checkInterval);
               },
               error: function(){
               setTimeout(checkTwitch, switchDelay * checkInterval);
               }
               })
    }
}

function checkHitbox(){
    if(lookupEnabled){
        var switchDelay = 1;
        $.ajax({
               type: "GET",
               url: "http://api.hitbox.tv/media",
               dataType: "json",
               async: false,
               cache: false,
               success: function( data ){
               var live = false;
               for ( stream in data.livestream ) {
               if ( data.livestream[stream].channel.user_name == "dopefish" ){ live = true; }
               }
               if ( live && !onHitbox ){ switchDelay = 6; setHitbox(); }
               if ( !live && onHitbox ){ switchDelay = 6; setPlayer(); }
               setTimeout(checkHitbox, switchDelay * checkInterval);
               },
               error: function(error){
               setTimeout(checkHitbox, switchDelay * checkInterval);
               }
               })
    }
}

function setHitbox(){
    onLivestream = false;
    onTwitch = false;
    onHitbox = true;
    setHitboxPlayer();
}

function setTwitch(){
    onLivestream = false;
    onTwitch = true;
    onHitbox = false;
    setTwitchPlayer();
}

function setLivestream(){
    onLivestream = true;
    onTwitch = false;
    onHitbox = false;
    setLivestreamPlayer();
}

function toggleEnabled() {
    lookupEnabled = !lookupEnabled;
    if(typeof(Storage)!=="undefined") localStorage.lookupEnabled = lookupEnabled;
    if(lookupEnabled){
        $("#autoswitch").prop("checked", true);
        checkLive();
    } else {
        $("#autoswitch").prop("checked", false);
    }
}

$(document).ready(init());