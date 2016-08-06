<?php
function LoadJpeg($imgname)
{
    /* Attempt to open */
    $im = @imagecreatefromjpeg($imgname);

    /* See if it failed */
    if(!$im)
    {
        /* Create a black image */
        $im  = imagecreatetruecolor(150, 30);
        $bgc = imagecolorallocate($im, 255, 255, 255);
        $tc  = imagecolorallocate($im, 0, 0, 0);

        imagefilledrectangle($im, 0, 0, 150, 30, $bgc);

        /* Output an error message */
        imagestring($im, 1, 5, 5, 'Error loading ' . $imgname, $tc);
    }

    return $im;
}

/**
 * @param $filepath
 * @return bool|resource
 * This little function allows you to create an image based on the popular image types without worrying about what it is:
 */

function imageCreateFromAny($filepath) {
    $type = getImageSize($filepath); // [] if you don't have exif you could use getImageSize()
    $allowedTypes = array(
        1,  // [] gif
        2,  // [] jpg
        3,  // [] png
        6   // [] bmp
    );
    if (!in_array($type, $allowedTypes)) {
        return false;
    }
    switch ($type) {
        case 1 :
            $im = imageCreateFromGif($filepath);
            break;
        case 2 :
            $im = imageCreateFromJpeg($filepath);
            break;
        case 3 :
            $im = imageCreateFromPng($filepath);
            break;
        case 6 :
            $im = imageCreateFromBmp($filepath);
            break;
    }
    return $im;
}

function imagecreatefromfile($path, $user_functions = false)
{
    $info = @getimagesize($path);
    var_dump($info);
    if(!$info)
    {
        return false;
    }

    $functions = array(
        IMAGETYPE_GIF => 'imagecreatefromgif',
        IMAGETYPE_JPEG => 'imagecreatefromjpeg',
        IMAGETYPE_PNG => 'imagecreatefrompng',
        IMAGETYPE_WBMP => 'imagecreatefromwbmp',
        IMAGETYPE_XBM => 'imagecreatefromwxbm',
    );

    if($user_functions)
    {
        $functions[IMAGETYPE_BMP] = 'imagecreatefrombmp';
    }

    if(!$functions[$info[2]])
    {
        return false;
    }

    if(!function_exists($functions[$info[2]]))
    {
        return false;
    }

    return $functions[$info[2]]($path);
}

/**
 * func create image to ajax for background
 */
function covertImageToBase64 ($path, $type = 'jpg') {
    ob_start();
    switch ($type) {
        case 'png':
            $im = imagecreatefrompng (ROOT . '/' . $path);
            imageAlphaBlending($im, true);
            imageSaveAlpha($im, true);
            break;
        case 'jpg':
        default:
            $im = imagecreatefromjpeg (ROOT . '/' . $path);
            break;
    }
    imagepng($im);
    imagedestroy($im);
    // Get Image content a variable
    $imageData=ob_get_contents();
    // Clean the output buffer
    ob_end_clean();
    $image = base64_encode($imageData);
    return $image;
}