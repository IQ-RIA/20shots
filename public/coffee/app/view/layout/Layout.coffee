
define [
    'j/core/base/View'
    'text!j/view/layout/LoginLayout.tpl'
    'text!j/view/layout/DefaultLayout.tpl'
], 
(View, LoginLayout, DefaultLayout) ->
    View.extend
        el: "body"
        tpl: LoginLayout
        renderParams: {}

        events: 
            "click #fb-login-btn": "onFbLoginButtonClick"

        addPage: (page) ->
            if @currentPage
                @items = _.reject @items, (item)-> 
                    @currentPage == item
                , @

            @currentPage = page
            @add page

            if not @rendered
                @render()
            else
                page.render()

        doRender: ->
            $(@el).attr "class", @cls
            _.template @tpl, @renderParams

        
        toLogin: ->
            @clear()
            @name = 'login'
            @cls = 'login-layout'
            @tpl = LoginLayout
            @renderParams = 
                vkAppId: J.constants.VK_APP_ID
            @

        toDefault: ->
            @clear()
            @name = 'default'
            @tpl = DefaultLayout
            @cls = 'default-layout'
            @renderParams = 
                logoutLink: J.links.user.logout
            @

        onFbLoginButtonClick: ->
            FB.getLoginStatus (response) =>
                if response.status == "connected"
                    @onFacebookLogin response
                else if response.status == "not_authorized"
                    @loginViaFacebook()
                else
                    @loginViaFacebook()

        loginViaFacebook: ->
            FB.login (response) =>
                if response.authResponse
                    @onFacebookLogin response
            , scope: "email, user_photos"

        onFacebookLogin: (response) ->
            accessToken = response.authResponse.accessToken
            $.post "/user/fbLogin", accessToken: accessToken, (response) =>
                @toDefault().render() if response.success 
            , "json"


