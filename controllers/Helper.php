<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/1/2016
 * Time: 8:37 PM
 */
class Helper extends BaseController
{
    function __construct()
    {
        parent::__construct();

    }

    public function index()
    {

        require 'models/HelperModel.php';

        $model = new HelperModel();
        $this->view->bla = $model->bla();

        $this->view->render('helpers/index');
    }

    public function noThing($abc = null, $xyz = null)
    {
        var_dump($abc, $xyz);
        echo 'func nothing';
    }
}