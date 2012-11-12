/**
 * @author Ruslan Prytula
 * @class Form
 *
 * Class is used to display errors in forms
 */

define([
	'text!j/view/alert/Alert.tpl'
], function(alertTpl) {

	function errorsToMessage(errors) {
        var html = '';

        for(var fieldName in errors) {
            html += errors[fieldName][0] + "<br>";
        }

        return html;
	}

	J.on("error", function(message) {
		if(typeof message == "object") {
			message = errorsToMessage(message);
		}

        var html = '';

        if(message) {
            html = _.template(alertTpl, {
                message: message,
                title: "Oh snap! You got an error!",
                cls: "alert-error"
            });
        }

        $(".alert-box").html(html);
	});

    J.on("success", function(message) {
        var html = _.template(alertTpl, {
            message: message || J.constants.SUCCESS_MESSAGE,
            title: "Success",
            cls: "alert-success"
        });

        $(".alert-box").html(html);
    });
});