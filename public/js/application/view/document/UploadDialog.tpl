<div class="modal fade" id="uploadDocumentDialog">
	<div class="modal-header">
    	<button type="button" class="close closeEl">×</button>
    	<h3><%= title %></h3>
  	</div>

  	<div class="modal-body">
  		<br/>
		<form>
			<input type="file" name="Solution[document]" class="file-field" id="file">
			<div class="percent">
				<div class="bar"></div>
			</div>
			<label for="fileName"><%= fileNameLabel %></label>
			<input type="text" placeholder="<%= fileNamePlaceholder %>" id="fileName" name="Solution[fileName]" />
			<label for="fileType"><%= fileTypeLabel %>*</label>
			<select id="fileType" name="Solution[fileType]">
				<option value="0" style="display:none"></option>
				<option>Labaratory</option>
				<option>Control Work</option>
				<option>Lection</option>
				<option>Seminar</option>
				<option>Course Work</option>
				<option>Diplom</option>
			</select>
			<label for="description"><%= descriptionLabel %></label>
			<textarea id="description" name="Solution[description]"></textarea>
		</form>
  	</div>

  	<div class="modal-footer">
    	<a href="#" class="btn closeEl"><%= closeText %></a>
    	<a href="#" class="btn btn-primary" id="uploadDocumentButton"><%= saveText %></a>
  	</div>
</div>