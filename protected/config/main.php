<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Studshara',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
		'application.components.mail.YiiMailMessage',
	),

	'modules'=>array(
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'23',
		 	// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
		),
	),

	// application components
	'components'=>array(
		'user'=>array(
			'class' => 'WebUser',
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
            'loginUrl' => array('/user/login'),
		),
		'urlManager'=>array(
			'urlFormat'=>'path',
			'rules'=>array(
				array('user/update', 'pattern'=>'user', 'verb'=>'PUT'),
				array('user/verify', 'pattern'=> 'login/verify', 'verb'=>'POST'),
				array('user/fastLogin', 'pattern'=> 'user/fastLogin', 'verb'=>'POST'),
				
				array('solution/content', 'pattern' => 'solution/content/<solutionId:\d+>', 'verb' => 'GET'),
				array('solution/create', 'pattern' => 'solution/create', 'verb' => 'POST'),
				// default rules

				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
			),
		),
		
		// 'db'=>array(
		// 	'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
		// ),
		// uncomment the following to use a MySQL database
		
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=ss',
			'enableProfiling' => true,
            'enableParamLogging' => true,  
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '23',
			'charset' => 'utf8',
		),
		
		'errorHandler'=>array(
			// use 'site/error' action to display errors
            //'errorAction'=>'site/error',
        ),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				// array(
				// 	'class'=>'CFileLogRoute',
				// 	'levels'=>'error, warning',
				// ),
				// // uncomment the following to show log messages on web pages
				
				// array(
				// 	'class'=>'CProfileLogRoute',
				// 	'report' => 'summary'
				// ),
				
			),

		),
		'session' => array(
			'class' => 'CHttpSession',
			'autoStart' => true
		),
		'mail' => array(
 			'class' => 'application.components.mail.YiiMail',
 			'transportType' => 'php',
 			'viewPath' => 'application.views.mail',
 			'logging' => true,
 			'dryRun' => false
 		),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'support@studshara.com',
		'supportEmail' => 'support@studshara.com',
		'APP_SHARED_SECRET' => '',
		'APP_ID' => '',

		'converter' => array(
			'notificationUrl' => "http://studshara.com/converter/notify",
			'login' => 'rpritula@takeforce.com',
			'password' => '0hu6p7fl'
		)
	)
	
);