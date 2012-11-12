require.config
    baseUrl: '/public/js'
    paths:
        'j': 'app'
        'order': 'libs/order'
        'text': 'libs/text'
        'libs': 'libs'
        'plugins': 'libs/jquery/plugins'
        'jquery': 'libs/jquery/jquery-1.7.1'
        'bootstrap': 'libs/bootstrap/js/bootstrap'
        '_': 'libs/underscore/underscore_full'
        'Backbone': 'libs/backbone/backbone_full'
        'Class': 'libs/class'

require ['init']