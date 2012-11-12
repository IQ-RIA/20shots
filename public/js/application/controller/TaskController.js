define([
    'j/view/dashboard/TaskList'
], function(dashboard) {
    return Backbone.Router.extend({
        routes: {
            'task': 'index',
            'task/:id': 'view'
        },
        
        index: function () {
            (new taskList()).render();
        },

        view: function(id) {
            alert('view');
        },

        getName: function() {
            return 'task';
        }
    });
});
