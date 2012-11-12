define([
	'j/core/base/View',
	'text!j/view/paging/Paging.tpl'
], function(View, tpl) {

	return View.extend({

		/**
		 * @inheritdoc
		 */
		el: ".paging",

		/**
		 * @inheritdoc
		 */
		request: {
			pageCount: 1
		},

		/**
		 * @inheritdoc
		 */
		tpl: _.template(tpl),

		/**
		 * @inheritdoc
		 */
		events: {
			'click .paging #prev': 'getPrevPage',
			'click .paging #next': 'getNextPage'
		},

		/**
		 * @inheritdoc
		 */
		initialize: function(config) {
			View.prototype.initialize.apply(this, arguments);
			this.mon(this.collection, 'fetch', this.onFetch, this);
		},

		/**
		 * fires after collection fetches new data
		 * @returns {undefined}
		 */
		onFetch: function() {
			_.extend(this.request, this.collection.getResponse());
			this.update();
		},

		/**
		 * @inheritdoc
		 */
		doRender: function() {
			return this.tpl(this.request);
		},

		onLoad: function() {
			var response = this.collection.getResponse();

			$.extend(this.request, {
				page: response.page,
				total: response.total,
				pageCount: response.pageCount
			});

			this.update();
		},

		getNextPage: function() {
			if(this.request.page == this.request.pageCount-1) {
				return ;
			}

			this.request.page++;
			this.loadData();
		},

		getPrevPage: function() {
			if(this.request.page == 0) {
				return ;
			}

			this.request.page--;
			this.loadData();
		},

		loadData: function() {
			this.toolbar.trigger("doLoad");
		}
	});
});