define(function() {
	_.extend(J.eventBus = {}, Backbone.Events);

    J.fire = function() {
        J.eventBus.trigger.apply(J.eventBus, arguments);
    };

    J.on = function() {
        J.eventBus.on.apply(J.eventBus, arguments);
    }

    J.un = function() {
    	J.eventBus.off.apply(J.eventBus, arguments);
    }
});