define([
	"text!j/view/document/UploadDialog.tpl",
	"plugins/form"
],function(UploadDialogTemplate) {
	return Backbone.View.extend({
		el: "body",
		events: {
			'click #uploadDocumentButton': 'doUpload',
			'change #file': 'updateFileNameField',
			'click .closeEl': 'closeDialog'
		},

		updateFileNameField: function() {
			var fileName = $("#file", this.el).val(),
				substrIndex = fileName.lastIndexOf('\\');
			$("#fileName", this.el).val(fileName.substr(substrIndex == -1 ? 0 : substrIndex + 1));
		},

		$: function(selector) {
			return $(selector, "#uploadDocumentDialog");
		},

		doUpload: function(e) {
			e.preventDefault();
			var form = this.$("form"),
				fileType = this.$("#fileType"),
				fileName = this.$("#fileName"),
				file = this.$("#file");

			if(fileType.val() == 0
				|| fileName.val().length == 0
				|| file.val().length == 0) {
				return alert("invalid");	
			}

			form.ajaxSubmit({
				type: "POST",
				url: J.links.solve.upload,
				success: $.proxy(this.onDocumentUploaded, this),
				type: "json",
				beforeSend: $.proxy(this.onBeforeUpload, this),
				uploadProcess: $.proxy(this.uploadProcess, this),
				complete: $.proxy(this.onCompleted, this)
			});
		},

		/**
		 * @returs {undefined}
		 */
		onBeforeUpload: function() {
	        this.updatePercentage('0%');
		},

		updatePercentage: function(percentVal) {
			this.$(".bar").width(percentVal);
	        this.$(".percent").html(percentVal);
		},
    
	    uploadProcess: function(event, position, total, percentComplete) {
	        this.updatePercentage(percentComplete + '%');
	    },

		onCompleted: function() {
			alert("uploaded");
			this.closeDialog();
		},

		render: function() {
			this.dialog = $(_.template(UploadDialogTemplate, {
				fileNameLabel: "File Name",
				title: "Upload New Document",
				closeText: "Close",
				saveText: "Upload Document",
				descriptionLabel: "Description",
				fileTypeLabel: "File Type",
				fileNamePlaceholder: "Filename"
			})).appendTo("body");

			this.dialog.modal({
				keyboard: false,
				show: true
			});

			return this;
		},

		closeDialog: function(e) {
			e && e.preventDefault();

			if(this.dialog) {
				this.dialog.modal("hide");
				this.dialog.remove();
				this.dialog = null;
			}
		}
	});
});