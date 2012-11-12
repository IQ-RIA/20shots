<?php

class UniversityController extends Controller {

	public function actions() {
		return array(
			'index' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'University',
				'id' => 'cityId'
			),
			'shara' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'University',
				'id' => 'cityId',
				'mode' => 'shara',
				'criteria' => array(
					'order' => 'freeUploadsCount desc, title asc'
				)
			)
		);
	}
}