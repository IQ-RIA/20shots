define [
	'text!j/view/search/SearchPage.tpl'
    'j/core/utils'
    'j/core/base/Page'
    'j/view/search/SearchList'
], 

(tpl, utils, Page, SearchList) ->
    Page.extend
        tpl: _.template(tpl)

        initialize: ->
            Page.prototype.initialize.apply @, arguments
            @add new SearchList
                query: @query

        doRender: ->
            @tpl 
                title: "Search results for \"#{@query}\""
        
        getPageName: ->
            "search"