/**
 * @author Ruslan Prytula
 * @class MenuPanel
 *
 * Class is used to display an application's menu interface 
 */

define([
    'j/core/base/View',
    'text!j/view/menu/MenuPanel.tpl',
    'j/core/utils'
], function(View, tpl, utils) {

    return View.extend({

        /**
         * @inheritdoc
         */
        el: '.menu',

        /**
         * @inheritdoc
         */
        tpl: _.template(tpl),

        /**
         * @inheritdoc
         */
        events: {
            'click .item-text': 'onMenuItemClick'
        },

        /**
         * @property
         * @var {Array} modules list of all application's modules
         */
        modules: [
            'shara',
            'profile',
            'geek',
            'work',
            'problems',
            //'news'
        ],

        /**
         * @inheritdoc
         */
        initialize: function() {
            J.on("page.active", this.onActivePageChanged, this);
        },

        doRender: function() {
            return this.tpl({
                sharaTitle: J.t("Shara"),
                workTitle: J.t("Oh, Work!"),
                profileTitle: J.t("My Profile"),
                weCanTitle: J.t("Yes, We Can"),
                newsTitle: J.t("News"),
                myProblemsTitle: J.t("My Problems")
            });
        },

        onMenuItemClick: function(e) {
            var target = $(e.target).parent("li"),
                idx = $('.menu li').index(target),
                module = this.modules[idx],
                user = J.app.instance().getUser();

            if(module == "shara") {
                module = module + utils.createRoute({
                    countryId: user.get("countryId"),
                    cityId: user.get("cityId"),
                    facultyId: user.get("facultyId"),
                    universityId: user.get("universityId")
                });
            } else if(module == "work") {
                module = module + utils.createRoute({
                    cityId: user.get("cityId"),
                    universityId: user.get("universityId"),
                    facultyId: user.get("facultyId"),
                    countryId: user.get("countryId")
                });
            }
            
            Backbone.history.navigate(module, {
                trigger: true
            });
        },

        onActivePageChanged: function(pageName) {
            var idx = this.modules.indexOf(pageName);

            $('.menu li').removeClass("active");
            $('.menu li:eq(' + idx + ')').addClass("active");
        }
    });
});