$(document).ready(function(){
    $('#exlidSearchBanner').find('a').attr({href: 'http://libraryh3lp.com/chat/hodges@chat.libraryh3lp.com?skin=10334&amp;theme=jsf-text&amp;title=AskUsNow!&amp;identity=librarian&amp;sounds=1', class: 'libraryh3lp', jid: 'hodges@chat.libraryh3lp.com', style: 'display: none;'}).removeAttr('target');
    
    $('#exlidSearchBanner').click(function (event){

        var url = "http://libraryh3lp.com/chat/hodges@chat.libraryh3lp.com?skin=10334&amp;theme=jsf-text&amp;title=AskUsNow!&amp;identity=librarian&amp;sounds=1";
        var windowName = "AskUsNow!";

        window.open(url, windowName, 'resizable=1,width=250,height=400');

        event.preventDefault();
    });
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

/********************************************************
 ** EXL Custom Tab API (for Primo)
 **
 **	contributions, corrections and suggestions welcome.
 **
 **	for documentation and/or to comment, the wiki is here:
 ** 	http://www.exlibrisgroup.org/display/Primo/EXL+Tab+API
 ** 
 ** or email: jacob.hanan@exlibrisgroup.com
 **
 ****************************************************/

function EXLTA_addHeadlessTab(tabType, content, evaluator){
        $('.EXLResultTabs').each(function(){
                if(!evaluator || (evaluator && evaluator(this))){
                        var htmlcontent = '';
                        if (typeof(content)=='function'){
                                log('trying function');
                                htmlcontent = content(this);
                        }else{
                                htmlcontent = content;
                        }
                        var customTabContainer = $('<div class="'+tabType+'-Container">'+htmlcontent+'</div>');
                        
						var result = $(this).parents('.EXLResult');						
						if (!EXLTA_isFullDisplay()){//Solves 'full display' bug where container isn't added to page.
							result = result.find('.EXLSummary');
						}
						result.append(customTabContainer);
                }

        });
}

function EXLTA_addOpenTab(tabName,tabType,url,tabHandler,firstTab,evaluator){
                EXLTA_addTab(tabName,tabType,url,tabHandler,firstTab);
                $('.'+tabType).click();
}
function EXLTA_addTab(tabName,tabType,url,tabHandler,firstTab,evaluator){
        EXLTA_addTabBySelector('.EXLResultTabs',tabName,tabType,url,tabHandler,firstTab,evaluator);
}
function EXLTA_addTabBySelector(selector,tabName,tabType,url,tabHandler,firstTab,evaluator){
        $(selector).each(function(){
                var customTab = $('<li class="EXLResultTab '+tabType+'"><a href="'+url+'">'+tabName+'</a></li>');
                var customTabContainer = $('<div class="EXLResultTabContainer '+tabType+'-Container"></div>');
                if(!evaluator || (evaluator && evaluator(this))){
                        if (firstTab==true){
                                                $(this).find('li').removeClass('EXLResultFirstTab');
                                                $(customTab).addClass('EXLResultFirstTab');
                                                $(this).prepend(customTab);
                        }else if (firstTab==undefined || firstTab==false){
                                                $(this).find('li').removeClass('EXLResultLastTab');
                                                $(customTab).addClass('EXLResultLastTab');
                                                $(this).append(customTab);
                        }else{
                                                $(this).find(firstTab).replaceWith(customTab);
						
			}
                        $(this).parents('.EXLResult').find('.EXLSummary').append(customTabContainer);
                        $('#'+$(this).attr('id')+' .'+ tabType + ' a').click(function(e){
                                tabHandler(e, this, tabType, url, $(this).parents('.EXLResultTab').hasClass('EXLResultSelectedTab'));
                        });
                }
                $(this).parents('.EXLSummary').find('.'+tabType+'-Container').hide();

        });
}

function EXLTA_wrapResultsInNativeTab(element, content,url, headerContent){
        var popOut = '<div class="EXLTabHeaderContent">'+headerContent+'</div><div class="EXLTabHeaderButtons"><ul><li class="EXLTabHeaderButtonPopout"><span></span><a href="'+url+'" target="_blank"><img src="../images/icon_popout_tab.png" /></a></li><li></li><li class="EXLTabHeaderButtonCloseTabs"><a href="#" title="hide tabs"><img src="../images/icon_close_tabs.png" alt="hide tabs"></a></li></ul></div>';
        var header = '<div class="EXLTabHeader">'+ popOut +'</div>';
        var htmlcontent = '';
        if (typeof(content)=='function'){
                log('trying function');
                htmlcontent = content(element);
        }else{
                htmlcontent = content;
        }
        var body = '<div class="EXLTabContent">'+htmlcontent+'</div>';
        return header + body;
}
function EXLTA_closeTab(element){
        if(!EXLTA_isFullDisplay()){
                $(element).parents('.EXLResultTab').removeClass('EXLResultSelectedTab');
                $(element).parents('.EXLTabsRibbon').addClass('EXLTabsRibbonClosed');
                $(element).parents('.EXLResult').find('.EXLResultTabContainer').hide();
        }
}
function EXLTA_openTab(element,tabType, content, reentrant){
        $(element).parents('.EXLTabsRibbon').removeClass('EXLTabsRibbonClosed');
        $(element).parents('.EXLResultTab').siblings().removeClass('EXLResultSelectedTab').end().addClass('EXLResultSelectedTab');
        var container = $(element).parents('.EXLResult').find('.EXLResultTabContainer').hide().end().find('.'+tabType+'-Container').show();
        if (content && !(reentrant && $(container).attr('loaded'))){
                $(container).html(content);
                if(reentrant){
                        $(container).attr('loaded','true');
                }
        }
        return container;
}

function EXLTA_iframeTabHandler(e,element,tabType,url,isSelected){
                e.preventDefault();
                if (isSelected){
                        EXLTA_closeTab(element);
                }else{
                        EXLTA_openTab(element,tabType, EXLTA_wrapResultsInNativeTab(element,'<iframe src="'+url+'"></iframe>',url,''),true);
                }
}

function EXLTA_createWidgetTabHandler(content,reentrant){
        return function(e,element,tabType,url,isSelected){
                e.preventDefault();
                if (isSelected){
                        EXLTA_closeTab(element);
                }else{
                        EXLTA_openTab(element,tabType, EXLTA_wrapResultsInNativeTab(element,content,url,''),reentrant);
                }
        };
}

function EXLTA_addLoadEvent(func){
        addLoadEvent(func);
}

function EXLTA_isFullDisplay(){
	return $('.EXLFullView').size() > 0;
}
function EXLTA_searchTerms(){
        return $('#search_field').val();
}
function EXLTA_recordId(element){
        return $(element).parents('.EXLResult').find('.EXLResultRecordId').attr('id');
}

function EXLTA_getPNX(recordId){
        var r = $('#'+recordId).get(0);
        if (!r.pnx){
                r.pnx = $.ajax({url: 'display.do',data:{fn: 'display', doc: recordId, showPnx: true},async: false,error:function(){log('pnx retrieval error')}}).responseXML;
        }
        return r.pnx;
}

function EXLTA_getSfxLink(element){
	try{
	var href = $(element).parents('.EXLResult').find('.EXLMoreTab a').attr('href');
	var modifiedHref = href.replace(/display\.do/,"expand.do").replace(/renderMode=poppedOut/,'renderMode=prefetchXml');
	var xml = $.ajax({url: modifiedHref ,global: false,async: false,error:function(){log('sfx retrieval error')}}).responseXML;
	var htmlText = $(xml).find('element').text();
	var url = htmlText.match(/href="([^"]*)"/)[1];
	return url.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
	}catch(errrrr){log(errrrr);}
	return undefined;	
}
function EXLTA_isbn(recordId){
        var pnx = EXLTA_getPNX(recordId);
        return $(pnx).find('isbn').eq(0).text();
}
function EXLTA_issn(recordId){ //contributed by Karsten Kryger Hansen
        var pnx = EXLTA_getPNX(recordId);
        return $(pnx).find('issn').eq(0).text();
}

