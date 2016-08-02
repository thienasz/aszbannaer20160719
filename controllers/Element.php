<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 7/21/2016
 * Time: 9:37 PM
 */
class Element extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }
    public function getAllElementsAjax($cateId = null)
    {
        $cateId = ($_POST['cateId']) ? $_POST['cateId'] : $cateId;
        $elements = $this->model->getAllElementByCategory($cateId);
        foreach ($elements as &$element){
            $element['image'] = covertImageToBase64('images/backgrounds/' . $element['link']);
        }
        echo json_encode($elements);
    }
    public function getElementAjax($Id = null)
    {
        $id = ($_POST['id']) ? $_POST['id'] : $Id;
        $element = $this->model->getElementById($id);
        $element['image'] = covertImageToBase64('images/backgrounds/' . $element['link']);
        echo json_encode($element);
    }
}