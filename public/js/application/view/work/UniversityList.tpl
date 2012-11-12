<div class="main-container work">
    <div class="search right" style="margin-top: 0px">
        <input type="search" class="search-input" name="search" placeholder="Search" />
    </div>
    <table class="table table-bordered university-list">
        <thead>
            <tr>
                <th>Universities</th>
            </tr>
        </thead>
        <tbody>
            <% collection.each(function(model) { 
                item = model.attributes;
            %>
                <tr>
                    <td><%=item.title %></td>
                </tr>
            <% }); %>
        </tbody>
    </table>
</div>