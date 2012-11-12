/**
 * @author Ruslan Prytula
 * @class J.collection.CityList
 * Collection of Cities
 */

define([
	'j/model/City',
    'j/core/base/Collection'
], function(City, Collection) {
	return Collection.extend({

        /**
         * @inheritdoc
         */
        model: City,

        /**
         * @inheritdoc
         */
        url: function() {
            return J.links.city.list
        }
    });
});