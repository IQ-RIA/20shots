###
	@author Ruslan Prytula

###

define [
	"j/ux/plugins/lessMore/Plugin"
	"j/core/base/List"
	"j/collection/SearchCollection"
	"text!j/view/search/SearchList.tpl"
	"j/components/paging/Paging"
], (LessMorePlugin, List, Collection, tpl, Paging)->
	List.extend
		plugins: [
			LessMorePlugin
		]

		el: '.list.search'
		maskEl: ".list.search"

		modes:
			default:
				tpl: _.template(tpl)


		initialize: (config)->
			@collection = new Collection
			@request = {}
			@request.search = config.query
			@add
				cls: Paging
				ref: "Paging"
				el: ".search-paging"
				collection: @collection

			@mon(@getPaging(), "change", @onPageChanged, @)
			List.prototype.initialize.apply @, arguments

		onPageChanged: (paging, params) ->
			_.extend(@request, params)
			@loadData()


	
