<div class="page">
	<div class="alert-box"></div>
	<div class="main-container profile">
		<h1>
			<%= title %>
		</h1>
		<form id="profile-form" class="form-horizontal">		
			<fieldset>
				<legend>
					<%= personalDataTitle %>
				</legend>
				<div class="control-group">
					<label class="control-label" for="firstName"><%= firstNameTitle %></label>
					<div class="controls">
						<span class="input-xlarge uneditable-input" id="firstName"><%= firstName %></span>
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="lastName"><%= lastNameTitle  %></label>
					<div class="controls">
						<span type="text" class="input-xlarge uneditable-input" id="lastName"><%= lastName %></span>
					</div>
				</div>

				<div class="control-group disabled">
					<label class="control-label" for="cityTitle"><%= cityLabelTitle %></label>
					<div class="controls">
						<span class="input-xlarge uneditable-input" id="cityTitle" name="cityTitle"><%= cityTitle %></span>
					</div>
				</div>

				<div class="control-group disabled">
					<label class="control-label" for="universityTitle"><%= universityLabelTitle %></label>
					<div class="controls">
						<div class="input-xlarge uneditable-input" id="universityTitle" name="universityTitle"><%= universityTitle %></div>
					</div>
				</div>
				
				<div class="control-group disabled">
					<label class="control-label" for="email"><%= emailTitle %></label>
					<div class="controls">
						<span class="input-xlarge uneditable-input" id="email" name="email"><%= email %></span>
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="password"><%= passwordTitle %></label>
					<div class="controls">
						<input type="password" class="input-xlarge" id="password" value="" name="password">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="confirmPassword"><%= passwordAgainTitle %></label>
					<div class="controls">
						<input type="password" class="input-xlarge" id="confirmPassword" value="" name="confirmPassword">
					</div>
				</div>
			</fieldset>
			
			<fieldset>
				<legend><%= workFieldSetTitle %></legend>
				<div class="control-group">
					<label class="checkbox">
						<input id="isEmployee" name="isEmployee" type="checkbox" />
						<%= workTitle %>
					</label>
					<p class="help">Check this</p>
				</div>

				<div class="work-status-pl">
				</div>
			</fieldset>

			<input class="btn btn-info" type="button" name="submitButton" value="Submit" />
		</form>
	</div>
</div>
