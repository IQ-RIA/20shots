// Generated by CoffeeScript 1.3.3

define(['j/core/base/View', 'text!j/view/layout/LoginLayout.tpl', 'text!j/view/layout/DefaultLayout.tpl'], function(View, LoginLayout, DefaultLayout) {
  return View.extend({
    el: "body",
    tpl: LoginLayout,
    renderParams: {},
    events: {
      "click #fb-login-btn": "onFbLoginButtonClick"
    },
    addPage: function(page) {
      if (this.currentPage) {
        this.items = _.reject(this.items, function(item) {
          return this.currentPage === item;
        }, this);
      }
      this.currentPage = page;
      this.add(page);
      if (!this.rendered) {
        return this.render();
      } else {
        return page.render();
      }
    },
    doRender: function() {
      $(this.el).attr("class", this.cls);
      return _.template(this.tpl, this.renderParams);
    },
    toLogin: function() {
      this.clear();
      this.name = 'login';
      this.cls = 'login-layout';
      this.tpl = LoginLayout;
      this.renderParams = {
        vkAppId: J.constants.VK_APP_ID
      };
      return this;
    },
    toDefault: function() {
      this.clear();
      this.name = 'default';
      this.tpl = DefaultLayout;
      this.cls = 'default-layout';
      this.renderParams = {
        logoutLink: J.links.user.logout
      };
      return this;
    },
    onFbLoginButtonClick: function() {
      var _this = this;
      return FB.getLoginStatus(function(response) {
        if (response.status === "connected") {
          return _this.onFacebookLogin(response);
        } else if (response.status === "not_authorized") {
          return _this.loginViaFacebook();
        } else {
          return _this.loginViaFacebook();
        }
      });
    },
    loginViaFacebook: function() {
      var _this = this;
      return FB.login(function(response) {
        if (response.authResponse) {
          return _this.onFacebookLogin(response);
        }
      }, {
        scope: "email, user_photos"
      });
    },
    onFacebookLogin: function(response) {
      var accessToken,
        _this = this;
      accessToken = response.authResponse.accessToken;
      return $.post("/user/fbLogin", {
        accessToken: accessToken
      }, function(response) {
        if (response.success) {
          return _this.toDefault().render();
        }
      }, "json");
    }
  });
});
