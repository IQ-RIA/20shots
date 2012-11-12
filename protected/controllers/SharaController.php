<?php

class SharaController extends Controller {
	public function actions() {
		return array(
			'index' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'Solution',
				'id' => 'facultyId',
				'criteria' => array(
					//'order' => 'freeUploadsCount desc, title asc'
				)
			)
		);
	}
}