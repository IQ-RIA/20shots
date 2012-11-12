<?php

class CountryController extends Controller {
	public function actions() {
		return array(
			'index' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'Country'
			),
			'shara' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'Country',
				'mode' => 'shara',
				'criteria' => array(
					'order' => 'freeUploadsCount desc, title asc'
				)
			)
		);
	}
}