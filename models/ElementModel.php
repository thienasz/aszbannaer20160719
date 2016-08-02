<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 7/21/2016
 * Time: 9:43 PM
 */
class ElementModel extends  BaseModel
{
    public function getAllElementByCategory($cateId)
    {
        $els = $this->db->prepare("select * from elements where category_id = " . $cateId);
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll();
    }
    public function getElementById($id)
    {
        $els = $this->db->prepare("select * from elements where id = " . $id);
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll()[0];
    }
}