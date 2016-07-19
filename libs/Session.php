<?php

/**
 * Created by PhpStorm.
 * User: thienth3
 * Date: 6/3/2016
 * Time: 10:00 PM
 */
class Session
{
    public static function int(){
        @session_start();
    }

    public static function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }

    public static function get($key)
    {
        return $_SESSION[$key];
    }

    public static function destroy()
    {
        session_destroy();
    }
}