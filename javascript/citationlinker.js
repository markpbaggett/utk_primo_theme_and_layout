/* Move Citation Linker */
$(document).ready(function(){
	var isthisejournals = $(".EXLSearchEJorunalsListAtoZ").length;
	if ( isthisejournals == 1){
		$("<div id='markscitationlinker'></div>").appendTo("#exlidSearchFieldRibbonSimpleSearchLink");
		$(("a[title='citationlinker']")).appendTo("#markscitationlinker");
		$("a.EXLMainMenuITEMATOZ.EXLMainMenuITEMATOZClose").remove();
		$("#exlidMainMenuItem4").remove();
	}	
	else if ( isthisejournals == 0){
		$("#exlidMainMenuItem4").remove();
		$(".EXLMainMenuITEMcitationlinker").remove();
	}
});
