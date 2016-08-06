<?php
class CategoryModel extends BaseModel
{
    private $table = 'categories';
    public function getAllCategory()
    {
        return $this->getAllTable($this->table);
    }
}