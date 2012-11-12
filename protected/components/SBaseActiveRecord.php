<?php
	class SBaseActiveRecord extends CActiveRecord {
		protected $mode;
		protected $modes=array();


		public function setMode($mode) {
			$this->mode = $this->modes[$mode];
			return $this;
		}

		public function plain() {
			if(!$this->mode) {
				return $this->attributes;
			}

			$result = array();
			foreach ($this->mode['fields'] as $fieldName) {
				$method = 'get' . ucfirst($fieldName);
				
				if(method_exists($this, $method)) {
					$result[$fieldName] = $this->$method();
				} else {
					$result[$fieldName] = $this->{$fieldName};
				}
			}

			return $result;
		}
	}
	
?>