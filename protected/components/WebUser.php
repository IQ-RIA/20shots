<?php

	class WebUser extends CWebUser {
		protected $model;
		public $allowAutoLogin = true;

		public function writeUserInfo($return = false) {
			$model = $this->getModel();			
			$result = array(
				'userId' => $model->userId,
				'email' => $model->email,
				'facultyId' => $model->facultyId,
				'firstName' => $model->firstName,
				'lastName' => $model->lastName,
				'status' => $model->status,
				'type' => $model->type,
				'uploadCounter' => $model->uploadCounter,
				'countryId' => $this->getCountryId(),
				'cityTitle' => $this->getCityTitle(),
				'cityId' => $this->getCityId(),
				'universityId' => $this->getUniversityId(),
				'universityTitle' => $this->getUniversityTitle(),
			);

			if($return) {
				return $result;
			}

			echo 'user = ' . CJSON::encode($result) . ';';
		}

		public function getModel() {
			if(!$this->model) {
				$this->model = User::model()->findByPk($this->id);
			}

			return $this->model;
		}

		public function getUserId() {
			return $this->getModel()->userId;
		}

		public function getUniversityId() {
			return $this->getModel()->universityId;
		}

		public function getCountryId() {
			return $this->getModel()->countryId;
		}

		public function getCityId() {
			return $this->getModel()->cityId;
		}

		public function getUniversityTitle() {
			$model = University::model()->findByPk($this->universityId);
			return $model->title;
		}

		public function getCityTitle() {
			$model = City::model()->findByPk($this->cityId);
			return $model->title;
		}
	}
?>