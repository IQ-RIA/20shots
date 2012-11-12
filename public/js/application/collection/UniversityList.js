/**
 * @author Ruslan Prytula
 * @class J.collection.CityList
 * Collection of Universities
 */

define([
	'j/model/University',
	'j/core/base/Collection'
],function(University, Collection) {
	return Collection.extend({
		
		/**
         * @inheritdoc
         */
        model: University,

        /**
         * @inheritdoc
         */
		url: function() {
			return J.links.university.list
		}
    });
});