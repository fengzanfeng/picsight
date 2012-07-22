(function(){
    $("#_dd_shortcut_tip").remove();
    $("a.link-to-post{").remove();

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
   
    	
    	for(var i=0;i<parent.length;i++){
    		var _bigPicUrls = getEachBigPicUrl($(parent[i]).find("script")[0]);
    		var firstPicUrl = getEachBigPicUrl($(parent[i]).find("script")[0])[0];
    		var name = firstPicUrl.substring(firstPicUrl.lastIndexOf("/")+1);
    		var picNodes = $(parent[i]).find("div.feed-act");


    		//add a half cover layer
    		var picCells = $($("div.feed.feed-photo")[i]).find("img.feed-img");
    		for(var j=0;j<picCells.length;j++){
    			//alert(picCells[j].);
    			var url = $(picCells[j]).attr("imgsrc");
    			//alert(url);
    			if(url){
	    			var tmpArr = url.substring(url.lastIndexOf(".")-10).split("_");
	    			var tmpName = url.substring(url.lastIndexOf("/")+1);
	    			var tmp_width = parseInt(tmpArr[1]);
	    			var tmp_height = Math.round(($(picCells[j]).width()/tmp_width)*parseInt(tmpArr[2]));
	    			var _href = decodeURI(window.location.href);
	    			if(_href.indexOf("?")>0){
	    				var tagName = _href.substring(_href.indexOf('tag/')+4,_href.indexOf("?"));
	    		    }else{
	    		    	var tagName = _href.substring(_href.indexOf('tag/')+4);
	    		    }

	    			// if($(picCells[j]).attr("data-origin-info")){
	    			// 	var orginArr = $(picCells[j]).attr("data-origin-info").split(":");
	    			// 	if(orginArr[orginArr.length-2]&&_bigPicUrls){

	    			// 	}
	    			// }
	    			if(_bigPicUrls[j]){
	    				url = _bigPicUrls[j];
	    			}
	    			var style = "position:absolute;display:none;z-index:1000;overflow:hidden;under-line:none;text-align:center;font-weight:bold;color:#fff;font-size:14px;opacity:0.6;background-color:#444;"+
	    						"width:"+$(picCells[j]).parent().width()/2+"px;"+
	    						"margin-left:"+$(picCells[j]).parent().width()/2+"px;"+
	    						"margin-top:-"+(tmp_height+3)+"px;"+
	    						"height:"+$(picCells[j]).parent().height()+ "px;line-height:"+$(picCells[j]).parent().height()+ "px;";
	    			var coverA = $("<a style='"+style+"' class='wanDouPicLink' href='"+url+"#name="+tmpName+"&filepath=/sdcard/wandoujia/pictures/"+tagName+"' rel='download'>点击下载</a>");

	    			coverA.insertAfter($(picCells[j]));
	    			$(picCells[j]).parent().on("mouseover",function(event){
	    				//alert($(this).height());
	    				$($(this).children()[1]).css("display","block");
	    			});
	    			$(picCells[j]).parent().on("mouseout",function(event){
	    				$($(this).children()[1]).css("display","none");
	    			});
    			 }
    		}

    		//add download link
    		if(picNodes){
    			var downloadLink = $("<a href='javascript:' rel='download' class='tagOneByOne'>下载图片</a>");
    			downloadLink.on("click",(function(index){
    				return function(){
	    				var elems = $($("div.feed.feed-photo div.feed-img-all")[index]).find("a.wanDouPicLink");
	    				for(var i=0;i<elems.length;i++){
	    					elems[i].click();
	    				}
    				}
    			})(i));
    			downloadLink.insertBefore($("div.feed.feed-photo div.feed-act")[i].firstChild);
    		}
    	}



    }
    setDownloadLinkForEach();

    //add pagenext pageForward  downallInPage
    function threeTools(){
    	var $downAll = $("<div title='ctrl+p' style='line-height:21px;!important;'>下载本页图片</div>");
    	$downAll.addClass("threeTools-item");
    	var $pageForward = $("<div title='ctrl+j'>上一页</div>");
    	$pageForward.addClass("threeTools-item");
    	var $pageNext = $("<div title='ctrl+k'>下一页</div>");
    	$pageNext.addClass("threeTools-item");
    	//function page Forward
    	function pageForward(){
    		 var _href = decodeURI(window.location.href);
    		 var page = 0;
    		 if(_href.indexOf("?page=")>0){
    		 	page = _href.substring(parseInt(_href.indexOf("?page="))+6);
    		 	page--;
    		 	if(page==0){
    		 		window.location.href = _href.substring(0,_href.indexOf("?"));
    		 		$(this).hide();
    		 	}else{
    		 		window.location.href = _href.substring(0,_href.indexOf("?")) + "?page="+page;
    		 	}
    		 }else{

    		 }
    	}
    	//function page next
    	function pageNext(){
    		 var _href = decodeURI(window.location.href);
    		 var page = 0;
    		 if(_href.indexOf("?page=")>0){
    		 	page = _href.substring(parseInt(_href.indexOf("?page="))+6);
    		 	page++;
    		 	window.location.href = _href.substring(0,_href.indexOf("?")) + "?page="+page;
    		 }else{
    		 	window.location.href = _href.substring(0,_href.indexOf("?")) + "?page=2";
    		 }
    		 //var page =_href.indexOf("?page=")>0? parseInt(_href.substring(_href.indexOf("?page=")+6)):0;
    		 //page++;
    		 //window.location.href = _href.substring(_href.indexOf("?")) + "page="+page;
    	}
    	$pageForward.on("click",pageForward);
    	$pageNext.on("click",pageNext);

    	var $parent = $("<div class='threeTools'></div>");
    	$parent.append($downAll).append($pageForward).append($pageNext);
    	$("#wrap").append($parent);

    	$("body").on("keyup",function(event){
    		if(event.keyCode==80&&event.ctrlKey==true){
    			$("a.tagOneByOne").each(function(index,elem){
    				$(elem).click();
    			});
    		}
    		if(event.keyCode==74&&event.ctrlKey==true){
    			pageForward();
    		}
    		if(event.keyCode==75&&event.ctrlKey==true){
    			pageNext();
    		}
        });
    	
    	$downAll.on("click",function(event){
			$("a.tagOneByOne").each(function(index,elem){
				$(elem).click();
			});
    	});

    	//wall  hidden three tools
    	if(window.location.href.indexOf("wall")>0){
    		$parent.hide();
    	}else{
    		$parent.show();
    	}
    }
    threeTools();
    
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

// DOM结构绘制完毕后就执行，不必等到加载完毕
$(function(){
});


window.setInterval(update_wall, 5000);

function update_wall() {
    $("#_dd_shortcut_tip").remove();
    $("div.link-to-post-inner").remove();

    var photocells = $("div.wall-holder").find("div.cell.cell-photo");
    var audiocells = $("div.wall-holder").find("div.cell.cell-audio");
    var useraudiocells = $("div.wall-holder").find("div.cell.cell-useraudio");
    var videocells = $("div.wall-holder").find("div.cell.cell-audio");
    var textcells = $("div.wall-holder").find("div.cell.cell-text");

    for (i=0;i<audiocells.length;i++) {
        audiocells[i] = photocells[0];
    }

    for (j=0;j<useraudiocells.length;j++) {
        useraudiocells[j] = photocells[3];
    }

    for (k=0;k<videocells.length;k++) {
        videocells[k] = photocells[6];
    }

    for (l=0;l<textcells.length;l++) {
        textcells[l] = photocells[9];
    }
}
