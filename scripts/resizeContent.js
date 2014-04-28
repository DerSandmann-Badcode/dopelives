function init(){
    $(document).ready(function() {
                      $(window).resize();
                      });
}

$(window).resize(function() {
                 var newHeight = window.innerHeight - 280;
                 $("#content").css('height',newHeight);
                 var hitboxWidth = ((window.innerHeight - 280)*16)/9;
                 var otherWidth = ((window.innerHeight - 254)*16)/9;
                 var playerWidth;
                 if (onHitbox) playerWidth = hitboxWidth; else playerWidth = otherWidth;
                 $("#player").css('width',playerWidth);
                 
                 if (!chatVisible){
                    var blackspace = $(window).width() - hitboxWidth;
                    $("#player").css('margin-left',blackspace/2);
                    $("#player").css('margin-right',blackspace/2);
                 } else {
                    var chatWidth = $(window).width() - hitboxWidth - 90;
                    if (chatWidth < 300) {
                        $("#chat").css('width',300);
                        if (onHitbox) $("#player").css('width',hitboxWidth - (300 - chatWidth));
                        if (onTwitch || onLivestream) $("#player").css('width',otherWidth  - (300 - chatWidth));
                    } else {
                        $("#chat").css('width',chatWidth);
                    }
                 }
                 });

$(document).ready(init());