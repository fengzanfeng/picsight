(function(){
    $("div.cell.cell-photo").live("click", function() {
        window.location.href = $(this).attr('data-url');
    })

    $("#tag-search-outer").prev().before($("#tag-search-outer"));

	//generate relative tages
    //用对象属性对数组去重
    function ov5(ar){
        var m,n=[],o= {};
        for (var i=0;(m= ar[i])!==undefined;i++)
            if (!o[m]) {
                n.push(m);o[m]=true;
            }
        return n.sort(function(a,b){return a-b});;
    }

    function generateRelativeTags() {
        var parent = $("div.feed-tag.clearfix");
        var tags = parent.find("a");
        tags = ov5(tags);
        for (i=0;i<tags.length;i++) {
            var div = $("<div>");
            div.append(tags[i]);
            $("#aside").append(div);        
        }
    }
    generateRelativeTags();

	//generate pic download link
	function getEachBigPicUrl(node){
		var jsText = node.text;
		var largePattern = /'large':'(.*)'/gm;
		// var rs = largePattern.exec(jsText);
		var largePicUrlArray = jsText.match(largePattern);
		return largePicUrlArray.join(",").replace(/'large':/g,"").replace(/'/g,"").split(",");
	}

    function setDownloadLinkForEach(){
    	var parent = $("div.feed.feed-photo");
    	var firstPicUrl = getEachBigPicUrl(parent.find("script")[0])[0];
    	var name = firstPicUrl.substring(firstPicUrl.lastIndexOf("/")+1);
    	var picNodes = parent.find("div.feed-act");
    	for(var i=0;i<picNodes.length;i++){
    		var downloadLink = $("<a href='"+firstPicUrl+"#name="+name+"' rel='download'>下载图片</a>");
    		downloadLink.insertBefore(picNodes[i].firstChild);
    	}
    }
    setDownloadLinkForEach();

	//generate all-pic download link
	function getAllBigPicUrl(){
		var picNodes = $("div.feed.feed-photo script");
		var result = []; 
		for(var i=0;i<picNodes.length;i++){
			var jsText = picNodes[i].text;
			var largePattern = /'large':'(.*)'/gm;
			// var rs = largePattern.exec(jsText);
			var largePicUrlArray = jsText.match(largePattern);
			result[i] = largePicUrlArray;
		}
		var flattenUrl = result.join(",").replace(/'large':/g,"").replace(/'/g,"");
		var flattenUrlArray = flattenUrl.split(",");

		//
		i=0;
		for(;i<flattenUrlArray.length;i++){

		}
	}

	//getAllBigPicUrl();

})();
