define([
    'text!j/view/dashboard/DashboardPanel.tpl',
    'j/core/utils'
],function(tpl, utils) {
    return Backbone.View.extend({
        el: '.page',

        events: {},

        render: function() {
            var compiledTemplate = _.template(tpl, {
                title: "Dashboard"
            });

            $(this.el).html(compiledTemplate);
            this.afterRender();
        },

        afterRender: function() {},

        getPageName: function() {
            return 'dashboard';
        }
    });
});