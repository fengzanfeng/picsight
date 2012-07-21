window.setInterval(update_home_dom, 5000);

//(function() {
//    $("#header-holder").css("display:none"); 
//}
//)();

function update_home_dom() {
    $("#header-holder").remove();
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        anchor.target = "fengzanfeng";
    }
}
