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
        $layout_id = $this->model->insertLayout($datas);
    }
    public function getLayout($id =89)
    {
        $layout = $this->model->getLayoutById($id);
        $x = 580;
        $y = 218;
        $background = imagecreatetruecolor($x, $y);
        $whiteBackground = imagecolorallocate($background, 255, 255, 255);
        imagefill($background,0,0,$whiteBackground);
        $outputImage = $background;
        foreach ($layout as $el) {
            $link = ROOT . '/images/backgrounds/' . $el['link'];
            list($width, $height) = getimagesize($link);
            $new_width = 580;
            $new_height = 218;
            $type = $el['type'];
            $image_p = imagecreatetruecolor($new_width, $new_height);
            if($type == 'png') {
                $image = imagecreatefrompng($link);
            }
            if($type == 'jpg') {
                $image = imagecreatefromjpeg ($link);
            }
            imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
            $first = $this->rotate_transparent_img( $image_p, 180-$el['rotate'] );
            //$first = imagerotate($image_p,180-$el['rotate'], 0);
            imagecopymerge($outputImage, $first, $el['left'], $el['top'],0,0, $el['width'], $el['height'],100);

        }
        header('Content-Type: image/png');
        imagejpeg($outputImage);
        imagedestroy($outputImage);
    }
    function rotate_transparent_img( $img_resource, $angle ){

        $pngTransparency = imagecolorallocatealpha( $img_resource , 0, 0, 0, 127 );
        imagefill( $img_resource , 0, 0, $pngTransparency );

        $result = imagerotate( $img_resource, $angle, $pngTransparency );
        imagealphablending( $result, true );
        imagesavealpha( $result, true );

        return $result;
    }

}
