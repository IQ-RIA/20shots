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
            "click #vk-login-btn": "onVkLoginButtonClick"
            "click #play-btn": "onPlayButtonClick"
            "keypress #search-val": "onSongSearchChanged"

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

        onVkLoginButtonClick: (e)->
            e.preventDefault()
            VK.Auth.login @onVkLogin, 1+4 #notifications and photos

        onVkLogin: (response)->
            return if response.status != "connected"

            user = response.session.user;

            VK.api("isAppUser", 
                uid: user.id
            , (response)->
                return if response.response - 0 != 1 #not applied

                user.first_name = user.first_name
                user.last_name = user.last_name
                user.vk_id = user.id

                # login user in server

                $.ajax
                    type: "POST",
                    data: user,
                    url: J.links.user,
                    dataType: "json",
                    success: (response)->
                        window.user = response.user
                        window.online = response.online
                        J.app.renderDefaultLayout()
            , "json")

        onPlayButtonClick: (e) ->
            target = $(e.target)

            if target.hasClass "isActive"
                target.val "Play"
                target.removeClass "isActive"
            else
                target.val "Stop Playing"
                target.addClass "isActive"
                @playSong()

        playSong: ->
            el = $("#player").get(0)
            el.src = "http://#{window.location.hostname}/music/#{J.currentDj}.mp3"
            el.play()


        onSongSearchChanged: (e) ->
            field = $(e.target)

            if @searchTimeout
                clearTimeout @searchTimeout

            @searchTimeout = setTimeout =>
                @loadSongs field.val()
            , 350

        loadSongs: (name)->
            VK.api "audio.search", 
                q: name
                auto_complete: true
                sort: 2
                count: 200
            , _.bind(@renderSongList, @)

        renderSongList: (config)->
            @getSongList().updateWith(config.response)
                

