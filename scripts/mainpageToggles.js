var settingsVisible = false;
var odVisible = false;
var chatVisible = false;

function init(){
    if(typeof(Storage)!=="undefined" && localStorage.chatVisible != null) chatVisible = (localStorage.chatVisible != "true");
    if(typeof(Storage)!=="undefined" && localStorage.isWide != null) isWide = (localStorage.isWide != "true");
    $(document).ready(function() {
                      toggleChat();
                      });
}

function toggleSettings(){
    if(!settingsVisible) { $("#overlay").css("display", "block"); settingsVisible = true; }
    else { $("#overlay").css("display", "none"); settingsVisible = false; }
}

function focusIRC(){
    $("#chat")[0].contentWindow.focus();
}

function openPopup(){
    var popoutURL = "pop.html";
    var currentPlayerElement = document.getElementById("content").innerHTML;
    var popup = window.open(popoutURL, 'popoutplayer', 'status=0,toolbar=0,location=0,menubar=0,width=640,height=550');
    popup.moveTo(32,128);
    window.close();
}

function openOnDemand(){
    if(!odVisible){
        $("#odMenu").css("display", "block");
        $("#odMenu").css("min-width", "180px");
        $("#odMenu").animate({ width: "30%",}, 250 );
        $("#odMenu").css("padding-left", "10px");
        odVisible = true;
    } else {
        $("#odMenu").css("padding-left", "0px");
        $("#odMenu").css("min-width", "0px");
        $("#odMenu").animate({
                             width: "0%",
                             display: "none",
                             }, 250 );
        odVisible = false;
    }
}

function toggleChat(){
    if(chatVisible){
        $("#chattoggle").prop("checked", false);
        $("#chat").css("visibility", "hidden");
        $("#chat").css("width", "0%");
        $("#chat").css("height", "0%");
        chatVisible = false;
        $(window).resize();
    } else {
        $("#chattoggle").prop("checked", true);
        $("#player").css('margin-left',"15px");
        $("#player").css('margin-right',"15px");
        $("#chat").css("visibility", "visible");
        $("#chat").css("height", "100%");
        chatVisible = true;
        $(window).resize();
    }
    if(typeof(Storage)!=="undefined") localStorage.chatVisible = chatVisible;
}

$(document).ready(init());