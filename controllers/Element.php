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

    public function getElementTestAjax($Id = null)
    {
        $id = ($_POST['id']) ? $_POST['id'] : $Id;
//        ob_start();
        $numberOfImages = 3;
        $x = 400*3;
        $y = 111*3;
        $background = imagecreatetruecolor($x, $y);


        $firstUrl = ROOT . '/images/backgrounds/bg1.jpg';

        $secondUrl = ROOT . '/images/backgrounds/bg2.jpg';

        $thirdUrl = ROOT . '/images/backgrounds/bg3.jpg';

        $outputImage = $background;

        $first = imagecreatefromjpeg($firstUrl);
        $second = imagecreatefromjpeg($secondUrl);
        $third = imagecreatefromjpeg($thirdUrl);
        $first = imagerotate($first, 45, 0);



        imagecopymerge($outputImage,$first,100,-11,0,0, $x, $y,100);
        imagecopymerge($outputImage,$second,-100, 11,0,0, $x, $y,100);
        imagecopymerge($outputImage,$third,0,$y*2,0,0, $x, $y,100);

        imagejpeg($outputImage, ROOT . '/images/backgrounds/bg4.jpg');

        header('Content-Type: image/jpeg');
        imagepng($outputImage);

        imagedestroy($outputImage);
        // Get Image content a variable
//        $imageData=ob_get_contents();
//        // Clean the output buffer
//        ob_end_clean();
//        $image = base64_encode($imageData);
//        $element['image'] = $image;
//        echo json_encode($element);
    }
}