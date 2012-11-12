<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity {
	public $userId;
	/**
	 * Authenticates a user.
	 * @return boolean whether authentication succeeds.
	 */
	public function authenticate() {
		$this->errorCode=self::ERROR_NONE;
		$this->errorMessage = Yii::t("login", "Email or password is invalid");
		$record = User::model()->findByAttributes(array(
			'email' => $this->username
		));

		if($record == null) {
			$this->errorCode = self::ERROR_USERNAME_INVALID;
		} elseif ($record->password !== md5($this->password)) {
			$this->errorCode = self::ERROR_PASSWORD_INVALID;
		}

		if($this->errorCode == self::ERROR_NONE) {
			$this->userId = $record->userId;
		}

		return !$this->errorCode;
	}

	public function getId() {
		return $this->userId;
	}
}