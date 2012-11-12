/**
 * @author Ruslan Prytula
 * Class is used to render list of cities
 */

define([
	'text!j/components/city/CityList.tpl',
	'text!j/components/city/SharaCityList.tpl',
	'j/collection/CityList',
	'j/core/base/List'
],function(originTpl, sharaTpl, Collection, List) {
	return List.extend({
		collection: new Collection(),
		modes: {
			shara: {
				url: J.links.city.sharaList,
				tpl: _.template(sharaTpl),
				route: function(model) {
					return "shara/country/" + model.get("countryId") + '/city/' + model.get('cityId');
				}
			},
			"default": {
				url: J.links.country.list,
				tpl: _.template(originTpl)	
			}
		}
	});
});

