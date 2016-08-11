function interactInit() {
    tiny_mce('.text-handle');
    // start interact with jquery UI
    $('.j-resize').resizable(
        {
            handles: "n, ne, e, se, s, sw, w, nw",
            workingEl: '.img-handle',
        }
    );

    $('.j-drag').draggable({
            workingEl: '.img-handle',
            cursor: "move",
        });
    $('.j-rotate').rotatable({
        workingEl: '.img-handle',
        
    });
    $('.border-box').mousedown(function (e) {
        console.log($(this).css('transform'));
    });
    $('.menu').find('.option').click(function (e) {
        e.stopImmediatePropagation();
        var option = $(this).data('option');
        var elActive = $("[element-active='true']");
        var elColor = elActive.css('background-color');
        var elOpacity = elActive.css('opacity');
        var elZIndex = elActive.css('z-index');
        switch (option) {
            case 'text':
                console.log($(this));
                drawText();
                break;
            case 'color':
                drawBoxColor();
                break;
            case 'opacity':
                drawBoxOpacity($(this), elOpacity);
                break;
            case 'up':
                elActive.css('z-index', parseInt(elZIndex) + 1);
                break;
            case 'down':
                elActive.css('z-index', parseInt(elZIndex) - 1);
                break;
            case 'delete':
                elActive.remove();
                break;
        }
    });

    //event for border
    $('.border-box').mousedown(function (e) {
        e.stopPropagation();
        removeActiveEl();
        $('.img-handle-'+$(this).data('value')).attr('element-active', 'true');
        $(this).attr('element-active', 'true');
        var ac = $(this);
        refreshBorder(ac);
    });
    setWidthHeight();
}
function removeBorder() {
    $('.border-box').css('border', 'none');
    $('.border-box > .ui-resizable-handle').removeClass('th-resize');
    $('.border-box > .ui-resizable-n').removeClass('resize-n');
    $('.border-box > .ui-resizable-ne').removeClass('resize-ne');
    $('.border-box > .ui-resizable-e').removeClass('resize-e');
    $('.border-box > .ui-resizable-es').removeClass('resize-se');
    $('.border-box > .ui-resizable-s').removeClass('resize-s');
    $('.border-box > .ui-resizable-sw').removeClass('resize-sw');
    $('.border-box > .ui-resizable-w').removeClass('resize-w');
    $('.border-box > .ui-resizable-wn').removeClass('resize-nw');
    $('.border-box .ui-rotatable-handle').removeClass('th-rotate-handle');
}
function refreshBorder(el) {
    removeBorder();
    if(el){

    }else {
        el = $('.border-box[element-active="true"]').first();

    }
    console.log(el);
    console.log(13231);
    el.css('border', 'dashed 1px red');
    el.find('> .ui-resizable-handle').addClass('th-resize');
    el.find('> .ui-resizable-n').addClass('resize-n');
    el.find('> .ui-resizable-ne').addClass('resize-ne');
    el.find('> .ui-resizable-e').addClass('resize-e');
    el.find('> .ui-resizable-se').addClass('resize-se');
    el.find('> .ui-resizable-s').addClass('resize-s');
    el.find('> .ui-resizable-sw').addClass('resize-sw');
    el.find('> .ui-resizable-w').addClass('resize-w');
    el.find('> .ui-resizable-nw').addClass('resize-nw');
    el.find(' .ui-rotatable-handle').addClass('th-rotate-handle');
}
function removeActiveEl() {
    var active = $("[element-active='true']");
    active.removeAttr( 'element-active' );
}
function drawBoxColor() {
    console.log('draw box');
}
function drawBoxOpacity(el, op) {
    return false;
    $('.opacity-slider').remove();
    el.append('<div class="opacity-slider"></div>');
    $( ".opacity-slider" ).slider({
        value: op*100,
        stop: function( event, ui ) {

        }
    });
}

function drawText() {
    removeActiveEl();
    var numberTime = new Date().valueOf();
    var html = '';
    html = '<div class="text-handle editor text-box-set  img-handle-'+numberTime+' " data-value="' + numberTime + '">' +
        '<div class=""  element-active="true">' +
        'xxxxxxxxxxx' +
        '</div>'
        '</div>';
    $('#box-hidden').append(html);
    html = '<div class="border-box border-box-'+numberTime+' j-drag j-rotate j-resize" data-value="'+numberTime+'"  data-type="4"  element-active="true"></div>';
    $('#working-box .working-inner-box').append(html);
    interactInit();
    $('.editor').wysiwyg();
    setWidthHeight();

    $( ".editor" ).mousedown(function(e) {
        e.stopPropagation();
        refreshBorder()
    }).keyup(function (e) {
        e.stopPropagation();
        refreshWidthHeight($(this));
    });
}
function setWidthHeight() {
    var innerBox = $('.inner-box');
    var iw = innerBox.outerWidth();
    var ih = (iw*295)/784;
    innerBox.outerHeight(ih);

    var num;
    $('.border-box').each(function () {
        num = '.img-handle-' + $(this).data('value');
        num = $(num);
        num1 = '.position-box-' + $(this).data('value');
        var type = $(this).data('type');
        switch (type){
            case 4:
                var text = num;
                iw = parseInt(text.outerWidth()) + parseInt(20);
                ih = parseInt(text.outerHeight()) + parseInt(20);
                num.height(ih - 20);
                num.width(iw - 20);
                num.css('margin', '10px');
                break;
            case 3:
                var el = num.find('.img-box-set').first();
                var image = new Image();
                image.src = el.attr("src");
                iw = image.naturalWidth;
                ih = image.naturalHeight;
                console.log(32);
                if(iw > 100){
                    ih = ih * 100/iw;
                    iw = 100;
                }
                num.height(ih);
                num.width(iw);
                break;
            default :
                iw = innerBox.outerWidth();
                ih = innerBox.outerHeight();
                num.height(ih);
                num.width(iw);
        }
        $(this).height(ih);
        $(this).width(iw);

    });
}
function refreshWidthHeight(el) {
    var totalHeight = 20;
    el.children().each(function(){
        totalHeight = totalHeight + $(this).outerHeight(true);
    });
    var text = el.closest('.text-handle');
    var num = text.data('value');
    $('.border-box-' + num).outerHeight(totalHeight);
    text.outerHeight(totalHeight - 20);
}
function heightWorkingbox() {
    var innerBox = $('.inner-box');
    var iw = innerBox.outerWidth();
    var ih = (iw*295)/784;
    innerBox.outerHeight(ih);
}
function tiny_mce(el) {
    return false;
    tinymce.init({
        selector: el,
        inline: true,
        menubar: false,
        theme: 'modern',
        plugins: [
            'emoticons template paste textcolor colorpicker '
        ],
        toolbar: ' insertfile undo redo | styleselect | fontselect fontsizeselect forecolor | bold italic | emoticons paste ',
        font_sizes : "8px,10px,12px,14px,16px,18px,20px,24px,32px,36px",
        style_formats: [
            {title: 'Open Sans', inline: 'span', styles: { 'font-family':'Open Sans'}},
            {title: 'Arial', inline: 'span', styles: { 'font-family':'arial'}},
            {title: 'Book Antiqua', inline: 'span', styles: { 'font-family':'book antiqua'}},
            {title: 'Comic Sans MS', inline: 'span', styles: { 'font-family':'comic sans ms,sans-serif'}},
            {title: 'Courier New', inline: 'span', styles: { 'font-family':'courier new,courier'}},
            {title: 'Georgia', inline: 'span', styles: { 'font-family':'georgia,palatino'}},
            {title: 'Helvetica', inline: 'span', styles: { 'font-family':'helvetica'}},
            {title: 'Impact', inline: 'span', styles: { 'font-family':'impact,chicago'}},
            {title: 'Symbol', inline: 'span', styles: { 'font-family':'symbol'}},
            {title: 'Tahoma', inline: 'span', styles: { 'font-family':'tahoma'}},
            {title: 'Terminal', inline: 'span', styles: { 'font-family':'terminal,monaco'}},
            {title: 'Times New Roman', inline: 'span', styles: { 'font-family':'times new roman,times'}},
            {title: 'Verdana', inline: 'span', styles: { 'font-family':'Verdana'}}
        ],
    });
}

$(function () {
    $(window).mousedown(function() {
        removeBorder();
    });
    interactInit();
    heightWorkingbox();
});

