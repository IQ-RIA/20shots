define(function() {
	window.J = window.J || {};
	J.Ajax = {
		put: function(config) {
			$.ajax({
				type: "PUT",
				data: config.data,
				url: config.url,
				dataType: "json",
				success: function() {
					config.success.apply(config.scope, arguments);
				}
			});
		}
	}
});