###
	@author Ruslan Prytula
	
###

define [
	"j/core/base/Page"
	"text!j/view/work/WorkPage.tpl"
], (Page, tpl) ->
	Page.extend
		tpl: _.template(tpl)
		doRender: ->
			@tpl
				title: "Work"

		getPageName: ->
			"work"
