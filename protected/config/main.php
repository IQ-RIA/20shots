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
			'connectionString' => 'mysql:host=localhost;dbname=20shots',
			'enableProfiling' => true,
            'enableParamLogging' => true,  
			'emulatePrepare' => true,
			'username' => '20shots',
			'password' => 'QxZ67XtexEWAB4pf',
			'charset' => 'utf8',
		),
		
		'errorHandler'=>array(
			// use 'site/error' action to display errors
            'errorAction'=>'site/error',
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
		'VK' => array(
			'APP_SHARED_SECRET' => 'nqfgtV4pCRpaGVkK3B4v',
			'APP_ID' => '3233628',
		),
		'FB' => array(
			'APP_ID' => 305283736244595,
			'APP_SECRET' => 'c85d3e36b34d2426ccac0b95dd30dec1'
		)
	)
	
);