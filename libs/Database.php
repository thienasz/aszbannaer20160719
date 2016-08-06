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
        $dsn = 'mysql:dbname='.DBNAME.';host='.DBHOST;
        $user = 'root';
        $password = '12345678';
        parent::__construct($dsn, $user, $password);

    }
}