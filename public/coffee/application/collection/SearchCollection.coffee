define [
	'j/core/base/Collection'
	'j/model/Search'
],

(Collection, Model) ->
	Collection.extend
		model: Model
		url: ->
			J.links.search.url