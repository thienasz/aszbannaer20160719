
<section class="col-md-4 col-sm-5 left-section z-show">
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
            <div class="menu menu-fix menu-option small-menu z-show">
                <ul class="">
                    <li class="option" data-option="text"><a href="#">text</a></li>
                    <li class="option" data-option="color"><a href="#">color</a></li>
                    <li class="option" data-option="opacity"><a href="#">opacity</a></li>
                    <li class="option" data-option="up"><a href="#">up</a></li>
                    <li class="option" data-option="down"><a href="#">down</a></li>
                    <li class="option" data-option="delete"><a href="#">delete</a></li>
                    <li class="submit_image" data-option="submit"><a href="#">submit</a></li>
                </ul>
            </div>
            <div class="working-box-wrapper  col-sm-8 col-sm-offset-2 no-padding">
                <div class="inner-box">
                    <div class="working-inner-box">
                        <div class="box-hidden" id="box-hidden">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
