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
            $this->model->insertLayout($datas);
    }
    public function getLayout($id =8)
    {
        $layout = $this->model->getLayoutById($id);
        //need change
        $x = 784;
        $y = 295;
        $background = imagecreatetruecolor($x, $y);
        $whiteBackground = imagecolorallocate($background, 255, 255, 255);
        imagefill($background,0,0,$whiteBackground);
        $outputImage = $background;
//        unset($layout[0]);
//        unset($layout[2]);
        foreach ($layout as $el) {
            $link = ROOT . '/images/backgrounds/' . $el['link'];
            $first = imagecreatefromjpeg($link);
            $first = imagescale($first, $x, $y);
//            imagecopymerge($outputImage, $first,0, 0,0,0, $x, $y,100);
            imagecopymerge($outputImage, $first, $el['left'], $el['top'],0,0, $x, $y,100);
//            imagecopymerge($outputImage, $first, $el['left'], $el['top'],0,0, $el['width'], $el['height'],100);
        }
        imagejpeg($outputImage, ROOT . '/images/backgrounds/bg4.jpg');
        header('Content-Type: image/jpeg');
        imagejpeg($outputImage);

        imagedestroy($outputImage);
    }
}