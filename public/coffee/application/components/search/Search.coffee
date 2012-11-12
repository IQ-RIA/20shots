define [
	'j/core/base/View'
	'text!j/components/search/Search.tpl'
], (View, tpl) ->
	View.extend
		el: ".search-placeholder"
		tpl: _.template(tpl)
		searchTimeout: null
		lastValue: ""
		events: 
			'keyup .search-field': 'onChanged'
			'click .icon-remove': 'onRemoveIconClick'

		doRender: -> @tpl()

		afterRender: ->
			View.prototype.afterRender.apply @, arguments
			@updateRemoveIconState()

		###
			updates state of remove-icon
			adds or removes hidden-class
		###
		updateRemoveIconState: ->
			if @lastValue
				action = "removeClass"
			else
				action = "addClass"

			$(".icon-remove", @$el)[action]("hidden")

		###
		 	function will fire in case when user changed the search-field
			@param {Event} e
			@returns {undefined}
		###
		onChanged: (e) ->
			@doSearch($(e.target).val())

		###
			@param {String} val
		 	@returns {undefined}
		###
		doSearch: (val)->
			callback = _.bind(->
				if @lastValue != val
					@doSearchQuery(val)
					@lastValue = val

				@updateRemoveIconState()
			, @)
			clearTimeout @searchTimeout
			@searchTimeout = setTimeout(callback, 200)

		###
			calls required method in parent component to notify about search-field changed
		 	@param {String} val
		 	@returns {undefined}
		###
		doSearchQuery: (val)->
			@trigger("change", @, val)

		###
			function fires when user clicks on remove-icon
			removes search-text
		###
		onRemoveIconClick: ->
			$(".search-field", @$el).val("")
			@doSearch("")