/**
 * @author Ruslan Prytula
 * Base class for all application's views
 */

define(function() {

	return Backbone.View.extend({
		
		/**
		 * @property
		 * @var {Array} list of classes
		 */
		plugins: null,
		
		/**
		 * @property
		 * @var {Object} plugins collected in hash
		 */
		pluginIds: null,

		/**
		 * @property
		 * @var {Array} views list of all inner views
		 */
		items: [],

		/**
		 * @param {Object} cmp Binding Component
		 * @param {Object} event Event's name
		 * @param {Function} listener
		 * @param {Object} scope
		 * @returns {undefined}
		 */
		mon: function(cmp, event, listener, scope) {
			cmp.on(event, listener, scope);
			this.managedEvents.push({
				cmp: cmp,
				scope: scope
			});
		},

		/**
		 * @inheritdoc
		 */
		constructor: function(config) {
			this.plugins = this.plugins || [];
			this.pluginIds = this.pluginIds || {};
			
			_.extend(this, config);
			this.managedEvents = [];
			this.initialize.apply(this, arguments);
			this.initPlugins();
		},
		
		initPlugins: function() {
			for(var i=this.plugins.length-1;i>=0;i--) {
				var plugin = this.plugins[i];
				
				if(!this.pluginIds[plugin.id]) {
					this.pluginIds[plugin.id] = new plugin(this);
				}
			}
		},

		/**
		 * function will be called in case when current component
		 * is added into some component
		 * @param {Object} parent Parent-component
		 * @returns {undefined}
		 */
		onAdded: function(parent) {},

		/**
		 * simply adds new item into #items
		 * @param {View} item instance of view that should be rendered
		 * @returns {Object} created item
		 */
		add: function(items) {
			items = _.isArray(items) ? items: [items];

			for (var i = items.length - 1; i >= 0; i--) {
				var item = items[i];

				if(_.isObject(item) && item.cls) {
					var cls = item.cls;
					delete item.cls;
					item = items[i] = new cls(item);
				}

				_.extend(item, {
					ownerCt: this
				});
				item.onAdded && item.onAdded(this);
				(function(me, item) {
					me['get' + item.ref] = function() {return item};
				})(this, item);
			};
				
			this.items = this.items.concat(items);
			return items;
		},

		/**
		 * function clears(removes all listeners) for all views 
		 * that are currently lies under this.el
		 * @returns {undefined}
		 */
		beforeRender: function() {
			this.isRendering = true;
			Backbone.RenderManager.removeUnder(this);
		},

		clear: function() {
			this.items = [];
		},

		/**
		 * @returns {undefined}
		 */
		render: function() {
			this.beforeRender.apply(this, arguments);
			// real render starts here
			var html = this.doRender.apply(this, arguments),
				renderTree = this.getRenderTree(),
				isRenderTreeNeeded = this.items.length > 0;

			if(!renderTree && isRenderTreeNeeded) {
				renderTree = this.setRenderTree(this.createRenderTree());
			}

			if(this.isRenderTreeCreator) {
				renderTree.html(html);
			} else {
				$(this.el, renderTree).html(html);
			}

			var items = this.items;
			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];

				item.setRenderTree(renderTree);
				item.render();
				item.clearRenderTree();
			};
			
			if(this.isRenderTreeCreator) {
				this._ensureElement();
				this.$el.html(renderTree.html());
				
				this.callChildrenAfterRender(items);
				this.afterRender.apply(this, arguments);
			}

			if(!renderTree) {
				this._ensureElement();
				this.afterRender.apply(this, arguments);
			}
		},

		update: function() {
			var html = this.doRender();
			$(this.el).html(html);
		},

		callChildrenAfterRender: function(items) {
			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];
				item.callChildrenAfterRender(item.items);
				item.afterRender.apply(item, []);
			};
		},

		isRenderTreeEmpty: function(renderTree) {
			return renderTree.size() == 1 && renderTree.attr("class") == "render-tree";
		},

		clearRenderTree: function() {
			this.renderTree = null;
		},

		setRenderTree: function(renderTree) {
			return this.renderTree = renderTree;
		},

		getRenderTree: function() {
			return this.renderTree;
		},

		/**
		 * creates new documentFragment, is used as renderTree for all subviews
		 * @returns {DocmentFragment}
		 */
		createRenderTree: function() {
			this.isRenderTreeCreator = true;
			return $('<div class="render-tree">');
		},

		/**
		 * should be overriden in subclasses
		 * @returns {undefined}
		 */
		doRender: function() {},

		/**
		 * registers current view in renderManager
		 */
		afterRender: function() {
			this._ensureElement();
			this.delegateEvents();
			this.isRendering = false;
			this.rendered = true;

			Backbone.RenderManager.register(this);
		},

		/**
		 * removes all previously binded events 
		 * @returns {undefined}
		 */
		unbind: function() {
			this.undelegateEvents();

			for (var i = this.managedEvents.length - 1; i >= 0; i--) {
				var eventConfig = this.managedEvents[i];
				eventConfig.cmp.off(null, null, eventConfig.scope);
			};
			
			for(var i=this.plugins.length-1;i>=0;i--) {
				var plugin = this.plugins[i];
				plugin.unbind && plugin.unbind();
			}
		},

		mask: function() {
			(this.maskEl ? this.$el.find(this.maskEl) : this.$el).mask();
        },

        unmask: function() {
            (this.maskEl ? this.$el.find(this.maskEl) : this.$el).unmask();
        },
		
		getPlugin: function(pluginId) {
			return this.pluginIds[pluginId];
		}
	});
});