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
        $(this).off('click');
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
    html = '<div class="img-handle-'+numberTime+' ">' +
        '<div class="text-handle"><p>Example</p></div>' +
        '</div>'
    $('#box-hidden').append(html);
    html = '<div class="border-box border-box-'+numberTime+' j-drag j-rotate" data-value="'+numberTime+'"  element-active="true"></div>';
    $('#working-box .working-inner-box').append(html);
    interactInit();
    ///
    signBoxtext($('.border-box-'+numberTime));

}
function signBoxtext(bel) {
    var num = bel.data('value');
    var img = $('.img-handle-'+num).find('p').first();
    img.css('padding', '10px');
    img.css('display', 'inline');
    img.css('top', '0');
    img.css('left', parseInt($('#box-hidden').width())/2);
    var h = img.outerHeight();
    var w = img.outerWidth();
    bel.height(h);
    bel.width(w);
    var left = parseInt(img.css('left')) - parseInt(w)/2;
    bel.css('transform', 'translate3d(' + left + 'px, 0px, 0px)');
}
function heightWorkingbox() {
    var innerBox = $('.inner-box');
    var iw = innerBox.outerWidth();
    var ih = (iw*295)/784;
    innerBox.outerHeight(ih);
}
function tiny_mce(el) {
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
    heightWorkingbox();
});

