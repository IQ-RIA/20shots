/**
 * @author Ruslan Prytula
 *
 * Base class for all application's lists
 */
define([
	'order!j/core/base/View',
	'order!j/components/listToolbar/ListToolbar'
],function(View, ListToolbar) {

	return View.extend({
		/** 
		 * @property
		 */
		modes: {

		},

		/**
		 * @inheritdoc
		 */
		events: {
			'click tr': 'onRowClick'
		},

		/**
		 * @inheritdoc
		 */
		initialize: function(config) {
			config = config || {};

			if(config.events) {
				_.extend(this.events, config.events);
			}

			View.prototype.initialize.apply(this, arguments);
		},

		/**
		 * initializes list toolbar with search, paging and so on things
		 * @returns {undefined}
		 */
		initToolbar: function() {
			this.add({
				cls: ListToolbar,
				ref: "ListToolbar",
				collection: this.collection, 
				request: this.request
			});

			this.mon(this.getListToolbar(), "doLoad", this.loadData, this);
		},

		/**
		 * @param {String} mode
		 * @returns {undefined}
		 */
		setMode: function(mode) {
			this.params = (mode && this.modes[mode]) ? this.modes[mode] : this.modes["default"] || {};
		},

		/**
		 * @inheritdoc
		 */
		doRender: function(showEmpty) {
			if(!this.params) {
				this.setMode();
			}

			this.collection.url = this.params.url ? this.params.url : this.collection.url;

			var tpl = this.params.tpl(_.extend({
				me: this,
				collection: this.collection, 
				showEmpty: this.loaded 
			}, this.params.renderParams));

			return tpl;
		},

		afterRender: function() {			
			View.prototype.afterRender.apply(this, arguments);
			this.loadData();
		},

		loadData: function() {
			this.mask();
			this.collection.fetch({
				data: this.request,
				success: _.bind(this.onLoad, this),
				error: _.bind(this.onError, this)
			});
		},

		onLoad: function() {
			this.loaded = true;
			this.update();
			this.unmask();
		},

		onError: function() {
			this.unmask();
		},

		onRowClick: function(e) {
			var target = e.target,
                tr = $(target).parents('tr');

            var index = $('tr', this.el).index(tr),
                model = this.collection.at(index-1);

            if(!this.params.route) {
				this.params.onRowClick && this.params.onRowClick.call(this, model, index, e);
				return ;
			}

            Backbone.history.navigate(this.params.route.call(this, model), {
                trigger: true
            });
		}
	});
});