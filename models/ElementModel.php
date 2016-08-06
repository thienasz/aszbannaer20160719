<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 7/21/2016
 * Time: 9:43 PM
 */
class ElementModel extends  BaseModel
{
    private $table = 'elements';
    public function getAllElementByCategory($Id)
    {
        $els = $this->db->prepare("select * from elements where category_id = " . $Id);
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll();
    }
    public function getElementById($id)
    {
        return $this->getTableById($this->table, $id);
    }
}