define([
	'j/core/base/List',
	'j/collection/SharaList',
	'text!j/view/shara/content/SolutionList.tpl',
	'j/core/utils',
	'j/ux/plugins/lessMore/Plugin',
	'j/ux/widgets/comments/View',
	'j/components/paging/Paging'
], function(List, SharaList, tpl, utils, LessMoreRenderer, CommentsView, PagingWidget) {
	return List.extend({
		collection: new SharaList(),
		maskEl: ".list.document",
		el: '.list.document',
		plugins: [
			LessMoreRenderer
		],

		constructor: function() {
			List.prototype.constructor.apply(this, arguments);
			this.add({ 
				el: ".solution-paging-pl",
				cls: PagingWidget, 
				ref: "Paging",
				collection: this.collection
			});
			this.mon(this.getPaging(), "change", this.onPageChanged, this);
		},

		onPageChanged: function(pagingWidget, params) {
			_.extend(this.request, params);
			this.loadData();
		},

		/**
		 * @param {String} value
		 * @returns {undefined}
		 */
		updateSearch: function(value) {
			_.extend(this.request, { search: value });
			return this;
		},

		modes: {
			"default": {
				url: J.links.shara.list,
				tpl: _.template(tpl),
				renderParams: {
					utils: utils
				},
				/**
				 * function will fire when user clicks on table-row
				 * handles events connected with details link
				 * @param {Backbone.Model} model
				 * @param {Number} index
				 * @param {Event} e
				 * @returns {undefined}
				 */
				onRowClick: function(model, index, e) {
					var target = $(e.target);
					
					if(target.is('.download')) {
						return this.onDownloadButtonClick(model);
					} else if(target.is(".comments-link")) {
						return this.onCommentsLinkClick(model, target);
					}
					
					if(target.is('.details')) {
						e.preventDefault();
						e.stopPropagation();
						this.onDetailsButtonClick(model);
					}
				}
			}
		},
		
		onDownloadButtonClick: function(model) {
			var solutionId = model.get("solutionId");
			console.log(solutionId);
		},
		
		onDetailsButtonClick: function(model) {
			var solutionId = model.get("solutionId");
			console.log(solutionId);
		},

		onCommentsLinkClick: function(model, target) {
			var commentsView = new CommentsView({
				el: $('.comments-pl', target.parents("tr"))
			});
			commentsView.render();
		}
	});
});