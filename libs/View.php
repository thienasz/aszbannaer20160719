<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/1/2016
 * Time: 9:13 PM
 */
class View
{
    function __construct()
    {

    }

    public function render ($name, $add = true)
    {
        $add ? require_once 'views/includes/header.php' : '';
        require_once 'views/'. $name .'.php';
        $add ? require_once 'views/includes/footer.php' : '';
    }
}