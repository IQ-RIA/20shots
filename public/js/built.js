({
	name: './init',
	out: './init-min.js',
	optimize: "uglify",
    preserveLicenseComments: false,
    uglify: {
        beautify: false
    },
    paths: {
        'j': './application',
        'order': 'libs/order',
        'text': 'libs/text',
        'plugins': 'libs/jquery/plugins',
        'jquery': 'libs/jquery/jquery-1.7.1',
        'bootstrap': 'libs/bootstrap/js/bootstrap',
        'bootstrap-tab': "libs/bootstrap/plugins/tab",
        'bootstrap-modal': "libs/bootstrap/plugins/modal",
        'bootstrap-alert': "libs/bootstrap/js/bootstrap-alert",
        'jquery-ui': 'libs/jquery/ui/development-bundle/ui/jquery-ui-1.8.20.custom',
        '_': 'libs/underscore/underscore_full',
        'Backbone': 'libs/backbone/backbone_full',
        'Class': 'libs/class'
    }
})