<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/1/2016
 * Time: 9:34 PM
 */
class BaseModel
{
    function __construct()
    {
        $this->db = new Database();
    }
}