<?php

/**
 * This is the model class for table "Photo".
 *
 * The followings are the available columns in table 'Photo':
 * @property string $photoId
 * @property string $userId
 * @property string $albumId
 * @property string $title
 * @property string $src
 * @property string $path
 * @property string $dtCaptured
 * @property string $dtCreated
 * @property double $lat
 * @property double $lng
 * @property integer $status
 */
class Photo extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Photo the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'Photo';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('userId, src, dtCreated', 'required'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'user' => array(self::BELONGS_TO, 'User', 'userId'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'photoId' => 'Photo',
			'userId' => 'User',
			'title' => 'Title',
			'src' => 'Src',
			'path' => 'Path',
			'dtCaptured' => 'Dt Captured',
			'dtCreated' => 'Dt Created',
			'lat' => 'Lat',
			'lng' => 'Lng',
			'status' => 'Status',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('photoId',$this->photoId,true);

		$criteria->compare('userId',$this->userId,true);

		$criteria->compare('title',$this->title,true);

		$criteria->compare('src',$this->src,true);

		$criteria->compare('path',$this->path,true);

		$criteria->compare('dtCaptured',$this->dtCaptured,true);

		$criteria->compare('dtCreated',$this->dtCreated,true);

		$criteria->compare('lat',$this->lat);

		$criteria->compare('lng',$this->lng);

		$criteria->compare('status',$this->status);

		return new CActiveDataProvider('Photo', array(
			'criteria'=>$criteria,
		));
	}
}