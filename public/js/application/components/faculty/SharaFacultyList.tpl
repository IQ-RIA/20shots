<% if(showEmpty && collection.size() == 0) { %>
	<span class="centered"><%=J.constants.EMPTY_LIST %></span>
<% } else { %>
	<table class="table table-bordered shara-faculty-list">
		<thead>
			<tr>
	        	<th>Name</th>
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