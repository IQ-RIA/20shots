/**
 * @author Ruslan Prytula
 * @class BreadcrumbsPanel
 * @extends Backbone.View
 */

define([
    'text!j/view/breadcrumbs/BreadcrumbsPanel.tpl',
    'j/core/utils',
    'j/core/base/View'
], 
function(tpl, utils, View) {

    return View.extend({
        el: '.breadcrumbs-box',

        events: {
            'click a': 'onItemClick'
        },

        tpl: _.template(tpl),

        init: function(config) {
            this.config = _.clone(config);
            this.config.params.countryRoot = true;
            this.setRenderConfig({
                items: [],
                utils: utils
            });

            return this;
        },

        request: function() {
            $.post(J.links.breadcrumbs, this.config.params, _.bind(this.onLoad, this), 'json');
            return this;
        },

        onLoad: function(response) {
            this.renderConfig.items = response.items;
            this.update();
        },

        setRenderConfig: function(config) {
            this.renderConfig = config;
        },

        doRender: function() {
            return this.tpl(this.renderConfig);
        },

        onItemClick: function(e) {
            e.preventDefault();
            
            var item = this.getConfigFromEvent(e),
                url = this.buildUrl(item);

            Backbone.history.navigate(url, {
                trigger: true
            });
        },

        buildUrl: function(stopItem) {
            var items = this.renderConfig.items,
                url = this.config.root,
                stopIndex = items.indexOf(stopItem) + 1;
                
            for (var i = 0, l = items.length; i < l; i++) {
                var item = items[i];

                if(i == stopIndex) {
                    break;
                }

                // renders root or full list without root
                if(item.root && stopIndex == 1 || !item.root) {
                    url += "/" + item.type + (item.id ? "/" + item.id : "");
                }
            };

            return url;
        },

        getConfigFromEvent: function(e) {
            var index = $("li", this.el).index($(e.target).parents("li:first"));
            return this.renderConfig.items[index];
        }
    });
});