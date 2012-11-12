define(function() {
	return Backbone.Model.extend({
		canDownload: function() {
			return this.attributes.uploadCounter >= J.constants.MIN_UPLOAD_LIMIT;
		},

		getFullName: function() {
			return this.attributes.firstName + this.attributes.lastName;
		}
	})
});