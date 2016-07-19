<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/3/2016
 * Time: 8:44 PM
 */
class LoginModel extends BaseModel
{
    public function __construct()
    {
        parent::__construct();
    }

    public function run()
    {
        $sql = $this->db->prepare("SELECT id FROM users WHERE username = :username AND password = MD5(:password)");
        $sql->execute(Array(
           ':username'  => $_POST['username'],
            ':password' => $_POST['password']
        ));
        $count = $sql->rowCount();

        if ($count > 0)
            return true;
        return false;
    }
}