<?php

class UserController extends Controller {

	public function actionFbLogin() {
		echo json_encode(array('success' => true));
	}

	public function actionLogin() {
		$response = array( 'success' => true );
		$request = Yii::app()->request;
		$email = $request->getParam("email", false);
		$password = $request->getParam("password", false);

		if(!$email || !$password) {
			throw new CHttpException(404);
		}

		$identity = new UserIdentity($email, $password);

		if($identity->authenticate()) {
			Yii::app()->user->login($identity, 3600*24*7);
			$response['data'] = array(Yii::app()->user->writeUserInfo(true));
		} else {
			$response['success'] = false;
			$response['error'] = $identity->errorMessage;
		}

		$this->renderJson($response);
	}

	public function actionLogout() {
		Yii::app()->user->logout();
		$this->renderJson(array(
			'success' => true
		));
	}

	public function actionUpdate() {
		$user = Yii::app()->user->getModel();
		$params = $this->getRequest();
		$user->password = $params['password'];
		$user->isEmployee = $params['isEmployee'];

		if($user->isEmployee) {
			$user->isAvaible = $params['isAvaible'];
		}

		$result = array("success" => true);

		if(!$user->validate() || !$user->save(false, 'password')) {
			$result['success'] = false;
			$result['errors'] = $user->errors;
		}

		$this->renderJson($result);
	}

	public function actionVerify() {
		$request = Yii::app()->request;
		$vkId = $request->getParam('vkId', null);
		$fbId = $request->getParam('fbId', null);

		if(!$fbId && !$vkId) {
			throw new CHttpException(404);
		}

		if($fbId) {
			$user = User::model()->find("`fbId`=:fbId", array(':fbId' => $fbId));
		} else {
			$user = User::model()->find("`vkId`=:vkId", array(':vkId' => $vkId));
		}

		$response = array('success' => true);

		if($user) {
			$identity = new UserIdentity($user->email, $user->password);
			$identity->userId = $user->userId;
			Yii::app()->user->login($identity);
			$response['items'] = array(Yii::app()->user->writeUserInfo(true));
		} else {
			$response['success'] = false;
		}

		$this->renderJson($response);
	}

	public function actionFastLogin() {
		$response = array('success'=>true);
		$request = Yii::app()->request;
		$password = $this->generatePassword();
		$user = new User();
		$user->vkId = $request->getParam('vkId');
		$user->firstName = $request->getParam('firstName');
		$user->lastName = $request->getParam('lastName');
		$user->email = $request->getParam('email');
		$user->password = md5($password);
		$user->countryId = $this->getAppIdFromVkId(Country::model(), $request->getParam("country"));
		$user->cityId = $this->getAppIdFromVkId(City::model(), $request->getParam("city"));
		$user->universityId = $this->getAppIdFromVkId(University::model(), $request->getParam("university"));
		$user->facultyId = $this->getAppIdFromVkId(Faculty::model(), $request->getParam("faculty"));
		
		if(User::model()->find('`vkId`=:vkId', array(':vkId' => $user->vkId))) {
			$response['error'] = true;
			$this->renderJson($response);			
		}

		if(!$user->save()) {
			foreach ($user->errors as $name => $value) {
				$response['success'] = false;
				$response['error'] = $value[0];
				break;
			}
		} else {
			$identity = new UserIdentity($user->email, $user->password);
			$identity->userId = $user->userId;
			Yii::app()->user->login($identity);
			$response['items'] = array(Yii::app()->user->writeUserInfo(true));
			$this->sendPasswordMail($password, $user);
		}

		$this->renderJson($response);
	}

	public function sendPasswordMail($password, $user) {
		$message = new YiiMailMessage;
		$message->view = 'passwordGeneration';
		$message->setSubject("Studshara credentials");
		$message->setBody(array('email' => $user->email, 'password' => $password), 'text/html');
		$message->addTo($user->email);
		$message->from = Yii::app()->params['supportEmail'];
		Yii::app()->mail->send($message);
	}

	public function getAppIdFromVkId($model, $vkId) {
		$model = $model->find("`vkId`=:vkId", array(':vkId' => $vkId));
		return $model->getPrimaryKey();
	}

	public function generatePassword($length=9, $strength=0) {
		$vowels = 'aeuy';
		$consonants = 'bdghjmnpqrstvz';
		if ($strength & 1) {
			$consonants .= 'BDGHJLMNPQRSTVWXZ';
		}
		if ($strength & 2) {
			$vowels .= "AEUY";
		}
		if ($strength & 4) {
			$consonants .= '23456789';
		}
		if ($strength & 8) {
			$consonants .= '@#$%';
		}
	 
		$password = '';
		$alt = time() % 2;
		for ($i = 0; $i < $length; $i++) {
			if ($alt == 1) {
				$password .= $consonants[(rand() % strlen($consonants))];
				$alt = 0;
			} else {
				$password .= $vowels[(rand() % strlen($vowels))];
				$alt = 1;
			}
		}
		return $password;
	}
}

?>