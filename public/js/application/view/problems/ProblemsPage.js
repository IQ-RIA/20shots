define([
    'text!j/view/problems/ProblemsPage.tpl',
    'j/core/utils',
    'j/core/base/Page'
],function(tpl, utils, Page) {
    return Page.extend({
        doRender: function() {
            return _.template(tpl, {
                title: "My Problems goes here"
            });
        },

        getPageName: function() {
            return 'problems';
        }
    });
});