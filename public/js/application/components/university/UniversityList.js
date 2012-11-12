/**
 * @author Ruslan Prytula
 * Class is used to render list of cities
 */

define([
	'text!j/components/university/UniversityList.tpl',
	'text!j/components/university/SharaUniversityList.tpl',
	'j/collection/UniversityList',
	'j/core/base/List'
],function(originTpl, sharaTpl, Collection, List) {
	return List.extend({
		collection: new Collection(),
		modes: {
			shara: {
				url: J.links.university.sharaList,
				tpl: _.template(sharaTpl),
				route: function(model) {
					return [
						"shara/country/",
						model.get("countryId"),
						'/city/',
						model.get('cityId'),
						'/university/',
						model.get('universityId')
					].join("");
				}
			},
			"default": {
				url: J.links.university.list,
				tpl: _.template(originTpl)	
			}
		}
	});
});
