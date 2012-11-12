define([
    'text!j/view/user/login/EmailForm.tpl',
    'j/core/base/View',
    'j/core/utils'
],function(tpl, View, utils) {
    return View.extend({
        /**
         * @inheritdoc
         */
        el: '.root',

        /**
         * @inheritdoc
         */
        events : {
            'click #submit': 'onSubmitClick'
        },

        /**
         * @inheritdoc
         */
        tpl: _.template(tpl),

        initialize: function(user) {
            this.user = user;
            View.prototype.initialize.apply(this, arguments);
        },

        /**
         * @inheritdoc
         */
        doRender : function() {
            return this.tpl({
                explanation: "We need your email to add you an ability to login without social-networks"
            });
        },

        onSubmitClick: function() {
            var emailField = $('#email' ,this.el),
                email = emailField.val();

            if(!utils.validation.email.test(email)) {
                J.fire("error", "Email isn't correct");
                return ;
            }

            this.user.email = email;
            $.post(J.links.user.fastLogin, this.user, $.proxy(this.onLogin, this), 'json');
        },

        onLogin: function(response) {
            if(response.success) {
                J.fire("login.success", response.items[0]);
            } else {
                J.fire("error", response.error);
            }
        }
    });
});