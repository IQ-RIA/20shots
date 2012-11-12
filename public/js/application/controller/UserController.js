define([
    'j/view/user/login/LoginForm',
    'j/view/user/login/EmailForm'
], function(loginForm, emailForm) {
    return Backbone.Router.extend({
        fastLogin: function(user) {
            (new emailForm(user)).render();
        },

        /**
    	 * @inheritdoc
         */
        getName: function() {
            return 'user';
        }
    });
});