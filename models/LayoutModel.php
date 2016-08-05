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
    public function insertLayout($datas) {
        $data['name']=  'th';
        $layout_id = $this->insert('layouts', $data);
        foreach ($datas as $data) {
            $data['layout_id'] = $layout_id;
            $this->insert('detail_layouts', $data);
        }
    }
    public function getLayoutById($cateId)
    {
        $els = $this->db->prepare("select * from detail_layouts as l INNER JOIN elements as e ON l.element_id = e.id where layout_id = " . $cateId);
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll();
    }
}