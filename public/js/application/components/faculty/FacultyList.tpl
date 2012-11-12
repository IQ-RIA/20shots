<table class="table table-bordered faculty-list">
	<thead>
		<tr>
        	<th><%= tHead %></th>
      	</tr>
    </thead>
	<tbody>
		<% collection.each(function(model) { %>
		<tr>
			<td><a><%=model.get("title") %></a></td>
		</tr>
		<% }); %>
	</tbody>
</table>