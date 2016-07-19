<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/3/2016
 * Time: 8:44 PM
 */
class Login extends BaseController
{
    public function __construct()
    {
        parent::__construct();

    }

    public function index(){

        $this->view->render('login/login');
    }

    public function run()
    {
        Session::int();
        echo md5('123456');
        if ($this->model->run() === true){
            Session::set('login', true);
            $this->view->msg = 'successful';
            $this->view->render('dashboard/index');
        } else {
            Session::destroy();
            $this->view->msg = 'user not found';
            $this->view->render('login/login');
        };
    }
}