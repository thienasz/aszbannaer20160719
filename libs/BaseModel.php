<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/1/2016
 * Time: 9:34 PM
 */
class BaseModel
{
    function __construct()
    {
        try {
            $this->db = new Database();
            // set the PDO error mode to exception
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $e)
        {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    public function update($tablename, $data){
        $els = $this->db->prepare("SHOW COLUMNS FROM layouts");
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        $res = $els->fetchAll();
        $field = array();
        foreach ($res as $value) {
            $field[] = $value['field'];
        }
        foreach ($data as $values){
            if(!$values['id']) continue;
            $sql_set = '';
            foreach ( $values as $key => $value){
                if(!in_array($key, $field)) {
                    unset($data[$key]);
                } else {
                    $sql_set .= "$key = $value".",";
                }
            }
            $sql = 'UPDATE ' . $tablename . ' SET ' . $sql_set . ' WHERE id = ' . $values['id'];
            $els = $this->db->prepare($sql);
            $els->execute();
        }
    }
    public function insertArrays($tablename, $datas){
        foreach ($datas as $value){
            $this->insert($tablename, $value);
        }
    }
    public function insert($tablename, $a) {
        echo 11;
        list($fields, $values) = $this->convertData($tablename, $a);
        $fieldlist=implode('`,`',$fields);
        $qs=str_repeat("?,",count($fields)-1);
        $sql="insert into `$tablename`(`$fieldlist`) values($qs?)";
        $q= $this->db->prepare($sql);
        if($q->execute($values)) {
            return $this->db->lastInsertId();
        }
        return 0;
    }
    protected function convertData($tablename, $data) {
        foreach($data as $f=>$v){
            if($this->validateField($tablename, $f)){
                $fields[]=$f;
                $values[]=$v;
            }
        }
        return array($fields, $values);
    }
    protected function validateField($tablename, $field) {
        $els = $this->db->prepare("SHOW COLUMNS FROM $tablename");
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        $res = $els->fetchAll();
        $fieldArray = array();
        foreach ($res as $value) {
            $fieldArray[] = $value['Field'];
        }
        return in_array($field, $fieldArray) ? true :false ;
    }
}
