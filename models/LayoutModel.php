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
            $id = $this->insert('detail_layouts', $data);
            if($data['type'] == 4) {
                foreach ($data['text'] as $text) {
                    $text['layout_detail_id'] = $id;
                    $this->insert('texts', $text);
                }
            }
        }
        echo $layout_id;
    }
    public function getLayoutById($Id)
    {
        $els = $this->db->prepare("select l.id as dlid, l.element_id as dlcheck, l.*, e.* from detail_layouts as l INNER JOIN elements as e ON l.element_id = e.id  where layout_id = " . $Id . " ORDER BY l.zindex" );
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
    }

    public function getTextByLayout($id)
    {
        $els =  $this->db->prepare("select * from texts where layout_detail_id = ".$id." ORDER BY id ASC" );
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll();
    }

    public function getLinkFontByName($name)
    {
        $els =  $this->db->prepare("select * from fonts where name LIKE '".$name."'");
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll()[0];
    }

    public function getLayoutDetailById($id)
    {
        $els =  $this->db->prepare("select * from detail_layouts where id = ".$id." ORDER BY id ASC" );
        $els->execute();
        $els->setFetchMode(PDO::FETCH_ASSOC);
        return $els->fetchAll()[0];
    }

}
