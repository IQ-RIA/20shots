define [
    'text!j/view/profile/ProfilePanel.tpl'
    'j/core/utils'
    'j/core/base/Page'
    'plugins/combo',
    'text!j/view/profile/WorkStatusTpl.tpl'
],
(tpl, utils, Page, plugin, workStatusTpl) ->
    Page.extend
        tpl: _.template tpl
        workStatusTpl: _.template workStatusTpl
        events: 
            'click [name="submitButton"]': 'onSubmitButtonClick'
            'click [name="resetButton"]': 'onResetButtonClick'
            'change #isEmployee': 'onWorkStatusChanged'

        doRender: ->
            user = J.app.instance().getUser()
            @tpl
                personalDataTitle: "Personal Data"
                workFieldSetTitle: "Work"
                studyFieldSetTitle: "Education"
                title: "My Profile"
                firstNameTitle: "First Name:"
                lastNameTitle: "Last Name:"
                emailTitle: "Email:"
                workTitle: "I want work"
                facultyTitle: "Faculty:"
                passwordTitle: "Password:"
                passwordAgainTitle: "Same password:"
                email: user.get("email")
                firstName: user.get("firstName")
                lastName: user.get("lastName")
                cityTitle: user.get("cityTitle")
                universityTitle: user.get("universityTitle")
                universityLabelTitle: "University:"
                cityLabelTitle: "City:"

        applyValues: ->
            user = J.app.instance().getUser()
            $("#profile-form [name]").each (index, item) ->
                item = $(item)
                attrName = item.attr("name")

                if typeof user.attributes[attrName] == "undefined" and user.hiddenAttributes.indexOf(attrName) == -1
                    item.val(user.get(attrName))

        getPageName: ->
            'profile'        

        onSubmitButtonClick: ->
            form = $("#profile-form")
            user = J.app.instance().getUser()
            password = $("#password", form).val()
            confirmPassword = $("#confirmPassword", form).val()

            message = null;
            message = "Passwords didn't match" if password != confirmPassword
            message = "Minimum length for password is 6 letters" if password.length < 6

            return J.fire("error", message) if message

            J.Ajax.put
                url: J.links.user.profile
                data:
                    password: password
                success: @onProfileSaved
                scope: @

        onResetButtonClick: ->
            J.fire "error"

        onProfileSaved: (response)->
            J.fire("error", response.errors) unless response.success
            J.fire("success")

        onWorkStatusChanged: (e) ->
            target = $(e.target)

            if target.is(":checked")
                @showWorkStatusField()
            else 
                @hideWorkStatusField()

        showWorkStatusField: ->
            $(".work-status-pl").html(@workStatusTpl())


        hideWorkStatusField: ->
            $(".work-status-pl").html("")
