define([
    'j/view/work/WorkPage',
    'j/view/breadcrumbs/BreadcrumbsPanel'
], function(WorkPage, BreadcrumbsPanel) {
    return Backbone.Router.extend({
        routes: {
            'work': 'show',
            'work/country': 'show',
            'work/country/:countryId': 'show',
            'work/country/:countryId/city': 'show',
            'work/country/:countryId/city/:cityId': 'show',
            'work/country/:countryId/city/:cityId/university': 'show',
            'work/country/:countryId/city/:cityId/university/:universityId': 'show',
            'work/country/:countryId/city/:cityId/university/:universityId/faculty': 'show',
            'work/country/:countryId/city/:cityId/university/:universityId/faculty/:facultyId': 'show'
        },
        
        show: function (countryId, cityId, universityId, facultyId) {
            J.fire("layout.page.add", new WorkPage);
        },

        getName: function() {
            return 'work';
        }
    });
});