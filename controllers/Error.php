<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/1/2016
 * Time: 9:03 PM
 */
class Error extends BaseController
{
    function __construct()
    {
        parent::__construct();
        
        $this->view->msg = 'msg';

        $this->view->render('errors/404');
    }
}