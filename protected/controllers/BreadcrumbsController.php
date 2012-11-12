<?php
Yii::import("application.components.Breadcrumbs");


class BreadcrumbsController extends Controller {
	public function actionIndex() {
		$breadcrumbs = new Breadcrumbs();
		$this->renderJson(array(
			'items' => $breadcrumbs->toArray(),
			'success' => true
		));
	}
}