define([
    'j/core/base/View',
    'text!j/view/layout/LoginLayout.tpl',
    'text!j/view/layout/DefaultLayout.tpl',
    'j/core/utils',
    'j/view/menu/MenuPanel',
    'j/view/user/login/LoginForm',
    'j/components/search/Search'
],function(View, loginLayout, defaultLayout, utils, Menu, LoginForm, SearchWidget) {
    return View.extend({

        /**
         * @inheritdoc
         */
        el: "body",

        /**
         * @property
         * @var {String} current template
         */
        tpl: loginLayout,

        /**
         * @inheritdoc
         */
        events : {
            "click .language": "onLangButtonClick",
            "click .logout": "onLogOutButtonClick",
            "change .search-query": "onGlobalSearchChanged"
        },

        /**
         * @property
         * @var {Object} 
         */
        renderParams: {},

        /**
         * @inheritdoc
         */
        initialize: function() {
            View.prototype.initialize.apply(this, arguments);
            J.on("layout.page.add", this.addPage, this);
        },

        /**
         * @inheritdoc
         */
        addPage: function(page) {
            if(this.currentPage) {
                this.items = _.reject(this.items, function(item) { 
                    this.currentPage == item
                }, this);
            }

            this.currentPage = page;
            this.add(page);

            if(!this.rendered) {
                this.render();
            } else {
                page.render();
            }
        },

        /**
         * @inheritdoc
         */
        doRender: function() {     
            $(this.el).attr("class", this.cls);
            return _.template(this.tpl, this.renderParams);
        },

        /**
         * @returns {undefined}
         */
        toLogin: function() {
            this.clear();
            this.name = 'login';
            this.cls = 'login-layout';
            this.tpl = loginLayout;
            this.add([new LoginForm()]);
            return this;
        },

        /**
         * @returns {undefined}
         */
        toDefault: function() {
            this.clear(); //remove all cached items
            this.name = 'default';
            this.tpl = defaultLayout;
            this.cls = 'default-layout';
            this.renderParams = {
                logoutLink: J.links.user.logout,
                logOut: J.t("Log Out")
            }

            this.addNavMenu();
            this.addSearchWidget();
            return this;
        },

        addNavMenu: function() {
            this.add(new Menu);
        },

        addSearchWidget: function() {
            var searchWidget = new SearchWidget({
                el: ".global-search-pl"
            });

            this.mon(searchWidget, "change", this.onGlobalSearchChanged, this);
            this.add(searchWidget);
        },

        onLangButtonClick: function(e) {
            var target = $(e.target), lang = target.attr('class').split(" ")[0];

            $(".language").removeClass('active');
            target.addClass('active');
            $.cookie("language", lang);
            J.lang(lang);

            if(lang == 'eng' || J.translations(lang)) {
                return J.fire("t");
            }

            $.ajax({
                url: J.links.translate,
                data: { lang: lang },
                context: this
            }).done(function(response) {
                J.translations(lang, $.parseJSON(response));
                J.fire("t");
            });
        },

        onLogOutButtonClick: function() {
            $.post(J.links.user.logout).success(function() {
                window.location.reload(true);
            });
        },

        unbind: function() {
            View.prototype.unbind.apply(this, arguments);
            J.un("layout.page.add", this.add, this);
        },

        onGlobalSearchChanged: function(field, val) {
            var replace = false;

            if(window.location.hash.indexOf("search") === 1) {
                replace = true;
            }

            Backbone.history.navigate("search/" + val, {
                trigger: true,
                replace: replace
            });
        }
    });
});