(function(){
	//remove head
    $("#header-holder").remove();
    $("div.hot-tags-holder").remove();

    //remove footer
    $("#aside").remove();

    //homepage cell link
    $("div.cell.cell-photo").remove();
    $("div.cell.cell-photo").live("click", function() {
        window.location.href = $(this).attr('data-url');
    })

	//remove login form
    $("#aside-reg-login").remove();
    $("#js-top-contributor").remove();
    $("#js-top-editor").remove();

	//remove hot-tags-holder

	//reposition search box to top
    var search_box = $("#tag-search-outer");
    $("#tag-search-outer").prev().before($("#tag-search-outer"));

	//remove head pics
    $("div.feed-avatar").remove();

    //remove all feed-* div except feed-photo
    $("div.feed.feed-text").remove();
    $("div.feed.feed-audio").remove();
    $("div.feed.feed-useraudio").remove();
    $("div.feed.feed-video").remove();
    $("div.feed.feed-link").remove();

	//generate relative tages

	//generate pic download link

	//generate all-pic download link


})();

window.setInterval(update_home_page, 500);
function update_home_page() {

}

