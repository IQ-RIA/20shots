define([
    'j/core/base/Router',
    'j/view/shara/content/SharaPanel',
    'j/view/shara/upload/UploadView',
    'j/components/country/CountryList',
    'j/components/city/CityList',
    'j/components/university/UniversityList',
    'j/components/faculty/FacultyList',
    'j/view/shara/page/SharaPage',
    'j/view/toolbar/ListToolbar'
], function(
    Router, 
    SharaPanel, 
    UploadView, 
    CountryList, 
    CityList, 
    UniversityList, 
    FacultyList, 
    SharaPage,
    ListToolbar
) {
    return Router.extend({
        routes: {
            'shara/countries': 'showCountryList',
            'shara/country/:countryId': 'showCityList',
            'shara/country/:countryId/city': 'showCityList',
            'shara/country/:countryId/city/:cityId': 'showUniversityList',
            'shara/country/:countryId/city/:cityId/university': 'showUniversityList',
            'shara/country/:countryId/city/:cityId/university/:universityId': 'showFacultyList',
            'shara/country/:countryId/city/:cityId/university/:universityId/faculty': 'showFacultyList',
            'shara/country/:countryId/city/:cityId/university/:universityId/faculty/:facultyId': 'showContent',
            'shara/country/:countryId/city/:cityId/university/:universityId/faculty/:facultyId/upload': 'showUploadPage',
        },

        /**
         * @param {Object} request
         * @returns {undefined}
         */
        initRequest: function(request) {
            this.request = request || {};
        },

        /** 
         * simply renders list of passed class
         * @returns {undefined}
         */
        createList: function(cls) {
            var list = new cls({
                request: this.request,
                el: '.page.shara .inner-content'
            });

            list.setMode("shara");
            list.initToolbar();

            return list;
        },

        /**
         * simply renders list of all shara-content for current faculty
         * @returns {undefined}
         */
        showContent: function(countryId, cityId, universityId, facultyId) {
            this.initRequest({
                countryId: countryId,
                cityId: cityId,
                universityId: universityId,
                facultyId: facultyId
            }); 

            this.createPage({
                items: [new SharaPanel({
                    request: this.request
                })]
            });
        },

        createPage: function(config) {
            var page = new SharaPage();
            page.add(this.createBreadcrumbs());

            for (var i = config.items.length - 1; i >= 0; i--) {
                var cls = config.items[i];

                if(_.isFunction(cls)) {
                    page.add(new cls);
                } else {
                    page.add(cls);
                }
            };

            J.fire("layout.page.add", page);
            return page;
        },

        /**
         * simply renders list of cities
         * @returns {undefined}
         */
        showCityList: function(countryId) {
            this.initRequest({
                countryId: countryId 
            });
            
            this.createPage({
                items: [this.createList(CityList)]
            });
        },

        /**
         * simply renders list of countries
         * @returns {undefined}
         */
        showCountryList: function() {
            this.initRequest();
            this.createPage({
                items: [this.createList(CountryList)]
            });
        },

        /**
         * simply renders list of universities
         * @returns {undefined}
         */
        showUniversityList: function(countryId, cityId) {
            this.initRequest({ 
                countryId: countryId,
                cityId: cityId 
            });

            this.createPage({
                items: [this.createList(UniversityList)]
            });
        },

        /**
         * simply renders list of faculties
         * @returns {undefined}
         */
        showFacultyList: function(countryId, cityId, universityId) {
            this.initRequest({
                countryId: countryId,
                cityId: cityId,
                universityId: universityId
            });

            this.createPage({
                items: [this.createList(FacultyList)]
            });
        },

        showUploadPage: function(countryId, cityId, universityId, facultyId) {
            this.initRequest({
                countryId: countryId,
                cityId: cityId,
                universityId: universityId,
                facultyId: facultyId
            });

            this.createPage({
                items: [ 
                    new UploadView({ 
                        el: '.shara.page .inner-content',
                        request: this.request
                    })
                ]
            });
        },

        /**
         * @inheritdoc
         */
        getName: function() {
            return 'shara';
        }
    });
});