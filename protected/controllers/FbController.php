<?php

Yii::import("application.components.Google");

class FbController extends Controller
{
	public function actionFetchPhotos() {
		$facebook = new Fb('AAAEVp2inkXMBAJ0SnRKdZCX1cmbZAXTpZBxTyJZCOLnInNOUO5hCZCzVobykhKBpbEHtPBWtnWYtODPZBgyRCYFt2by2McVnUmgHVRVYrW6AZDZD');
		$me = $facebook->getUser();
		if (!$me) {
			echo 'session expired';
			exit;
		}
		$albums = $facebook->fql('SELECT aid, name, description, size, type FROM album WHERE owner = ' . $me);
		print_r($albums);
		if (!$albums || !$albums['data']) {
			return;
		}
		foreach ($albums['data'] as $album) {
			if ($album['type'] != 'normal' && $album['type'] != 'mobile') {
				continue;
			}
			$alb = new Album();
			$alb->networkId = $album['aid'];
			$alb->userId = $me;
			$alb->name = $album['name'];
			$alb->description = $album['description'];
			$alb->photosCount = $album['size'];
			if (!$alb->save()) {
				echo 'Could not save!';
				print_r($alb->getErrors());
			}
			$photos = $facebook->fql('SELECT pid, caption, src_big, created FROM photo WHERE aid = ' . $alb->networkId);
			if (!$photos || !$photos['data']) {
				continue;
			}
			foreach ($photos['data'] as $photo) {
				$ph = new Photo();
				$ph->albumId = $alb->albumId;
				$ph->userId = $me;
				$ph->title = $photo['caption'];
				$ph->src = $photo['src_big'];
				$ph->dtCreated = date('Y-m-d H:i:s', $photo['created']);
				if (!$ph->save()) {
					echo 'Could not save!';
					print_r($ph->getErrors());
				}
			}
		}
	}


}