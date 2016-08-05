<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 8/5/2016
 * Time: 1:26 AM
 */
class LayoutModel extends BaseModel
{
    public function updateLayout($data){
        $this->update('layouts', $data);
    }
    public function insertLayout($data) {
        $data['name']=  'th';
        $data['layout_id'] = $this->insert('layouts', $data);
        $this->insert('detail_layouts', $data);
        var_dump($data);
    }
    public function getLayoutById($cateId)
    {
        $els = $this->db->prepare("select * from detail_layouts INNER JOIN elements ON layouts.element_id = elements.id where layout_id = " . $cateId);
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll();
    }
}