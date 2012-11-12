define([
	"j/core/base/View"
],function(View) {
	return View.extend({
		el: ".page-container",

		constructor: function() {
			View.prototype.constructor.apply(this, arguments);
			//$(".breadcrumbs-box").html("");
		},
		
		afterRender: function() {
			View.prototype.afterRender.apply(this, arguments);
			J.fire("page.active", this.getPageName());
		},

		getPageName: function() {
			throw "This method should be implemented in subClass";
		}
	});
});