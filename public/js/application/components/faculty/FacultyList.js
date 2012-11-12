/**
 * @author Ruslan Prytula
 * Class is used to render list of cities
 */

define([
	'text!j/components/faculty/FacultyList.tpl',
	'text!j/components/faculty/SharaFacultyList.tpl',
	'j/collection/FacultyList',
	'j/core/base/List'
],function(originTpl, sharaTpl, Collection, List) {
	return List.extend({
		collection: new Collection(),
		modes: {
			shara: {
				url: J.links.faculty.sharaList,
				tpl: _.template(sharaTpl),
				route: function(model) {
					return [
						"shara/country/",
						model.get("countryId"),
						'/city/',
						model.get('cityId'),
						'/university/',
						model.get('universityId'),
						'/faculty/',
						model.get('facultyId')
					].join("");
				}
			},
			"default": {
				url: J.links.faculty.list,
				tpl: _.template(originTpl)	
			}
		}
	});
});