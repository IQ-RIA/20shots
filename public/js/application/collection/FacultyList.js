/**
 * @author Ruslan Prytula
 * @class J.collection.CityList
 * Collection of Faculties
 */

define([
	'j/model/Faculty',
	'j/core/base/Collection'
],function(Faculty, Collection) {

	/**
	 * @inheritdoc
	 */
	return Collection.extend({

		/**
	 	 * @inheritdoc
	 	 */
        model: Faculty,

        /**
		 * @inheritdoc
		 */
		url: function() {
			return J.links.faculty.list
		}
    });
});