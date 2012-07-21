(function(){
    $("div.cell.cell-photo").live("click", function() {
        window.location.href = $(this).attr('data-url');
    })

    $("#tag-search-outer").prev().before($("#tag-search-outer"));

	//generate relative tages

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
   
    	
    	for(var i=0;i<parent.length;i++){
    		var firstPicUrl = getEachBigPicUrl($(parent[i]).find("script")[0])[0];
    		var name = firstPicUrl.substring(firstPicUrl.lastIndexOf("/")+1);
    		var picNodes = $(parent[i]).find("div.feed-act");
    		if(picNodes){
    			var downloadLink = $("<a href='javascript:' rel='download'>下载图片</a>");
    			downloadLink.on("click",function(){
    				var elems = $(parent[i]).find("a.wanDouPicLink");
    				for(var i=0;i<elems.length;i++){
    					elems[i].click();
    				}
    			});
    			downloadLink.insertBefore($("div.feed.feed-photo div.feed-act")[i].firstChild);
    		}

    		//add a half cover layer
    		var picCells = $(parent[i]).find("img.feed-img");
    		for(var j=0;j<picCells.length;j++){
    			//alert(picCells[j].);
    			var url = $(picCells[j]).attr("imgsrc");
    			//alert(url);
    			if(url){
	    			var tmpArr = url.substring(url.lastIndexOf(".")-10).split("_");
	    			var tmpName = url.substring(url.lastIndexOf("/")+1);
	    			var tmp_width = parseInt(tmpArr[1]);
	    			var tmp_height = ($(picCells[j]).width()/tmp_width)*parseInt(tmpArr[2]);
	    			var style = "position:absolute;display:block;z-index:1000;under-line:none;font-weight:bold;color:#fff;font-size:20px;opacity:0.8;background-color:#444;"+
	    						"width:"+$(picCells[j]).width()/2+"px;"+
	    						"height:"+tmp_height+ "px;line-height:"+tmp_height+ "px;"+
	    						"top:10px;"+
	    						"left:"+$(picCells[j]).width()/2+"px;";
	    			var coverA = $("<a style='"+style+"' className='wanDouPicLink' href='"+url+"#name="+name+"' rel='download'>Download</a>");

	    			coverA.insertAfter($(picCells[j]));
    			 }
    		}
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
