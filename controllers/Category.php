<?php
class Category extends BaseController
{
    function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        $this->view->render('banner/index', false);
    }
    public function getCategory(){
        $category = $_POST['category'];
    }
}