define([
    'j/view/geek/GeekPanel'
], function(panel) {
    return Backbone.Router.extend({
        routes: {
            'geek': 'show'
        },
        
        show: function () {
            (new panel()).render();
        },

        getName: function() {
            return 'geek';
        }
    });
});