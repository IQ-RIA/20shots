<?php

class TranslateController extends Controller {
	public function actionIndex() {
		$lang = Yii::app()->request->getParam("lang", false);

		if(!$lang) {
			throw new CHttpException(404);
		}

		$criteria = new CDbCriteria;
		$criteria->select = "eng, $lang";

		$models = Translation::model()->findAll($criteria);
		$json = array();

		foreach ($models as $model) {
			$json[$model->eng] = $model->{$lang};
		}

		$this->renderJson($json);
	}
}