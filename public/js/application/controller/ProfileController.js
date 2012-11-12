define([
    'j/view/profile/ProfilePanel'
], function(ProfilePage) {
    return Backbone.Router.extend({
        routes: {
            'profile': 'show'
        },
        
        show: function () {
            J.fire("layout.page.add", new ProfilePage);
        },

        getName: function() {
            return 'profile';
        }
    });
});