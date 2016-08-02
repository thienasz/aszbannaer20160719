<html>
<head>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<header>
    <div class="top-header">abc</div>
</header>
<section class="col-md-4 col-sm-5 left-section">
    <ul class="menu menu-fix menu-left">
        <?php foreach ($this->cotegories as $cate) : ?>
            <li data-value="<?= $cate['id'] ?>">
                <a href="#"><?= $cate['name'] ?></a>
            </li>
        <?php endforeach; ?>
    </ul>
    <div class="content content-show left-wrapper" id="content-show"></div>
</section>
<section class="col-md-8 col-sm-7 right-section">
    <div class="working-wrapper text-center">
        <div class="working-box" id="working-box">
            <div class="menu menu-fix menu-option small-menu">
                <ul class="">
                    <li class="option" data-option="color"><a href="#">color</a></li>
                    <li class="option" data-option="opacity"><a href="#">opacity</a></li>
                    <li class="option" data-option="up"><a href="#">up</a></li>
                    <li class="option" data-option="down"><a href="#">down</a></li>
                    <li class="option" data-option="delete"><a href="#">delete</a></li>
                </ul>
            </div>
            <div class="working-box-wrapper  col-sm-8 col-sm-offset-2 no-padding">
                <div class="inner-box">
                    <div class="working-inner-box"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="assets/js/libs/jquery.min.js"></script>
<script src="assets/js/libs/jquery-ui.js"></script>
<script src="assets/js/libs/drag.js"></script>
<script src="assets/js/libs/resize.js"></script>
<script src="assets/js/libs/jquery.ui.rotatable.min.js"></script>
<script src="assets/js/script.js"></script>
<script src="assets/js/interactcus.js"></script>
<script src="assets/js/libs/bootstrap.min.js"></script>
</body>
</html>