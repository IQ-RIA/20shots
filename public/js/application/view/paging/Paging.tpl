<% if(pageCount > 1) { %>
	<div class="desc" style="float:left;margin-right:10px;margin-top:7px;">
		Page <%= page-0 + 1 %> of <%= pageCount %>
	</div>
	<div class="btn-group" style="float:right">
	  <button class="btn" id="prev"><</button>
	  <button class="btn" id="next">></button>
	</div>
<% } %>