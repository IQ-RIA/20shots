define([
    'j/core/utils',
    'text!j/ux/plugins/lessMore/view/Tpl.tpl',
], function(utils, tpl) {
    var plugin = function(component) {
        this.component = component;
        this.component.lessMoreRenderer = this;
        
        this.component.events['click .less'] = _.bind(this.onLessClick, this);
        this.component.events['click .more'] = _.bind(this.onMoreClick, this);
    }
    
    plugin.prototype = {
        tpl: _.template(tpl),
        render: function(text, len, returnHtml) {
            return this.tpl({
                shortText: utils.ellipsis(text, len),
                fullText: text
            });
        },
        
        onLessClick: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var parent = $(e.target).parents(".lm-placeholder");
            
            $(".short-content", parent).show();
            $(".full-content", parent).hide();
            $(".more", parent).show();
            $(".less", parent).hide();
        },
        
        onMoreClick: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var parent = $(e.target).parents(".lm-placeholder");
            
            $(".short-content", parent).hide();
            $(".full-content", parent).show();
            $(".more", parent).hide();
            $(".less", parent).show();
        }
    }
    
    plugin.id = 'lm';
    return plugin;
});