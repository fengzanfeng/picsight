(function(){
	//remove head
    $("#header-holder").remove();
    $("div.hot-tags-holder").remove();

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

	//generate relative tages

	//generate pic download link

	//generate all-pic download link


})();
