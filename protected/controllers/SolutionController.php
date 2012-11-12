<?php

class SolutionController extends Controller
{
	public function actions() {
		return array(
			'index' => array(
				'class' => 'application.components.actions.ListAction',
				'model' => 'Solution',
				'id' => 'facultyId'
			)
		);
	}
	
	public function actionCreate() {
		var_dump($_POST);exit;
        if(!isset($_POST['Solution'])) {
        	throw new CHttpException(404);
        }

        $files = CUploadedFile::getInstancesByName('files');
        $documents = array();

        if(isset($files) && count($files) > 0) {
        	foreach ($files as $index => $file) {
        		$hashedFilename = md5(microtime() . $file->name);
        		if($file->saveAs(Document::getRootPath() . "/" . $hashedFilename)) {
        			$document = new Document();
        			$document->file = $file;
                    $document->name = $file->name;
                    $document->originPath = $hashedFilename;
                    $document->save();
                    $documents[] = $document;
        		}
        	}
        }

        $archive = new Archive();
        $archive->addDocuments($documents);
        $result = $archive->save();

        $solution = new Solution;
    	$solution->attributes = $_POST['Solution'];
        $solution->archiveId = $archive->archiveId;
        $solution->save();

		$this->renderJson(array(
			'success' => true,
			'items' => $solution
		));
	}
	
	public function actionContent($solutionId) {
		$solution = Solution::model()->findByPk($solutionId);
		
		if(is_null($solution)) {
			throw new CHttpException(404);
		}
		
		$filePath = $solution->archive->path;
		
		header('Content-Type: application/zip');
		header('Content-Disposition: attachment; filename="' . $solution->title . '.zip"');
		header('Content-Length: '. filesize($filePath) );
		readfile($filePath);
		Yii::app()->end();
	}
}