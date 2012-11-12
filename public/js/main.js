require.config({
    baseUrl: 'public/js',
    paths: {
        'j': './application',
        'order': 'libs/order',
        'text': 'libs/text',
        'plugins': 'libs/jquery/plugins',
        'jquery': 'libs/jquery/jquery-1.7.1',
        'kendoui': 'libs/kendoui/js/kendo.web.min',
        '_': 'libs/underscore/underscore_full',
        'Backbone': 'libs/backbone/backbone_full',
        'Class': 'libs/class'
    }
});

require(['init']);