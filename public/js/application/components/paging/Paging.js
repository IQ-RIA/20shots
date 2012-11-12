/**
 * @author Ruslan Prytula
 * @class Paging
 *
 * Class is used to display pagination widget
 */

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
		tpl: _.template(tpl),

		/**
		 * @inheritdoc
		 */
		events: {
			'click #prev': 'getPrevPage',
			'click #next': 'getNextPage'
		},

		/**
		 * @inheritdoc
		 */
		initialize: function(config) {
			this.initParams();
			View.prototype.initialize.apply(this, arguments);
			this.mon(this.collection, 'fetch', this.onFetch, this);
		},

		initParams: function() {
			this.params = {
				pageCount: 0,
				total: 0,
				page: 0
			};
		},

		/**
		 * fires after collection fetches new data
		 * @returns {undefined}
		 */
		onFetch: function() {
			var response = this.collection.getResponse();
			_.extend(this.params, response.paging);
			this.update();
		},

		/**
		 * @inheritdoc
		 */
		doRender: function() {
			return this.tpl(this.params);
		},

		getNextPage: function() {
			if(this.params.page == this.params.pageCount - 1) {
				return ;
			}

			this.params.page++;
			this.loadData();
		},

		getPrevPage: function() {
			if(this.params.page == 0) {
				return ;
			}

			this.params.page--;
			this.loadData();
		},

		loadData: function() {
			if(!this.ownerCt.onPagingChanged) {
				this.trigger("change", this, this.params);
				return ;
			}
			
			this.ownerCt.onPagingChanged(this, this.params);
		}
	});
});