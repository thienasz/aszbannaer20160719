<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/3/2016
 * Time: 10:09 PM
 */
class Dashboard
{
    public function __construct()
    {

    }

    public function index ()
    {
        $this->view->render('dashboard/index');
    }
}