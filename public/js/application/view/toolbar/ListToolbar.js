/**
 * @author Ruslan Prytula
 * @class ListToolbar
 *
 * Class is used to represent a Toolbar for all application's lists
 */
define([
	'j/core/base/View',
	'j/components/paging/Paging',
	'j/components/search/Search',
	'text!j/view/toolbar/ListToolbar.tpl'
], function(View, PagingWidget, SearchWidget, tpl) {

	return View.extend({

		/**
		 * @inheritdoc
		 */
		el: ".toolbar",

		/**
		 * @inheritdoc
		 */
		tpl: _.template(tpl),

		/**
		 * @inheritdoc
		 */
		initialize: function() {
			this.add([{
				cls: PagingWidget
			}, {
				cls: SearchWidget
			}]);
		},

		loadData: function() {
			this.trigger("doLoad");
		},

		doRender: function() {
			return this.tpl();
		}

	});
});