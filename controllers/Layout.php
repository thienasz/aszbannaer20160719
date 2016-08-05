<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 8/5/2016
 * Time: 1:25 AM
 */
class Layout extends BaseController
{
    public function saveDataLayout() {

        $datas = $_POST['data'];
//        $data = json_decode($data);
        echo '<pre>';
        foreach ($datas as $data) {
            $this->model->insertLayout($data);
        }
    }
    public function getLayout()
    {
        $layout = $this->model->getLayoutById(1);
        echo '<pre>';
        $x = 400*3;
        $y = 111*3;
        $background = imagecreatetruecolor($x, $y);
        $outputImage = $background;
        unset($layout[1]);
        unset($layout[2]);
        foreach ($layout as $el) {
            $link = ROOT . '/images/backgrounds/' . $el['link'];
            $first = imagecreatefromjpeg($link);
            imagecopymerge($outputImage, $first, $el['left'], $el['top'],0,0, $x, $y,100);
        }
        imagejpeg($outputImage, ROOT . '/images/backgrounds/bg4.jpg');
//        header('Content-Type: image/jpeg');
//        imagejpeg($outputImage);

        imagedestroy($outputImage);
    }
}