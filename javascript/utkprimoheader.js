/* Test adding What am I searching 
$(document).ready(function(){
$( "fieldset" ).append( "<div id='searchAdd1'><a id='searchAdd' href='http://www.lib.utk.edu'>What am I searching?</a></div>" );
}); */

/* Adding What am I searching and Sign in to top */
$(document).ready(function(){
$( "#exlidMainMenuRibbon" ).prepend( "<li class='EXLMainMenuItem' id='EXLMainMenuItem5'><span><a href='http://utk-primo.hosted.exlibrisgroup.com:1701/primo_library/libweb/action/login.do?loginFn=signin&vid=any&targetURL=http://utk-primo.hosted.exlibrisgroup.com:1701/primo_library/libweb/action/myAccountMenu.do?vid=any'>Sign in for full search results</a></span></li>" );
$( "#exlidMainMenuRibbon" ).prepend( "<li class='EXLMainMenuItem EXLLastItem' id='EXLMainMenuItem4'><span><a href='http://www.lib.utk.edu/databases/searching.php'>What am I searching?</a></span></li>" );
});

/* Fixing Problem with Advanced and Browse 
$(document).ready(function(){
$( ".EXLSearchFieldRibbonAdvancedSearchLink").first().append( ".EXLSearchFieldRibbonBrowseSearchLink").last();
}); */

/*$(document).ready(function(){
$( ".EXLSearchFieldRibbonAdvancedSearchLink").first().append( "<div id='ponies'>&#124;&nbsp;</div>");
$( ".EXLSearchFieldRibbonAdvancedTwoLinks").last().appendTo( $( ".EXLSearchFieldRibbonAdvancedSearchLink") ).first();
$( ".EXLSearchFieldRibbonBrowseSearchLink").remove();
});/*

/* Added by Mark to Move the Search Items in to position like Edinbugh */
$(document).ready(function(){
    $(function(){
		    $(("img[src='../images/logo.png']")).attr('src','../images/searchlogo.png');
	        $("<div id='markstest'></div>").prependTo("#exlidHeaderContainer");
	        $("<a href='http://www.lib.utk.edu'><img id='librarylogo' src='../images/utlibrarieslogo.png' alt='UT Libraries Logo'></a>").appendTo("#exlidHeaderTile");
	        $("#exlidHeaderTile").prependTo("#exlidHeaderContainer");
			$("#exlidUserAreaTile").prependTo( $( "#markstest" ) );
												
	        $("#exlidMainMenuRibbon").appendTo( $( "#markstest" ) );
			$("<br/>").appendTo("#exlidMainMenuRibbon");
	});
});


/* Adding Browse and New Search to Nav Bar */
$(document).ready(function(){
	$(("a[title='Browse Search']")).attr('class','thisisbrowse');
	var browse = $('.thisisbrowse').length;
	if ( browse == 1){
			$( "#exlidMainMenuRibbon" ).prepend("<li class='EXLMainMenuItem' id='EXLMainMenuItem6'><span id='newbrowseloc'></span></li>");	
			$(("a[title='Browse Search']")).prependTo("#newbrowseloc");
			$(("a[title='Browse Search']")).text('Browse UT Collections');
	} 
	$( "#exlidMainMenuItem1" ).prependTo("#exlidMainMenuRibbon");
});

/* Moving Tags and Help to other bar */
$(document).ready(function(){
$("#exlidMainMenuItem2").appendTo("#exlidUserAreaRibbon");
$("#exlidMainMenuItem3").appendTo("#exlidUserAreaRibbon");
});


/* Removing Sign In Link When Not Signed In */
$(document).ready(function(){
	$("#exlidSignOut > a").attr('id','pony1');
	issignedin = $("#pony1").html();
	if ( issignedin == "Sign in"){
		$("#exlidSignOut").remove();
	} 
});

/* Added by Mark to Id the Sign in for Full Search Results Span */
$(document).ready(function(){
	$("#EXLMainMenuItem5 > span").attr('id','pony2');
});

/* Added by Mark to Move Chat to User Bar */
$(document).ready(function(){
$("#exlidSearchBanner").attr('display','hidden');
$("#exlidUserAreaRibbon").prepend("<li id='exlidchat'><a href=''>Chat Now!</a></li>");
});
$(document).ready(function(){
    $('#exlidchat').find('a').attr({href: 'http://libraryh3lp.com/chat/hodges@chat.libraryh3lp.com?skin=10334&amp;theme=jsf-text&amp;title=AskUsNow!&amp;identity=librarian&amp;sounds=1', class: 'libraryh3lp', jid: 'hodges@chat.libraryh3lp.com', style: 'display: none;'}).removeAttr('target');
    
    $('#exlidchat').click(function (event){

        var url = "http://libraryh3lp.com/chat/hodges@chat.libraryh3lp.com?skin=10334&amp;theme=jsf-text&amp;title=AskUsNow!&amp;identity=librarian&amp;sounds=1";
        var windowName = "AskUsNow!";

        window.open(url, windowName, 'resizable=1,width=250,height=400');

        event.preventDefault();
    });
}); 

/* Change One Search logo's anchor */
$(document).ready(function(){
$("#exlidHeaderTile > a").first().attr('href','http://utk-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/search.do?menuitem=0&fromTop=true&fromPreferences=false&fromEshelf=false&vid=any');
});


/* Hides image decorations around frbr records */
$(document).ready(function(){

    $('.EXLResultBgFRBR').remove();
    $('.EXLResultBgRtlFRBR').remove();

});

/* Added by Mark to merge Show Less and More Options into 1 LI */
$(document).ready(function(){
	$("#exlidFacet1-more").appendTo(".EXLFacetsShowLess");
	$(".EXLFacetsDisplayMore").remove();
});

/* Get rid of Ask Us Now */
$(document).ready(function(){
	$(("img[src='../images/banner.png']")).attr('id','askusnow');
});

/* Added by Mark to fix View Port and display content DIV */
$(document).ready(function(){
$("#contentEXL").attr("style","display: block");
$(("meta[name='viewport']")).attr("content","width=device-width, user-scalable=yes");
});