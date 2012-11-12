<?php

Yii::import("application.components.Breadcrumbs");

/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends CController {
	/**
	 * @var string the default layout for the controller view. Defaults to '//layouts/column1',
	 * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
	 */
	public $layout='//layouts/main';
	/**
	 * @var array context menu items. This property will be assigned to {@link CMenu::items}.
	 */
	public $menu=array();
	/**
	 * @var array the breadcrumbs of the current page. The value of this property will
	 * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
	 * for more details on how to specify this property.
	 */
	public $breadcrumbs=array();

	public function renderJson($data) {
		echo CJSON::encode($data);
		Yii::app()->end();
	}

	public function getRequest() {
		$data = file_get_contents('php://input');

		if(strpos($data, "{") === 0) {// it's json
			$data = CJSON::decode($data, true);
		} else {
			$data = $this->parseGetParams($data);
		}

		return $data;
	}

	protected function parseGetParams($params) {
		$params = explode("&", $params);
		$result = array();
		foreach ($params as $param) {
			$parsed = explode("=", $param);
			$result[$parsed[0]] = $parsed[1];
		}

		return $result;
	}
}