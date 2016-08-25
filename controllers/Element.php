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
            if($element['type']=='svg'){
                $link= 'images/elements/svg/' . $element['link'];
                $element['image'] = file_get_contents($link);
            }else{
                $element['image'] = covertImageToBase64($this->getLinkElement($element), $element['type']);
            }
        }
        echo json_encode($elements);
    }
    public function getElementAjax($Id = null)
    {
        $id = ($_POST['id']) ? $_POST['id'] : $Id;
        $element = $this->model->getElementById($id);
        $link = $this->getLinkElement($element);
        $element['image'] = covertImageToBase64($link, $element['type']);
        echo json_encode($element);
    }

    private function getLinkElement($element) {
        switch ($element['category_id']) {
            case 3:
                $link = 'images/elements/' . $element['type'] . '/' . $element['link'];
                break;
            case 2:
            default :
                $link = 'images/backgrounds/' . $element['link'];
                break;
        }
        return $link;
    }
}
