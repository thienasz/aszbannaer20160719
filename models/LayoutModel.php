<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 8/5/2016
 * Time: 1:26 AM
 */
class LayoutModel extends BaseModel
{
    public function insertLayout($datas) {
        $data['name']=  'fix'; //@to do
        $layout_id = $this->insert('layouts', $data);
        foreach ($datas as $data) {
            $data['layout_id'] = $layout_id;
            $this->insert('detail_layouts', $data);
        }
        echo $layout_id;
    }
    public function getLayoutById($Id)
    {
        $els = $this->db->prepare("select * from detail_layouts as l INNER JOIN elements as e ON l.element_id = e.id  where layout_id = " . $Id . " ORDER BY l.zindex" );
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll();
    }
    public function getLayoutLatest()
    {
        $els = $this->db->prepare("select * from layouts ORDER BY id DESC LIMIT 0,5 " );
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll();
    }}
