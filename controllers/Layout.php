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
            if($cate_id == 4 && $e['type'] == 'text') {
                $texts = $this->model->getTextByLayout($e['dlid']);
                $e['text'] = $texts;

            } else {
                $link = $this->getLink($e);
                $e['image'] = covertImageToBase64($link, $e['type']);
            }
        }

        echo json_encode($layout);
    }
    public function saveDataLayout() {
        $datas = $_POST['layouts'];
        $layout_id = $this->model->insertLayout($datas);
    }
    public function viewLayout($id = 89){
        $outputImage = $this->getLayout($id);
        header('Content-Type: image/png');
        imagejpeg($outputImage);
        imagedestroy($outputImage);
    }
    public function getLayout($id, $times = 1)
    {
        $layout = $this->model->getLayoutById($id);
        $x = 580*$times;
        $y = 218*$times;
        $background = imagecreatetruecolor($x, $y);
        $whiteBackground = imagecolorallocate($background, 255, 255, 255);
        imagefill($background,0,0,$whiteBackground);
        $outputImage = $background;
        foreach ($layout as $el) {
            $type = $el['type'];
            $link = $this->getLink($el);
            if($el['link'])
            list($width, $height) = getimagesize($link);

            if ($type == 'png') {
                $image = imagecreatefrompng($link);
            } elseif ($type == 'jpg') {
                $image = imagecreatefromjpeg($link);
            }
            if ($type == 'text') {
                $image = $this->getTextPng($el['dlid'], $times);
                $width = imagesx($image);
                $el['width_real'] = imagesx($image)/$times;
                $height = imagesy($image);
                $el['height_real'] = imagesy($image)/$times;
            } else {
            }

            $new_width = $el['width_real'];
            $new_height = $el['height_real'];
            $image_p = imagecreatetruecolor($new_width*$times, $new_height*$times);
            imagealphablending($image_p, false);
            imagesavealpha($image_p, true);
            if ($type == 'png' || $type == 'text') {
                $rotate =  360-$el['rotate'];
            }
            if ($type == 'jpg') {
                $rotate =  180-$el['rotate'];
            }
            imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width*$times, $new_height*$times, $width, $height);

            $rotation = imagerotate($image_p, $rotate, imageColorAllocateAlpha($image_p, 0, 0, 0, 127));

            $this->imagecopymerge_alpha($outputImage, $rotation, $el['left']*$times, $el['top']*$times, 0, 0, abs($el['width']*$times), abs($el['height']*$times), 100); // merge with no background

        }
        return $outputImage;
    }

    function testRotate() {
        $x = 1000;
        $y = 1000;
        $background = imagecreatetruecolor($x, $y);
        $red = imagecolorallocate($background, 255, 0, 0);
        imagefill($background,0,0,$red);
//        imagepng($background, $background);
        $link ='C:\AppServ\www\banner\images\elements\png\boy.png';
        $source = imagecreatefrompng ($link);
        imagealphablending($source, false);
        imagesavealpha($source, true);

        $rotation = imagerotate($source, 10, imageColorAllocateAlpha($source, 0, 0, 0, 127));

        $this->imagecopymerge_alpha($background, $rotation, 0,0,0,0, $x, $y, 100); // merge with no background

        header('Content-type: image/png');
        imagepng($background);
        imagedestroy($source);
        imagedestroy($rotation);
    }

    function getTextPng($id, $times = 1) {
        $texts = $this->model->getTextByLayout($id);
        $temp_layout = $this->model->getLayoutDetailById($id);
        $im = imagecreatetruecolor(($temp_layout['width_real']+20)*$times, ($temp_layout['height_real']+20)*$times);

        imagealphablending($im, false);
        imagesavealpha($im, true);

        imageColorAllocateAlpha($im, 0, 0, 0, 127);

        $col=imageColorAllocateAlpha($im, 0, 0, 0, 127);
        imagefilledrectangle($im,0,0,($temp_layout['width_real']+ 20)*$times, ($temp_layout['height_real']+ 20)*$times,$col);

        $left = $texts[0]['left']+10;
        $top = 50;

        $maxFont = (int)$texts[0]['font_size'];

        foreach ($texts as $text) {
            if((int)$texts[0]['font_size'] > $maxFont) {
                $maxFont = (int)$texts[0]['font_size'];
            }
            $font = $this->getFontPath($text);
            $s_color = $text['color'];
            $s_color = substr($s_color, 4, strlen($s_color)-5);
            $s_color = explode(',', $s_color);
            $color = imagecolorallocate($im, $s_color[0], $s_color[1], $s_color[2]);
            $bbox = '';
            $font_size = (int)$text['font_size']*0.75;
            $bbox = imagettfbbox($font_size, 0, $font, $text['content']);

            if(($left+$bbox[4])*$times > ($temp_layout['width_real'])*$times) {
                $left = $texts[0]['left']+10;
                $top = $maxFont + 50;

            }
            imagettftext($im, $font_size*$times, 0, $left*$times, $top*$times, $color, $font, $text['content']);
            $left += $bbox[4];
        }

        return $im;
    }
    function testTextPng($id){
        ob_start();
        $id = ($_POST['id']) ? $_POST['id'] : $id;
        $im = $this->getTextPng($id);
        imagepng($im);
        imagedestroy($im);
        $imageData=ob_get_contents();
        // Clean the output buffer
        ob_end_clean();
        $image = base64_encode($imageData);
        echo '<pre>';

        echo '<img src="data:image/png;base64,' . $image . '">';
    }

    function getFontPath($text){
        $weight = '';
        $font_path = $this->model->getLinkFontByName(str_replace('"', '', $text['font_family']));
        if($text['font_weight'] >= 700 || $text['font_weight'] == 'bold'){
            $weight .= 'b';
            if ($text['font_style'] == 'normal') {
                $weight .= 'd';
            }
        }
        if($text['font_style'] == 'italic') {
            $weight .= 'i';
        }
            $font = ROOT . '/assets/fonts/' . $font_path['file_name'] . $weight . '.ttf';
        return $font;

    }
    function imagecopymerge_alpha(&$dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct){
        // reset width height @todo check why width and height be changed
        $src_w = imagesx($src_im);
        $src_h = imagesy($src_im);

        // creating a cut resource
        $cut = imagecreatetruecolor($src_w, $src_h);

        // copying relevant section from background to the cut resource
        imagecopy($cut, $dst_im, 0, 0, $dst_x, $dst_y, $src_w, $src_h);

        // copying relevant section from watermark to the cut resource
        imagecopy($cut, $src_im, 0, 0, $src_x, $src_y, $src_w, $src_h);

        // insert cut resource to destination image
        imagecopymerge($dst_im, $cut, $dst_x, $dst_y, 0, 0, $src_w , $src_h , $pct);
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
