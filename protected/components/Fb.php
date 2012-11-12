<?php
/**
 * Created by JetBrains PhpStorm.
 * User: konst
 * Date: 11/13/12
 * Time: 12:09 AM
 * To change this template use File | Settings | File Templates.
 */
class Fb extends CComponent
{
	protected $_fb;

	public function __construct($token, $appId = null, $appSecret = null) {
		if (!$appId) {
			$appId = Yii::app()->params['FB']['APP_ID'];
		}
		if ($appSecret) {
			$appSecret = Yii::app()->params['FB']['APP_SECRET'];
		}
		Yii::$classMap = array(
			'Facebook' => YiiBase::getPathOfAlias('application.vendors.fb.facebook') . '.php',
			'BaseFacebook' => YiiBase::getPathOfAlias('application.vendors.fb.base_facebook') . '.php'
		);
		$this->_fb = new Facebook(array(
		                              'appId' => Yii::app()->params['FB']['APP_ID'],
		                              'secret' => Yii::app()->params['FB']['APP_SECRET'],
		                         ));

		$this->_fb->setAccessToken('AAACEdEose0cBACFl2aEOGOZBYtZBP9WBM7JGUCsgpL29y4u9A4kqUC3xjblPIJ8sAZBXlETKS4E8c2aLsudj7Ry0emaBSZBVrSeev0amVgZDZD');
	}

	public function __call($name, $params) {
		return call_user_func_array(array($this->_fb, $name), $params);
	}

	public function fql($query) {
		return $this->_fb->api('/fql?q='.urlencode($query), 'GET');
	}

}
