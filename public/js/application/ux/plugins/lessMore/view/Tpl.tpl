<%
    var lm = true;

    if(shortText.length == fullText.length) {
        lm = false;
    }
%>

<div class="lm-placeholder">
    <div class="text-content short-content">
        <%= shortText %>
        <% if(lm) { %>
                <a class="more">Show More</a>
            </div>    
            <div class="text-content full-content" style="display: none">
                <%= fullText %><a class="less">Show Less</a>
            </div>
        <% } else { %>
            </div>
        <% } %>
</div>