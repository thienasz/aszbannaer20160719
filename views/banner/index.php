
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
    <div class="btn-toolbar" data-role="editor-toolbar" data-target=".editor[element-active='true'] .text-content">
        <div class="btn-group">
            <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font" data-original-title="Font"><i class="fa fa-font"></i><b class="caret"></b></a>
            <ul class="dropdown-menu scrollfont">
            </ul>
        </div>
        <div class="btn-group">
            <a class="btn dropdown-toggle" data-toggle="dropdown" title="FontSize" data-original-title="Font Size"><i class="fa fa-text-height"></i>&nbsp;<b class="caret"></b></a>
            <ul class="dropdown-menu">
            </ul>
        </div>
        <div class="btn-group btn-group-sm colorpickerplus-dropdown" id="fontcolor">
            <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Font Color"><span class="color-fill-icon dropdown-color-fill-icon"></span>&nbsp;<b class="caret"></b></div>
            <ul class="dropdown-menu">
                <li class="disabled">
                    <div class="colorpickerplus-container"></div>
                </li>

            </ul>
        </div>
        <div class="btn-group">
            <a class="btn" data-edit="bold" title="" data-original-title="Bold (Ctrl/Cmd+B)"><i class="fa fa-bold"></i></a>
            <a class="btn" data-edit="italic" title="" data-original-title="Italic (Ctrl/Cmd+I)"><i class="fa fa-italic"></i></a>
            <a class="btn" data-edit="strikethrough" title="" data-original-title="Strikethrough"><i class="fa fa-strikethrough"></i></a>
            <a class="btn" data-edit="underline" title="" data-original-title="Underline (Ctrl/Cmd+U)"><i class="fa fa-underline"></i></a>
        </div>
        <div class="btn-group">
            <a class="btn" data-edit="insertunorderedlist" title="" data-original-title="Bullet list"><i class="fa fa-list-ul"></i></a>
            <a class="btn" data-edit="insertorderedlist" title="" data-original-title="Number list"><i class="fa fa-list-ol"></i></a>
        </div>
        <div class="btn-group">
            <a class="btn btn-info" data-edit="justifyleft" title="" data-original-title="Align Left (Ctrl/Cmd+L)"><i class="fa fa-align-left"></i></a>
            <a class="btn" data-edit="justifycenter" title="" data-original-title="Center (Ctrl/Cmd+E)"><i class="fa fa-align-center"></i></a>
            <a class="btn" data-edit="justifyright" title="" data-original-title="Align Right (Ctrl/Cmd+R)"><i class="fa fa-align-right"></i></a>
            <a class="btn" data-edit="justifyfull" title="" data-original-title="Justify (Ctrl/Cmd+J)"><i class="fa fa-align-justify"></i></a>
        </div>
        <div class="btn-group">
            <a class="btn dropdown-toggle" data-toggle="dropdown" title="" data-original-title="Hyperlink"><i class="fa fa-link"></i></a>
            <div class="dropdown-menu input-append">
                <input class="span2" placeholder="URL" type="text" data-edit="createLink">
                <button class="btn" type="button">Add</button>
            </div>
            <a class="btn" data-edit="unlink" title="" data-original-title="Remove Hyperlink"><i class="fa fa-cut"></i></a>

        </div>
        <input type="text" data-edit="inserttext" id="voiceBtn" x-webkit-speech="" style="display: none;">
    </div>
    <div class="working-wrapper text-center">
        <div class="working-box" id="working-box">
            <div class="menu menu-fix menu-option small-menu z-show">
                <ul class="menu">
                    <li class="option" data-option="text"><a href="#">text</a></li>
                    <li class="option" data-option="color"><a href="#">color</a></li>
                    <li class="option" data-option="opacity"><a href="#">opacity</a></li>
                    <li class="option" data-option="up"><a href="#">up</a></li>
                    <li class="option" data-option="down"><a href="#">down</a></li>
                    <li class="option" data-option="delete"><a href="#">delete</a></li>
                    <li class="option" data-option="circle"><a href="#">circle</a></li>
                    <li class="option submit_image" data-option="submit"><a href="#">submit</a></li>
                </ul>
            </div>
            <div id="notify">
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
