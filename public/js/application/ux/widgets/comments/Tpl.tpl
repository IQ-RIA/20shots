<% this.collection.each(function(item) { %>
	<div><%=item.author %></div>
	<div><%=item.date %></div>
	<div><%=item.message %></div>
<% }); %>

<div class="new-comment">
	<div><%= author %></div>
	<textarea></textarea>
</div>