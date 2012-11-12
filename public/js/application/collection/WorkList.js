/**
 * @author Ruslan Prytula
 * @class J.collection.CityList
 * Collection of WorkLists
 */

define([
	'j/model/Work',
    'j/core/base/Collection'
],function(WorkModel, Collection) {
	return Collection.extend({
        
        /**
         * @inheritdoc
         */
        model: WorkModel,

        /**
         * @inheritdoc
         */
        url: function() {
            return J.links.work.list;
        }
    });
});