<table class="table table-bordered university-list">
	<thead>
		<tr>
        	<th><%= tHead %></th>
      	</tr>
    </thead>
	<tbody>
		<% collection.each(function(model) { %>
		<tr>
			<td><span class="link"><%=model.get("title") %></span></td>
		</tr>
		<% }); %>
	</tbody>
</table>