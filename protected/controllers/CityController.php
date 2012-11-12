<?php

class CityController extends Controller {
	public function actions() {
		return array(
			'index' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'City',
				'id' => 'countryId'
			),
			'shara' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'City',
				'mode' => 'shara',
				'id' => 'countryId',
				'criteria' => array(
					'order' => 'title asc'
				)
			)
		);
	}
}
