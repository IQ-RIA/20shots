<?php
	if($_POST['login'] == 'joe@doe.com' && $_POST['password'] == 'password') {
		echo json_encode(array(
			'success' => true,
			'data' => array(
				array(
					"firstName" => "FirstName", 
					"lastName"  => "LastName"
				)
			)
		));
	} else {
		echo json_encode(array(
			'success' => false,
			'data' => array(
				array(
					"firstName" => "FirstName", 
					"lastName"  => "LastName"
				)
			)
		));
	}
?>