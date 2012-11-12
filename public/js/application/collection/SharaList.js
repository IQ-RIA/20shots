/**
 * @author Ruslan Prytula
 * Collection of documents in "Shara"-section
 */

define([
	'j/model/Shara',
	'j/core/base/Collection'
],function(Model, Collection) {

	/**
	 * @inheritdoc
	 */
	return Collection.extend({

		/**
	 	 * @inheritdoc
	 	 */
        model: Model,

        /**
		 * @inheritdoc
		 */
		url: function() {
			return J.links.shara.list
		}
    });
});