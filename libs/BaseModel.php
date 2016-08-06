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

    public function insert($tablename, $a) {
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
    private function convertData($tablename, $data) {
        foreach($data as $f=>$v){
            if($this->validateField($tablename, $f)){
                $fields[]=$f;
                $values[]=$v;
            }
        }
        return array($fields, $values);
    }
    private function validateField($tablename, $field) {
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
    public function getTableById($tablename, $id) {
        $els = $this->db->prepare("select * from $tablename where id = " . $id);
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll()[0];
    }
    public function getAllTable($tablename) {
        $cate = $this->db->prepare("SELECT * FROM $tablename");
        $cate->execute();
        $cate->setFetchMode(PDO::FETCH_ASSOC);
        $result = $cate->fetchAll();
        return $result;
    }
}
