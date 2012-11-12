window.J = {}; //global namespace
require([
    'order!jquery',
    'order!kendoui',
    'order!_',
    'order!Backbone',
    'order!Class',
    'order!j/core/EventBus',
    'order!j/core/config/constants',
    'order!j/core/config/links',
    'order!app',
    'order!plugins/jqueryscrollpagination/scripts/scrollpagination',
    'order!plugins/jquery-validation-1.9.0/jquery.validate',
    'order!j/view/alert/Alert',
    'order!j/core/Ajax',
    'order!j/core/utils',
    
    //plugins
    'order!plugins/form',
    'order!plugins/cookie',
    'order!plugins/loadmask/jquery.loadmask',
    'order!plugins/jquery.fileupload',
    'order!j/ux/plugins/BackboneRenderManager'
], function() {
    J.app.instance().start();
});