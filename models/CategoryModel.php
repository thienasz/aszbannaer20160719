<?php
class CategoryModel extends BaseModel
{
    function __construct()
    {
        parent::__construct();
    }
    public function getAllCategory()
    {
        $cate = $this->db->prepare("SELECT * FROM categories");
        $cate->execute();
        $cate->setFetchMode(PDO::FETCH_ASSOC);
        $result = $cate->fetchAll();
        return $result;
    }
}