<?php

class SearchController extends Controller {
	public function actions() {
		return array(
			'index' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'Solution',
				'searchParam' => "search",
				'search' => array('description', 'title')
			)
		);
	}
}