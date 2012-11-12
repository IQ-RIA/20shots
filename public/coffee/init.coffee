window.J = {}
require [
    'order!jquery'
    'order!bootstrap'
    'order!_'
    'order!Backbone'
    'order!j/core/EventBus'
    'order!j/core/config/constants'
    'order!j/core/config/links'
    'order!app'
    'order!j/view/alert/Alert'
    'order!j/core/Ajax'
    'order!plugins/loadmask/jquery.loadmask'
    'order!j/ux/plugins/BackboneRenderManager'
    'order!libs/jquery/slider'
], ->
    J.app.start()