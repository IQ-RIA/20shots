###
 	@author Ruslan Prytula
 	Class is used to render list of cities
###

define [
	'text!j/components/country/CountryList.tpl'
	'text!j/components/country/SharaCountryList.tpl'
	'j/collection/CountryList'
	'j/core/base/List'
], (originTpl, sharaTpl, Collection, List) ->
	List.extend
		collection: new Collection()
		modes:
			shara:
				url: J.links.country.sharaList
				tpl: _.template(sharaTpl)
				route: (model) ->
					return "shara/country/#{model.get('countryId')}"
			default:
				url: J.links.country.list
				tpl: _.template(originTpl)