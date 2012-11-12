define [  
    'j/view/layout/Layout'
], ->
    Layout = arguments[0]
    J.app = window.J.app || new ()->
        start: ->
            @layout = new Layout()

            if window.user
                @renderDefaultLayout()
            else
                @renderLoginLayout()

        renderDefaultLayout: ->
            @layout.toDefault().render()

        renderLoginLayout: ->
            @layout.toLogin().render()