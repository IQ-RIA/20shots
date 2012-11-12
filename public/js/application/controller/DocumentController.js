define([
    //'j/view/document/UploadDialog'
], function(dialog) {
    return Backbone.Router.extend({
    	constructor: function() {
    		J.on("document.dialog.show", this.showDialog, this);
    	},

        getName: function() {
            return 'document';
        },

        showDialog: function() {
            (this.dialog = this.dialog || new dialog).render();
        }
    });
});