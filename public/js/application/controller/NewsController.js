define([
    'j/view/news/NewsPage'
], function(Page) {
    return Backbone.Router.extend({
        routes: {
            '': "show",
            'news': 'show'
        },
        
        /**
         * shows default news page
         * @returns {undefined}
         */
        show: function () {
            J.fire("layout.page.add", new Page());
        },

        getName: function() {
            return 'news';
        }
    });
});