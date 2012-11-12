define([
    'text!j/view/geek/GeekPanel.tpl',
    'j/core/utils',
    'j/core/base/Page',
    'j/view/breadcrumbs/BreadcrumbsPanel'
],function(tpl, utils, Page, BreadcrumbsPanel) {
    return Page.extend({
        el: '.page',

        events: {},

        render: function() {
            var compiledTemplate = _.template(tpl, {
                title: "Geek goes here"
            });

            $(this.el).html(compiledTemplate);
            this.afterRender();
        },

        getPageName: function() {
            return 'geek';
        }
    });
});