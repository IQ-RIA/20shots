/**
 * @author Ruslan Prytula
 * Class is used a view to display shared documents
 */

define([
    'j/core/base/View',
    'j/core/utils',
    'text!j/view/shara/content/SharaPanel.tpl',
    'j/view/breadcrumbs/BreadcrumbsPanel',
    'j/view/shara/content/SolutionList',
    'j/components/search/Search'
], function(View, utils, tpl, Breadcrumbs, SolutionList, SearchWidget) {

    return View.extend({

        /**
         * @inheritdoc
         */
        el: ".page.shara .inner-content",

        /**
         * @inheritdoc
         */
        events: {
            'click .add-btn': 'onAddButtonClick'
        },

        /**
         * @inheritdoc
         */
        tpl: _.template(tpl),

        initialize: function() {
            View.prototype.initialize.apply(this, arguments);
            
            this.add({
                cls: SolutionList,
                ref: "SolutionList",
                request: this.request
            });

            var searchWidget = new SearchWidget({ el: ".search-pl" });
            this.mon(searchWidget, "change", this.onSearchChanged, this);
            this.add(searchWidget);
        },

        /**
         * @param {Object} field
         * @param {String} value
         * @returns {undefined}
         */
        onSearchChanged: function(field, value) {
            this.getSolutionList().updateSearch(value).loadData();
        },

        /**
         * @inheritdoc
         */
        doRender: function() {
            return this.tpl({ 
                title: "It's for free",
                canUpload: J.app.instance().getUser().get("facultyId") == this.request.facultyId
            });
        },

        onAddButtonClick: function() {
            Backbone.history.navigate(Backbone.history.getFragment() + "/upload", {
                trigger: true
            })
        }
    });
});