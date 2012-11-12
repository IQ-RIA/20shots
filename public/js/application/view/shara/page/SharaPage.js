/**
 * @author Ruslan Prytula
 * Class is used a view to display shared documents
 */

define([
    'j/core/base/Page',
    'j/core/utils',
    'text!j/view/shara/page/SharaPage.tpl'
],function(Page, utils, tpl) {
    return Page.extend({

        /**
         * @inheritdoc
         */
        tpl: _.template(tpl), 

        /**
         * @inheritdoc
         */
        doRender: function() {
            return this.tpl();
        },

        /**
         * @inheritdoc
         */
        getPageName: function() {
            return 'shara';
        }
    });
});