<?php

$arResult = [];
$check = true;

$name = (array_key_exists("name", $_POST)) ? trim(htmlspecialchars($_POST["name"])) : "";
$email = (array_key_exists("email", $_POST)) ? trim(htmlspecialchars($_POST["email"])) : "";
$phone = (array_key_exists("phone", $_POST)) ? trim(htmlspecialchars($_POST["phone"])) : "";
$comment = (array_key_exists("comment", $_POST)) ? trim(htmlspecialchars($_POST["comment"])) : "";

if (empty($name)) {
    $arResult = [
        'status' => false,
        'message' => 'Поле имя не заполнено'
    ];
    $check = false;
}

if (empty($email)) {
    $arResult = [
        'status' => false,
        'message' => 'Поле email не заполнено'
    ];
    $check = false;
}

if (empty($phone)) {
    $arResult = [
        'status' => false,
        'message' => 'Поле телефон не заполнено'
    ];
    $check = false;
}


if ($check) {
    $url = 'https://' . $_SERVER['HTTP_HOST'];

    $to = "Info@fullab.ru";
    $to2 = "verobragina@ya.ru";

    $subject = "Форма свяжитесь с нами с сайта " . $url;

    $message = '<p>Данные из формы:</p></br>';
    $message .= '<p>Поле имя: <b>' . $name . '</b></p></br>';
    $message .= '<p>Поле email: <b>' . $email . '</b></p></br>';
    $message .= '<p>Поле телефон: <b>' . $phone . '</b></p></br>';
    $message .= '<p>Поле комментарий: <b>' . $comment . '</b></p></br>';


    $headers = "Content-type: text/html; text/html;charset=utf-8  \r\n";

    if (mail($to, $subject, $message, $headers)) {
        $arResult = [
            'status' => true,
            'message' => 'Форма отправлена'
        ];
    } else {
        $arResult = [
            'status' => true,
            'message' => 'Форма не отправлена'
        ];
    }
    
    if (mail($to2, $subject, $message, $headers)) {
        $arResult = [
            'status' => true,
            'message' => 'Форма отправлена'
        ];
    } else {
        $arResult = [
            'status' => true,
            'message' => 'Форма не отправлена'
        ];
    }
}

echo json_encode($arResult);
die;
