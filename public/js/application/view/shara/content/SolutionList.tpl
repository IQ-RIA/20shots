<% if(showEmpty && collection.size() == 0) { %>
    <div class="centered"><%=J.constants.EMPTY_LIST %></div>
<% } else if(collection.size() > 0) { %>
    <table class="table">
        <thead>
            <th>Title</th>
            <th class="right">Upload Date</th>
        </thead>
        <% collection.each(function(model) { %>
            <tr>
                <td colspan=2>
                    <div class="left desc">
                        <h3>
                            <a href="/solution/content/<%= model.get("solutionId") %>">
                                <%= model.get("title") %>
                            </a>
                        </h3>
                    </div>
                    
                    <div class="right" style="margin-right: 15px;font-size:14px">
                        <%= model.get("uploadDate").split(" ")[0] %>
                    </div>
                    <div class="clear-fix"></div>
                    <%= me.getPlugin("lm").render(model.get("description"), 235) %>
                    
                    <div class="clear-fix comments-pl"></div>
                </td>
            </tr>
        <% }); %>
    </table>
<% } %>