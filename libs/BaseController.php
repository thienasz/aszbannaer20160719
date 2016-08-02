<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/1/2016
 * Time: 9:09 PM
 */
class BaseController
{
    function __construct()
    {
        $this->view = new View();
    }

    public function loadModel($name)
    {
        $file= 'models/'.$name.'Model.php';
        if(file_exists($file)){
            require_once $file;
            $className = $name.'Model';
            $this->model = new $className();
        }
    }
}