<?php
/**
 * Created by JetBrains PhpStorm.
 * User: konst
 * Date: 11/12/12
 * Time: 8:51 PM
 * To change this template use File | Settings | File Templates.
 */
class VKAuth extends CComponent
{
	public function getMember() {
		$session = array();
		$member = false;
		$valid_keys = array('expire', 'mid', 'secret', 'sid', 'sig');
		$app_cookie = $_COOKIE['vk_app_' . Yii::app()->params['APP_ID']];
		if ($app_cookie) {
			$session_data = explode('&', $app_cookie, 10);
			foreach ($session_data as $pair) {
				list($key, $value) = explode('=', $pair, 2);
				if (empty($key) || empty($value) || !in_array($key, $valid_keys)) {
					continue;
				}
				$session[$key] = $value;
			}
			foreach ($valid_keys as $key) {
				if (!isset($session[$key])) {
					return $member;
				}
			}
			ksort($session);

			$sign = '';
			foreach ($session as $key => $value) {
				if ($key != 'sig') {
					$sign .= ($key . '=' . $value);
				}
			}
			$sign .= Yii::app()->params['APP_SHARED_SECRET'];
			$sign = md5($sign);
			if ($session['sig'] == $sign && $session['expire'] > time()) {
				$member = array(
					'id' => intval($session['mid']),
					'secret' => $session['secret'],
					'sid' => $session['sid']
				);
			}
		}
		return $member;
	}
}
