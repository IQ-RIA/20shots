/**
 * @author Ruslan Prytula
 *
 * Application's enter-point
 * includes all required controllers
 * application's layout
 */

define([  
    'j/model/User',
    'j/view/layout/Layout',
    'j/controller/UserController',
    'j/controller/NewsController',
    'j/controller/ProfileController',
    'j/controller/ProblemsController',
    'j/controller/SharaController',
    'j/controller/SearchController',
    'j/controller/WorkController',
    'j/controller/GeekController',
    'j/controller/DocumentController'
], function() {
    var User = arguments[0],
        Layout = arguments[1],
        routers = Array.prototype.splice.call(arguments, 2);
    
    J.app = window.J.app || new function() {

        /**
         * @protected 
         * starts backbone-history
         */
        this._initHistory = function() {
            this.started = true;          
            Backbone.history.start();
        };

        /**
         * @protected
         * creates routers
         */
        this._initialize = function() {
            this._routers = {};
            _.each(routers, function(router, index) {
                if(!router) {
                    return ;
                }

                router = new router;
                this._routers[router.getName()] = router;
            }, this);         

            var layout = this.getLayout();

            if(!this.userLoggedIn()) {
                layout.toLogin()
                layout.render();
                layout.rendered = false;
                return ;
            }

            J.fire('login.success', window.user);
        };

        /**
         * @returns {Object} layout
         */
        this.getLayout = function() {
            return this._layout || (this._layout = new Layout);
        }

        /**
         * @public
         * @description starts the application
         * @returns {undefined}
         */
        this.start = function() {
            this._initConfig();
            this._initTranslator();
            this._listen();
            this._initialize();
        }

        /**
         * @protected
         * @description simply adds required-listeners
         * @returns {undefined}
         */
        this._listen = function() {
            J.on("login.success", this._onUserLoggedIn, this);
        }


        /**
         * @protected
         * @description fires when user has been successfully loggedIn
         * @returns {undefined}
         */
        this._onUserLoggedIn = function(user) {
            window.user = window.user || user;
            var layout = this.getLayout();
            layout.toDefault();
            this._initHistory();
        }

        /**
         * @public
         * @param {String} name routers' name
         * @returns {undefined} instance of Backbone.Router
         */
        this.getRouter = function(name) {
            return this._routers[name];
        }

        /**
         * @returns {Boolean} true if user has been loggedIn into the system
         */
        this.userLoggedIn = function() {
            return typeof user !== "undefined" ;
        }

        /**
         * @protected
         * @description initializes all required config
         * @returns {undefined}
         */
        this._initConfig = function() {
            this._language = "ru";
        }

        /**
         * @public
         * @returns {Object} user
         */
        this.getUser = function() {
            return this.user || (this.user = new User(window.user));
        }

        /**
         * @protected
         * @description initializes applications' translator
         * @returns {undefined}
         */
        this._initTranslator = function() {
            J.t = function(msg) { return msg; }
        }

        var me = this;

    	return {

            /**
             * @static
             */
    		instance: function() {
    			return me;
    		}
    	}
    }
});