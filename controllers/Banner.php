<?php
class Banner extends BaseController
{
    public function index()
    {
        require_once ('models/CategoryModel.php');
        $category = new CategoryModel();
        $this->view->cotegories = $category->getAllCategory();
        $this->view->render('banner/index');
    }
}