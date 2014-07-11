/*
RetroFacets v1.1 by Niklas Lehto @ Jönköping University Library.

Implemented at University of Tennessee, 2013/12/31 (mike)
*/

//Language object
var lcl = {
	//Hint for non JavaScript-developers: pay attention to the commas. There should *not* be a comma after the last property.
	'English': {
		facetsShowTitle: 'Show additional facets for ',
		facetsHideTitle: 'Hide additional facets for ',
		facetsShow: 'Show ',
		facetsMore: 'more ',
		facetsHide: 'Show less ' //<-- No comma
	} //<-- No comma
}

var getLang = function(defaultLang){
	return $.trim($("#exlidSelectedLanguage").text()) || defaultLang;
}

var retroFacets = function(options){
	var options = options || {}; //Create options object if no object is passed along as argument.
	var maxFacets = options.maxFacets || 5;
	var slideFacets = (typeof options.slideFacets === 'boolean') ? options.slideFacets : true;
	var showFacetCount = (typeof options.showFacetCount === 'boolean') ? options.showFacetCount : false;
	var toggleLBLink = (typeof options.toggleLBLink === 'boolean') ? options.toggleLBLink : false;
	var duration = options.duration || 500;
	var scalableDuration = (typeof options.scalableDuration === 'boolean') ? options.scalableDuration : true;
	var durationMultiplier = options.durationMultiplier || 35;
	var durationMin = options.durationMin || 300;
	var durationMax = options.durationMax || 2000;
	var defaultLang = options.defaultLang || 'English';

	var lang = getLang(defaultLang);

	$('ol.EXLFacetsList').each(function(i,list){

		list = $(list);

		//Are there more visible facets than prefered?
		if(list.find('li').not('.EXLFacetsDisplayMore').length > maxFacets){

			//Hide additional facets.
			list.find('li').not('.EXLFacetsDisplayMore').slice(maxFacets).addClass('EXLAdditionalFacet');

			if(slideFacets){
				//The additional facets need to be wrapped inside another element to allow for sliding in and out of view.
				list.find('li.EXLAdditionalFacet').show().wrapAll('<li class="EXLAdditionalFacetWrapper"><ul style="display:none;">');
			}
			else{
				list.find('li.EXLAdditionalFacet').hide();
			}

			//Get the number of hidden facets.
			if(showFacetCount){
				var n =  list.find('li.EXLAdditionalFacet').length;
			}
			else{
				var n = '';
			}

			//Create facet options.
			var facetOptions =  '<li class="EXLFacetOptions"><ul><li class="EXLFacetsShowMore"><a title="'+lcl[lang]['facetsShowTitle']+list.prev().text()+'" href="#">';
			facetOptions += lcl[lang]['facetsShow']+n+lcl[lang]['facetsMore']+'<img alt="open sub menu" src="../images/icon_open_subMenu.png"></a></li>';
			facetOptions += '<li class="EXLFacetsShowLess" style="display:none;"><a title="'+lcl[lang]['facetsShowTitle']+list.prev().text();
			facetOptions +=	'" href="#">'+lcl[lang]['facetsHide']+n+'</span><img alt="close sub menu" src="../images/icon_close_subMenu.png"></a></li></ul></li>';

			list.append(facetOptions);
			list.find('.EXLFacetsDisplayMore').appendTo(list.find('.EXLFacetOptions ul'));

			if(toggleLBLink) list.find('.EXLFacetsDisplayMore').hide();
		}
	});

	//Bind click event to show more / show less links.
	$('.EXLFacetsShowMore a, .EXLFacetsShowLess a').click(function(e){
		e.preventDefault();

		var list = $(this).parents('ol.EXLFacetsList');
		var additionalFacets = list.find('li.EXLAdditionalFacet');

		if(scalableDuration){
			var slideDuration = additionalFacets.length * durationMultiplier;
			slideDuration = Math.max(slideDuration,durationMin);
			slideDuration = Math.min(slideDuration,durationMax);
		}
		else{
			var slideDuration = duration;
		}

		//Slide the additional facets in and out of view?
		if(slideFacets){
			list.find('li.EXLAdditionalFacetWrapper ul').slideToggle(slideDuration,function(){
				list.find('.EXLFacetsShowMore, .EXLFacetsShowLess').toggle();
			});
			if(toggleLBLink){
				//Update to fadeToggle when going live with Primo v4.4
				var lbLink = list.find('.EXLFacetsDisplayMore');
				if(!lbLink.is(':visible')) lbLink.fadeIn(duration)
				else lbLink.fadeOut(duration);
				//list.find('.EXLFacetsDisplayMore').fadeToggle(duration);//Primo v4.4
			}
		}
		else{
			//No sliding asked for. Just toggle the display of the additional facets.
			list.find('.EXLAdditionalFacet').toggle();
			list.find('.EXLFacetsShowMore, .EXLFacetsShowLess').toggle();
			if(toggleLBLink) list.find('.EXLFacetsDisplayMore').toggle();
		}
	});
}

$(document).ready(function(){
	retroFacets();

	//Example using options.
	retroFacets({
		maxFacets: 4,
		showFacetCount: false,
		toggleLBLink: true,
		slideFacets: true,
		duration: 400,
		scalableDuration: true
	});
});