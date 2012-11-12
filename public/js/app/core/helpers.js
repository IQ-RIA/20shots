define(function() {
	J.helpers = {
        Ajax: {

            /**
             * function is used when you need to send PUT-request
             * @param {Object} config
             * @returns {undefined}
             */
            put: function(config) {
                $.ajax({
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(config.data),
                    url: config.url + (config.id ? '/' + config.id : ""),
                    success: config.success,
                    error: $.proxy(J.helpers.onAjaxQueryFailed, J.helpers)
                });
            }
        },

        /**
         * global error function
         * @returns {undefined}
         */
        onAjaxQueryFailed: function() {
            alert("Error :(");
        }
    };

    // shortcuts
    J.Ajax = J.helpers.Ajax;
});