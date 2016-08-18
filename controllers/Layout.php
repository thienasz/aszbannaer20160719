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
//            $first = $this->rotate_transparent_img( $image_p, 180-$el['rotate'] );
            $first = imagerotate($image_p,180-$el['rotate'], 0);
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
    function testRotate() {
        $x = 808;
        $y = 377;
        $background = imagecreatetruecolor($x, $y);
        $red = imagecolorallocate($background, 255, 0, 0);
        imagefill($background,0,0,$red);
//        imagepng($background, $background);
        $link = "C:/AppServ/www/banner/images/backgrounds/bg5.jpg";
        $source = imagecreatefromjpeg ($link);
        imagealphablending($source, false);
        imagesavealpha($source, true);

        $rotation = imagerotate($source, 10, imageColorAllocateAlpha($source, 0, 0, 0, 127));

        $this->imagecopymerge_alpha($background, $rotation, 0,0,0,0, $x, $y, 100); // merge with no background

        header('Content-type: image/png');
        imagepng($background, null);
        imagedestroy($source);
        imagedestroy($rotation);
    }

    function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct){
        // creating a cut resource
        $cut = imagecreatetruecolor($src_w, $src_h);

        // copying relevant section from background to the cut resource
        imagecopy($cut, $dst_im, 0, 0, $dst_x, $dst_y, $src_w, $src_h);

        // copying relevant section from watermark to the cut resource
        imagecopy($cut, $src_im, 0, 0, $src_x, $src_y, $src_w, $src_h);

        // insert cut resource to destination image
        imagecopymerge($dst_im, $cut, $dst_x, $dst_y, 0, 0, $src_w, $src_h, $pct);
    }
}
