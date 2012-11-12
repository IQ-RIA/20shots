<?php

class FacultyController extends Controller {
	public function actions() {
		return array(
			'index' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'Faculty',
				'id' => 'universityId'
			),
			'shara' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'Faculty',
				'mode' => 'shara',
				'id' => 'universityId',
				'criteria' => array(
					'order' => 'freeUploadsCount desc, title asc'
				)
			)
		);
	}
}