<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 8/5/2016
 * Time: 1:25 AM
 */
class Layout extends BaseController
{

    public function getAllLayoutsAjax()
    {
        $layouts = $this->model->getLayoutLatest();
        foreach ($layouts as &$layout){
            ob_start();
            $id = (int)$layout['id'];
            $im = $this->viewLayout($id);
            imagepng($im);
            imagedestroy($im);
            // Get Image content a variable
            $imageData=ob_get_contents();
            // Clean the output buffer
            ob_end_clean();
            $layout['image'] = base64_encode($imageData);
        }
        echo json_encode($layouts);
    }
    public function getLayoutAjax($Id = null)
    {
        $id = ($_POST['id']) ? $_POST['id'] : $Id;
        $layout = $this->model->getLayoutById($id);
        foreach ($layout as &$e){
            $cate_id = (int)$e['category_id'] ;
            $link = $this->getLink($e);
            $e['image'] = covertImageToBase64($link, $e['type']);
        }

        echo json_encode($layout);
    }
    public function saveDataLayout() {
        $datas = $_POST['layouts'];
        $layout_id = $this->model->insertLayout($datas);
        echo $layout_id;
    }
    public function viewLayout($id = 89){
        $outputImage = $this->getLayout($id);
        header('Content-Type: image/png');
        imagejpeg($outputImage);
        imagedestroy($outputImage);
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


            $type = $el['type'];

            if ($type == 'png') {
                $new_width = 100;
                $new_height = 100;
                $link = ROOT . '/images/elements/png/' . $el['link'];
                $image = imagecreatefrompng($link);
            }
            if ($type == 'jpg') {
                $new_width = 580;
                $new_height = 218;
                $link = ROOT . '/images/backgrounds/' . $el['link'];
                $image = imagecreatefromjpeg($link);
            }
            $image_p = imagecreatetruecolor($new_width, $new_height);
            list($width, $height) = getimagesize($link);
            imagealphablending($image_p, false);
            imagesavealpha($image_p, true);
            if ($type == 'png') {
                $rotate =  $el['rotate'];
            }
            if ($type == 'jpg') {
                $rotate =  180-$el['rotate'];
            }
            imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

            $rotation = imagerotate($image_p, $rotate, imageColorAllocateAlpha($image_p, 0, 0, 0, 127));

            $this->imagecopymerge_alpha($outputImage, $rotation, $el['left'], $el['top'], 0, 0, $el['width'], $el['height'], 100); // merge with no background

        }
        return $outputImage;
    }

    function testRotate() {
        $x = 808;
        $y = 377;
        $background = imagecreatetruecolor($x, $y);
        $red = imagecolorallocate($background, 255, 0, 0);
        imagefill($background,0,0,$red);
//        imagepng($background, $background);
        $link = "C:/xampp/htdocs/aszbannaer20160719/images/backgrounds/bg5.jpg";
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
    private function getLink($element) {
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
