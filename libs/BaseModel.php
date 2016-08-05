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
    public function insert($tablename, $data){
        $els = $this->db->prepare("SHOW COLUMNS FROM layouts");
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        $res = $els->fetchAll();
        $field = array();
        foreach ($res as $value) {
            $field[] = $value['field'];
        }
        foreach ($data as $values){
            if($values['id']) continue;
            $sql_set = '';
            foreach ( $values as $key => $value){
                if(!in_array($key, $field)) {
                    unset($data[$key]);
                } else {
                    $sql_set .= "$key = $value".",";
                }
            }
            $sql = 'INSERT ' . $tablename . ' SET ' . $sql_set . ' WHERE id = ' . $values['id'];
            $els = $this->db->prepare($sql);
            $els->execute();
        }
    }
}