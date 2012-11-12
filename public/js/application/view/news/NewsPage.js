define([
    'text!j/view/news/NewsPage.tpl',
    'j/core/utils',
    'j/core/base/Page'
],function(tpl, utils, Page) {
    return Page.extend({

        /**
         * @inheritdoc
         */
        tpl: _.template(tpl),

        events: {
            'click div': function() {alert()}
        },
        
        /**
         * @inheritdoc
         */
        doRender: function() {
            return this.tpl({ 
                title: "News goes here" 
            });
        },

        /**
         * @inheritdoc
         */
        getPageName: function() {
            return 'news';
        }
    });
});