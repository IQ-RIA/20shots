define [
    'j/core/base/View'
    'text!j/view/user/login/LoginForm.tpl'
    'j/core/utils'
], (View, tpl, utils) ->
    View.extend
        el: '#inner-container'
        events: 
            'click #login-button': 'onLoginButtonClick'
            'click .social-link.vk': 'loginViaVk'

        doRender: ->
            _.template tpl,
                welcome: J.t("Welcome to StudShara"),
                ssDescription: J.t(
                    """
                        Studshara is a place, that helps you to earn money and improve your marks at university.
                        <br/>
                        <br/>
                        <ul class="app-desc">
                            <span>In Studshara you can</span>
                            <li>Download free laboratory, control, seminars, lections, and other stuff</li>
                            <li>Share your work with other</li>
                            <li>Earn money using knowlage received in the university</li>
                            <li>And much much more ...</li>
                        </ul>
                    """
                ),
                passwordPlaceholder: J.t("Password"),
                logIn: J.t("Log In"),
                vkAppId: J.constants.VK_APP_ID,
                createAccount: J.t("Create Account"),
                socialLogIn: J.t("Log in via <a class='social-link vk'>Vkontakte</a>?")

        renderNotice: (message)->
            J.fire "error", message
        
        onLoginButtonClick: (e)->
            e.preventDefault()

            emailField = $(".email", @$el)
            passwordField = $("#password", @$el)

            if !utils.validation.email.test(emailField.val())
                return @renderNotice("Email isn't correct")

            if passwordField.val().length < 6
                return @renderNotice("Password should be more then 6 letters")

            $.post(J.links.user.login,
                email: emailField.val()
                password: passwordField.val()
            ).success(
                _.bind((response)->
                    result = null
                    try
                        result = $.parseJSON(response)
                    catch e

                    return unless result

                    unless result.success
                        return @renderNotice("Email or password isn't correct")
                    
                    J.fire 'login.success', result.data[0]
                , @)
            )

        ###
            tries to login user via vkontakte-social network
            @returns {undefined}
        ###
        loginViaVk: (e)->
            e.preventDefault()
            VK.Auth.login(@onLoginResponse)

        onLoginResponse: (response)->
            return unless response.status == "connected"

            user = response.session.user
                
            VK.api("isAppUser", 
                uid: user.id 
            , (response)->
                return if response.response - 0 != 1

                user.firstName = user.first_name
                user.lastName = user.last_name
                user.vkId = user.id

                $.post(J.links.verify, 
                    vkId: user.vkId
                , _.bind(
                    (response)->
                        if response.success
                            J.fire("login.success", response.items[0]);
                        else 
                            VK.api("users.get", {
                                uids: user.id,
                                fields: "city, country, education"
                            }, (response)->
                                response = response.response[0]
                                user.country = response.country
                                user.city = response.city
                                user.university = response.university
                                user.faculty = response.faculty
                                J.app.instance().getRouter("user").fastLogin(user)
                            )
                    , @)
                , "json")
            )
