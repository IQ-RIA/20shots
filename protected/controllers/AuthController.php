<?php

Yii::import("application.components.Google");

class AuthController extends Controller {
	public function actionGoogleLogin() {
		$google = new Google();
		$google->login();
	}
}