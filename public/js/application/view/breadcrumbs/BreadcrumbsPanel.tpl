<ul class="breadcrumb">
	<% if(items.length == 0) { %>
		<li>Loading ... </li>
	<% } else { %>
		<% var maxLen = 80; %>
		<% _.each(items, function(item, index) { %> 
			<%  
				var title = utils.htmlDecode(item.title),
					itemLength = 18,
					tooltip = false;

				if(index != items.length-1) {
					if(title.length > itemLength) {
						tooltip = item.title;
						title = utils.ellipsis(title, itemLength, true);
						maxLen -= itemLength;
					} else {
						maxLen -= title.length;
					}
				} else {
					tooltip = item.title;
					title = utils.ellipsis(title, maxLen, true);
				}

				tooltip = tooltip ? 'title="' + tooltip + '"' : "";
			%>

			<% if(index != items.length-1) { %>
				<li><a href="<%=item.url%>" <%=tooltip%> ><%=title%></a><span class="divider">></span></li>
			<% } else { %>
				<li class="active" <%=tooltip%> ><%=title%></li>
			<% } %>
		<% }); %>
	<% } %>
</ul>