<?php
class Api extends BaseController
{
    function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        $class = $_REQUEST['class'];
        $method = $_REQUEST['method'];
        if(!$class || !$method){
            return 0;
        }
        $obj = new $class();
        $obj->$method();
    }
}