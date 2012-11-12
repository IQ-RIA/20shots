define([
    'j/view/problems/ProblemsPage'
], function(Page) {
    return Backbone.Router.extend({
        routes: {
            'problems': 'show'
        },
        
        show: function () {
            J.fire("layout.page.add", new Page);
        },

        getName: function() {
            return 'problems';
        }
    });
});