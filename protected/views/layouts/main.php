<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="en" />
        <title>
            <?php echo CHtml::encode($this->pageTitle); ?>
        </title>

        <script type="text/javascript">
        <?php 
            if(!Yii::app()->user->isGuest) {
                Yii::app()->user->writeUserInfo();
            }

            echo ';translations = ' . CJSON::encode($this->translation);
        ?>
        </script>
        <?php require_once Yii::app()->basePath . '/config/envs/js/env.php'; ?>
    </head>
    <body></body>
</html>
