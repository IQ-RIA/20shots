/**
 * @author Ruslan Prytula
 * @class UploadView
 *
 * Class is used to display an interface to upload solutions
 */

define([
	'j/core/base/View',
	'text!j/view/shara/upload/UploadView.tpl',
	'j/core/utils'
], function(View, tpl, utils) {

	return View.extend({

		/**
		 * @property
		 * @var {Function} tpl
		 */
		tpl: _.template(tpl),

		/**
		 * @property
		 * @var {Array} fileList
		 */
		fileList: [],

		/**
		 * @inheritdoc
		 */
		events: {
			'click #upload-button': 'onUploadButtonClick',
			'click #back-button': 'onBackButtonClick',
			'dragenter .document-upload .overlay': 'onDropboxDragEnter',
			'dragleave .document-upload .overlay': 'onDropboxDragLeave',
			'change [name=default-file-input]': 'onFilesSelected'
		},


		/**
		 * @param {Object} config
		 * @returns {undefined}
		 */
		initialize: function(config) {
			_.extend(this, config);
			View.prototype.initialize.apply(this, arguments);
			this.fileList = [];
		},

		/**
		 * function fires in case when user clicks on upload button
		 * @returns {undefined}
		 */
		onUploadButtonClick: function() {
			var form = this.getForm(),
				basicForm = form.el;
			
			if(!basicForm.valid()) {
				form.showErrors(basicForm.validate().errorList);
				return ;
			}

			if(this.fileList.length == 0) {
				J.fire("error","At least one file should be uploaded");
				return ;
			}

			form.resetErrors();
			this.submit();
		},
		
		/**
		 * function will be called when user selects files from default input-file list
		 * @param {Event} e
		 * @returns {undefined}
		 */
		onFilesSelected: function(e) {
			var files = e.target.files; // FileList object
			
			for(var i=files.length-1;i>=0;i--) {
				this.addFile(files[i]);
			}

			this.showFileListInfo();
		},

		showFileListInfo: function() {
			if(this.fileList.length == 0) {
				return ;
			}
			
			$("table.hidden", this.$el).removeClass("hidden");
		},
	
		/**
		 * function saves files using xmlhttprequest
		 * @returns {undefined}
		 */
		submit: function() {
			if(!window.FormData) {
				alert("You cannot perform upload");
				return ;
			}

			var data = new FormData();

			this.addFormFieldsToRequest(data);
			this.addFilesToRequest(data);

			$.ajax({
			 	url: J.links.solve.upload,
			  	data: data,
			  	processData: false,
			  	contentType: false,
			  	type: 'POST',
			  	dataType: 'json',
			  	success: _.bind(this.onUploadSuccess, this)
			});
			
			// var xhr = new XMLHttpRequest();
			// xhr.onload = _.bind(this.onUploadSuccess, this);
			// xhr.open("POST", J.links.solve.upload, true);
			// //xhr.setRequestHeader("Content-Type", "multipart/form-data");
			// xhr.send(data);

			// var xhr = this.fileUploadArea.fileupload("send", {
			// 	files: this.fileList
			// });

			// xhr.error(_.bind(this.onUploadError, this));
			// xhr.success(_.bind(this.onUploadSuccess, this));
		},	

		/**
		 * @param {Object} data
		 * @returns {undefined}
		 */
		addFilesToRequest: function(data) {
			for(var i=0, file; file = this.fileList[i]; i++) {
				data.append('files[' + i + ']', file);
			}
		},

		/**
		 * @param {Object} data
		 * @returns {undefined}
		 */
		addFormFieldsToRequest: function(data) {
			_.each(this.getForm().el.serializeArray(), function(item) {
				data.append(item.name, item.value);
			});
		},

		/**
		 * @returns {undefined}
		 */
		addUploadAdditionalValues: function() {
			var values = {};
			_.each(this.getForm().el.serializeArray(), function(item) {
				values[item.name] = item.value;
			});
			this.fileUploadArea.data("fileupload").formData = values;
		},

		/**
		 * function will be called in case when user clicks on back button
		 * @returns {undefined}
		 */
		onBackButtonClick: function() {
			window.history.back();
		},

		/**
		 * function fires when user drags file over dropbox-container
		 * @param {Event} e
		 * @returns {undefined}
		 */
		onDropboxDragEnter: function(e) {
			$(e.target).parent('.inner').addClass("highlighted");
		},

		/**
		 * function fires when user leaves drag-file
		 * @param {Event} e
		 * @returns {undefined}
		 */
		onDropboxDragLeave: function(e) {
			$(e.target).parent('.inner').removeClass("highlighted");
		},

		/**
		 * @inheritdoc
		 */
		doRender: function() {
			return this.tpl({
				facultyId: this.request.facultyId
			});
		},

		/**
		 * initializes html5-upload
		 * @returns {undefined}
		 */
		initDDUpload: function() {
			this.fileUploadArea = $('.document-upload .inner');
			this.fileUploadArea.fileupload({
				limitMultiFileUploads: 10,
				singleFileUploads: false,
				add: function() {},
				form: this.getForm().el,
				url: J.links.solve.upload,
				dataType: 'json',
				drop: _.bind(this.onFileAdded, this)
    		});
		},

		/**
		 * @inheritdoc
		 */
		afterRender: function() {	
			View.prototype.afterRender.apply(this, arguments);
			this.uploadOverlay = $(".document-upload .overlay");
			this.initFormValidation();
			this.initDDUpload();
		},

		getForm: function() {
			if(this.form) {
				return this.form;
			}

			this.form = {
				el: $('form', this.$el),
				showErrors: function(errors) {
			   		var message = '';

			   		_.each(errors, function(error) {
			   			message += error.message + '</br>';
			   		});

			   		J.fire("error", message);
			   	},
			   	resetErrors: function() {
			   		J.fire("error");
			   	}
			}

			return this.form;
		},

		initFormValidation: function() {
			this.getForm().el.validate({
				focusInvalid: false,
				rules: {
				    "Solution[title]": {
				    	required: true,
				    	minlength: 10
				    },
				    "Solution[type]": {
				    	validate: {
				    		fn: function(value, element) {
				    			return value-0 > 0;
				    		}
				    	}
				    },
				    "Solution[description]": {
				    	required: true,
       					minlength: 20
				    }
			   	},
			   	errorPlacement: function() {},
   				messages: {
     				"Solution[name]": "Please specify the name of the work",
     				"Solution[type]": "Please select your work type",
     				"Solution[description]": "Please add description to your work"
     			},
     			highlight: function(element, errorClass, validClass) {
				    $(element).parents('.control-group').addClass(errorClass).removeClass(validClass);
				},
				unhighlight: function(element, errorClass, validClass) {
				    $(element).parents('.control-group').removeClass(errorClass).addClass(validClass);
				}
			});
		},

		/**
		 * fires after upload has been succeeded
		 * @returns {undefined}
		 */
		onUploadSuccess: function() {
			J.fire("success");
		},

		/**
		 * fires after upload has been failured
		 * @returns {undefined}
		 */
		onUploadError: function() {
			J.fire("error", J.constants.AJAX_ERROR_MESSAGE);
		},

		/**
		 * fires when user drops file into placeholder
		 * @param {Event} e
		 * @param {Object} data
		 * @returns {undefined}
		 */
		onFileAdded: function(e, data) {
			var me = this;
			_.each(data.files, function (file) {
				me.addFile(file);
        	});

        	this.uploadOverlay.parent('.inner').removeClass("highlighted");
        	this.showFileListInfo();
		},
		
		/**
		 * function adds file into file-collection and updates DOM according with
		 * information about file
		 * @param {File} file
		 * @returns {undefined}
		 */
		addFile: function(file) {
			console.log(file);
			if(this.inFileList(file) || [".", ".."].indexOf(file.name) != -1) {
				return ;
			}

			this.fileList.push(file);

			var fullPath = null;

			if(file.webkitRelativePath) {
				fullPath = file.webkitRelativePath.length > 0 ? (file.webkitRelativePath + "/" + file.name) : file.name;
			} else {
				fullPath = file.name;
			}

			$(".document-upload .table tbody").append($([
				"<tr>",
					"<td style='width:630px'>" + fullPath + "</td>",
					"<td>" + this.getFileSize(file.size) + "</td>",
				"</tr>",
			].join("")));
		},

		inFileList: function(file) {
			for (var i = this.fileList.length - 1; i >= 0; i--) {
				var existingFile = this.fileList[i];

				if(existingFile.name == file.name && existingFile.size == file.size) {
					return true;
				}
			};
		},

		getFileSize: function(size) {
			if(size < 1024) { //less the Kb
				return size + "b";
			} else if(size < 1048576) { //last then Mb
				return Math.round(size/1024 * 100)/100 + " Kb";
			}

			return Math.round(size/1024/1024 * 100)/100 + " Mb";
		},

		updateProgress: function() {
			console.log("progress", arguments);
		},

		onUploadStated: function(i, file, len) {
			$(".document-upload .list").append($("<div class='upload-file-preview'></div>"));
		},

		/**
		 * @inheritdoc
		 */
		unbind: function() {
			J.fire("error");
			View.prototype.unbind.apply(this, arguments);
		}


	});
});