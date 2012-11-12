define(function() {
	return Backbone.Collection.extend({
        /**
         * @inheritdoc
         */
        parse: function(response) {
        	this.response = response;
        	return response.items;
        },

        /**
         * @inheritdoc
         */
        getResponse: function() {
        	return this.response;
        },

        /**
         * @inheritdoc
         */
        fetch: function(config) {
            var successFn = config.success || function() {},
                me = this;

            config.success = function() {
                me.trigger("fetch", me);
                successFn.apply(me, arguments);
            }

            Backbone.Collection.prototype.fetch.apply(me, arguments);
        }
    });
});