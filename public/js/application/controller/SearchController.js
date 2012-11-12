define([
	'j/view/search/SearchPage'
],function(Page) {
	return Backbone.Router.extend({
		routes: {
            'search/:query': 'render'
        },

        render: function(query) {
            J.fire("layout.page.add", new Page({
                query: query
            }));
        },

        getName: function() {
            return 'search';
        }
	});
});