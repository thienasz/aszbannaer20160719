<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/3/2016
 * Time: 8:35 PM
 */
class Database extends PDO
{
    public function __construct()
    {
        parent::__construct('mysql:host=localhost;dbname=mvc', 'root', '12345678');
        
    }
}