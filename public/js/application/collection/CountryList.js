/**
 * @author Ruslan Prytula
 * @class J.collection.CountryList
 * Collection of Countries
 */

define([
	'j/model/Country',
    'j/core/base/Collection'
],function(City, Collection) {
	return Collection.extend({

        /**
         * @inheritdoc
         */
        model: City,

        /**
         * @inheritdoc
         */
        url: function() {
            return J.links.country.list
        }
    });
});