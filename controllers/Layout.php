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

        $datas = $_POST['layouts'];
        $this->model->insertLayout($datas);
    }
    public function getLayout($id =8)
    {
        $layout = $this->model->getLayoutById($id);
        $x = 784;
        $y = 295;
        $background = imagecreatetruecolor($x, $y);
        $whiteBackground = imagecolorallocate($background, 255, 255, 255);
        imagefill($background,0,0,$whiteBackground);
        $outputImage = $background;
        foreach ($layout as $el) {
            $link = ROOT . '/images/backgrounds/' . $el['link'];
            $first = imagecreatefromjpeg($link);
            $first = imagerotate($first, $el['rotate'], 0);
            imagecopymerge($outputImage, $first, $el['left'], $el['top'],0,0, $x, $y,100);
        }
        header('Content-Type: image/jpeg');
        imagejpeg($outputImage);
        imagedestroy($outputImage);
    }
}
