<% if(showEmpty && collection.size() == 0) { %>
	<div class="centered"><%=J.constants.EMPTY_LIST %></div>
<% } else { %>
	<table class="table table-bordered shara-city-list">
		<thead>
			<tr>
	        	<th style="width:470px">Name</th>
	        	<th>Content Count</th>
	      	</tr>
	    </thead>
		<tbody>
			<% collection.each(function(model) { %>
			<tr>
				<td><span class="link"><%=model.get("title") %></span></td>
				<td><%=model.get("freeUploadsCount") %></td>
			</tr>
			<% }); %>
		</tbody>
	</table>
<% } %>
<div class="scrollpading"></div>