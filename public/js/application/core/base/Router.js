define([
	'j/view/breadcrumbs/BreadcrumbsPanel'
], function(BreadcrumbsPanel) {
	return Backbone.Router.extend({

		/**
         * simply renders breadcrumbs
         * @returns {undefined}
         */
        createBreadcrumbs: function(root) {
            var widget = (new BreadcrumbsPanel()).init({
                params: this.request,
                root: root || this.getName()
            });

            return widget.request();
        }
	});
});