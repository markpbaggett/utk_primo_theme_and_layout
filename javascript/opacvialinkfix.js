/* Fixing Opac Via Link Problems */
$(document).ready(function() {
	var isThisOVL = $("iframe.EXLMyAccountLibraryCardIframe").length;
	if (isThisOVL == 1) {
		
		/* Added by Mark to Move the Search Items in to position like Edinbugh */
		$(("img[src='../images/logo.png']")).attr('src', '../images/searchlogo.png');
		$("<div id='markstest'></div>").prependTo("#exlidHeaderContainer");
		$("<a href='http://www.lib.utk.edu'><img id='librarylogo' src='../images/utlibrarieslogo.png' alt='UT Libraries Logo'></a>").appendTo("#exlidHeaderTile");
		$("#exlidHeaderTile").prependTo("#exlidHeaderContainer");
		$("#exlidUserAreaTile").prependTo($("#markstest"));
		$("#exlidMainMenuRibbon").appendTo($("#markstest"));
		$("<br/>").appendTo("#exlidMainMenuRibbon"); 
		
		/* Adding Browse and New Search to Nav Bar */
		$(("a[title='Browse Search']")).attr('class', 'thisisbrowse');
		var browse = $('.thisisbrowse').length;
		if (browse == 1) {
			$("#exlidMainMenuRibbon").prepend("<li class='EXLMainMenuItem' id='EXLMainMenuItem6'><span id='newbrowseloc'></span></li>");
			$(("a[title='Browse Search']")).prependTo("#newbrowseloc");
			$(("a[title='Browse Search']")).text('Browse UT Collections');
		}
		$("#exlidMainMenuItem1").prependTo("#exlidMainMenuRibbon"); 
		
		/* Moving Tags and Help to other bar */
		$("#exlidMainMenuItem2").appendTo("#exlidUserAreaRibbon");
		$("#exlidMainMenuItem3").appendTo("#exlidUserAreaRibbon");
		
		/* Removing Sign In Link When Not Signed In */
		$("#exlidSignOut > a").attr('id','pony1');
		issignedin = $("#pony1").html();
		if ( issignedin == "Sign in"){
				$("#exlidSignOut").remove();
		}
		
		/* Kill exlidMainMenuItem0 */
		$("exlidMainMenuItem0").remove();
		$("EXLMainMenuItem EXLLastItem").first().remove();
		
		/* Added by Mark to Id the Sign in for Full Search Results Span */
		$("#EXLMainMenuItem5 > span").attr('id','pony2');
		
		/* Added by Mark to Remove Chat */
		$("#exlidSearchBanner").remove();
		
		/* Change One Search logo's anchor */
		$("#exlidHeaderTile > a").first().attr('href','http://utk-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/search.do?menuitem=0&fromTop=true&fromPreferences=false&fromEshelf=false&vid=onesearch');
		
		
		/* Hide Sign in when Signed in */
		var isGuest = $(".EXLUserNameDisplay").html();
		isGuest = isGuest.trim();
		if (isGuest != "Guest"){
			$("#EXLMainMenuItem5").remove();
		} 
		
		$("#advancedSearchBtn").css('padding-top','0');
		
	}
});

$(document).ready(function() {
	var isThisOVL = $("iframe.EXLMyAccountLibraryCardIframe").length;
	if (isThisOVL == 1) {
		$(("a[href='http://www.lib.utk.edu']")).last().remove();
	
	}
});