<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/1/2016
 * Time: 8:57 PM
 */
class Bootstrap
{
    function __construct()
    {
        $args = isset($_GET['controller']) ? $_GET['controller'] : null;
        $args = rtrim($args, "/");
        $args = explode('/', $args);

        $file = 'controllers/'.$args[0].'.php';

        if (empty($args[0])){
            require 'controllers/Index.php';
            $controller = new Index();
            $controller->index();
            return false;
        }

        if (file_exists($file)) {
            require $file;
        } else {
            require 'controllers/Error.php';
            $error = new Error();
            return false;
        }
        $controller = new $args[0];
        $controller->loadModel($args[0]);
        if (isset($args[1])) {
            if(method_exists($controller, $args[1])){
                $params = array_slice($args, 2);
                call_user_func_array(array($controller, $args[1]), $params);
            }
            else {
                require 'controllers/Error.php';
                $error = new Error();
                return false;
            }
        } else {
            $controller->index();
        }
    }
}