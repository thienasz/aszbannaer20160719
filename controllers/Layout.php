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
    public function getLayout($id =89)
    {
        $layout = $this->model->getLayoutById($id);
        $x = 580;
        $y = 218;
        $background = imagecreatetruecolor($x, $y);
        $whiteBackground = imagecolorallocate($background, 0, 255, 255);
        imagefill($background,0,0,$whiteBackground);
        $outputImage = $background;
        foreach ($layout as $el) {
            $link = ROOT . '/images/backgrounds/' . $el['link'];
            $first = imagecreatefromjpeg($link);
            $first = imagerotate($first,180-$el['rotate'], 0);
            imagecopymerge($outputImage, $first, $el['left'], $el['top'],0,0, $el['width'], $el['height'],100);
        }
        header('Content-Type: image/jpeg');
        imagejpeg($outputImage);
        imagedestroy($outputImage);
    }
}
