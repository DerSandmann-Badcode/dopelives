var defaultPlayer = "livestream";

function init(){
    if(typeof(Storage)!=="undefined" && localStorage.defaultPlayer != null) defaultPlayer = localStorage.defaultPlayer;
    currentPlayer = defaultPlayer;
    $(document).ready(function() {
                      setPlayer();
                      });
}

function getDefaultPlayer(){
    return defaultPlayer + "Player.html";
}

function setDefaultPlayer( dp ){
    if(typeof(Storage)!=="undefined") localStorage.defaultPlayer = dp;
    defaultPlayer = dp;
}

function setPlayer(){
    $("#dp"+defaultPlayer).prop("checked", true);
    $("#c"+defaultPlayer).prop("checked", true);
    switch (defaultPlayer) {
        case "hitbox" : setHitbox(); break;
        case "twitch" : setTwitch(); break;
        case "livestream" : setLivestream(); break;
    }
}

function setHitboxPlayer(){
    $("#chitbox").prop("checked", true);
    document.getElementById('player').src= "hitboxPlayer.html";
}

function setTwitchPlayer(){
    $("ctwitch").prop("checked",true);
    document.getElementById('player').src= "twitchPlayer.html";
}

function setLivestreamPlayer(){
    $("#clivestream").prop("checked", true);
    document.getElementById('player').src= "livestreamPlayer.html";
}

$(document).ready(init());