<?php
	class EnvCommand extends CConsoleCommand {

		/**
		 * @return void
		 */
		public function actionSwitch($name) {
			$this->switchJsEnv($name);
			$this->switchAppEnv($name);
		}

		protected function switchJsEnv($name) {
			$envPath = Yii::app()->basePath . '/config/envs/js/env.php';
			$newEnvPath = Yii::app()->basePath . "/config/envs/js/$name.php";

			if (!file_exists($newEnvPath)) {
				throw new CException('Environment does not exist::' . $newEnvPath);
			}

			$command = "ln -sf $newEnvPath $envPath\n";
			echo $command;
			exec($command);
		}

		protected function switchAppEnv($name) {

		}
	}
?>