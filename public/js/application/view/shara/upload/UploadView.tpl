<div class="upload-view">
	<form class="form-horizontal">
		<input type="hidden" name="Solution[facultyId]" value="<%= facultyId %>" />
		<div class="control-group">
  			<label class="control-label" for="name">Name</label>
  			<div class="controls">
    			<input type="text" value="fosdkfosdkofsdofksdofksodf" style="width:400px" class="input-xlarge left" id="name" name="Solution[title]">
    			<p class="help-block">Will be great if you add subject name, course and teacher here</p>
  			</div>
		</div>

		<div class="control-group">
  			<label class="control-label" for="type">Type</label>
  			<div class="controls">
	    		<select id="type" value="0" class="left" name="Solution[type]">
					<option value="0" style="display:none"></option>
					<option value="1">Labaratory</option>
					<option value="2">Control Work</option>
					<option value="3">Lection</option>
					<option value="4">Seminar</option>
					<option value="5">Course Work</option>
					<option value="6">Diplom</option>
				</select>
			</div>
		</div>

		<div class="control-group">
  			<label class="control-label" for="description">Description</label>
  			<div class="controls">
    			<textarea class="input-xlarge left" id="description" style="width:562px;height:100px" name="Solution[description]">value="fosdkfosdkofsdofksdofksodf" </textarea>
    			<p class="help-block">Please add this as more information as possible about current work(mark, errors, wishes ...)</p>
  			</div>
		</div>
		
		<div class="control-group">
  			<div class="controls">
    			<span class="btn btn-file right">
					<span style="padding-left: 20px; padding-right: 20px">Select Files</span>
					<input type="file" name="default-file-input" multiple="multiple" />
				</span>
				<% if($.browser.webkit) { %>
					<span class="btn btn-file right"  style="margin-right: 10px">
						<span style="padding-left: 20px; padding-right: 20px">Select Directory</span>
						<input type="file" name="default-file-input" webkitdirectory="" directory="" multiple="multiple" />
					</span>
				<% } %>
  			</div>
		</div>
		
		<div class="control-group">
  			<div class="toolbar document-upload">
  				<% if($.browser.webkit) { %>
		            <div class="inner">
		                <h3>You can also, drop your files Here</h3>
		                <div class="overlay"></div>
		                <div class="clear-fix"></div>
		            </div>
		        <% } %>

	            <table class="table table-bordered hidden">
                	<thead>
                		<tr>
                			<td>File</td>
                			<td>Size</td>
                		</tr>
                	</thead>
                	<tbody></tbody>
                </table>
	        </div>
		</div>

		<div>
			<input type="button" id="back-button" class="btn stretched" value="Back">
			<input type="button" id="upload-button" class="btn btn-info stretched" value="Upload">
		</div>
	</form>
</div>