<?php

class WorkController extends Controller {

	/**
	 * @inheritdoc
	 */
	public function actions() {
		return array(
			'faculty' => array(
		        'class' => 'application.components.actions.ListAction',
		        'model' => 'Task',
		        'id' => 'facultyId'
		    )
		);
	}
}