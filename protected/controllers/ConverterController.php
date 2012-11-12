<?php

class ConverterController extends Controller {
	public function actionNotify() {
		file_put_contents("/tmp/ss", print_r($_POST, true));
		file_put_contents("/tmp/ss", print_r($_GET, true), FILE_APPEND);
	}
}