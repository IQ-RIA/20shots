<?php
	/**
	 * @author Ruslan Prytula
	 */
	class ListAction extends CAction {

		/**
		 * @var {String} $model name of model for manipulation
		 */
		public $model;

		/**
		 * @var {String} $id name of idField that should help me to
		 *					 find all required instances of #model
		 */
		public $id;

		/**
		 * @var {Function} $before function that will execute before action call
		 */
		public $preProcess = null;

		/**
		 * @var {Function} $before function that will execute after action call
		 */
		public $postProcess = null;

		/**
		 * @var {String} $mode
		 */
		public $mode = null;
	
		/**
		 * @var {Number} $pageSize
		 */
		protected $pageSize = 20;

		/**
		 * @var {Array} $criteria
		 */
		public $criteria = array();

		public $search = array('title');

		public $searchParam = "search";

		/**
		 * @inheritdoc
		 */
		public function run() {
			if(!is_null($this->preProcess)) {
				call_user_func($this->preProcess);
			}

			$modelClass = $this->model;
			$criteria = new CDbCriteria();

			$search = Yii::app()->request->getParam($this->searchParam, null);

			if($search) {
				foreach ($this->search as $name) {
					$criteria->addSearchCondition($name, $search, true, "OR");
				}
			}	

			if($this->id) {
				$id = Yii::app()->request->getParam($this->id, null);

				if(is_null($id)) {
					throw new CHttpException(404);
				}

				$criteria->addColumnCondition(array(
					"{$this->id}" => (int) $id
				));
			}

			
			foreach ($this->criteria as $name => $value) {
				$criteria->{$name} = $value;
			}
			
			$currentPage = Yii::app()->request->getParam("page", 0);
			$dataProvider = new CActiveDataProvider($modelClass, array(
			    'criteria' => $criteria,
			    'pagination' => array(
			    	'currentPage' => $currentPage,
			        'pageSize' => $this->pageSize,
			    ),
			));

			$models = $dataProvider->getData();

			if(!is_null($this->postProcess)) {
				$models = call_user_func($this->postProcess, $models);
			}
			
			if($this->mode) {
				$result = array();
				foreach ($models as &$model) {
					$result[] = $model->setMode($this->mode)->plain();
				}
				$models = $result;
			}

			$this->controller->renderJson(array(
				'success' => true,
				'items' => $models,
				'paging' => array(
					'page' => $currentPage,
					'pageCount' => $dataProvider->getPagination()->getPageCount(),
					'total' => $dataProvider->getTotalItemCount()
				)
			));
		}
	}
?>