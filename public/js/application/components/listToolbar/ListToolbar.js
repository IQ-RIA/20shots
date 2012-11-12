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
], function(View, Paging, Search, tpl) {

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
			View.prototype.initialize.apply(this, arguments);

			this.add({
				cls: Paging,
				collection: this.collection
			});

			var searchWidget = new Search();
			this.mon(searchWidget, "change", this.onSearchChanged, this);
			this.add(searchWidget);
		},

		/**
		 * @inheritdoc
		 */
		onPagingChanged: function(field, params) {
			this.request.page = params.page;
			this.loadData();
		},

		onSearchChanged: function(field, query) {
			this.request.search = query;
			this.loadData();
		},

		loadData: function() {
			this.trigger("doLoad");
		},

		doRender: function() {
			return this.tpl();
		}
	});
});