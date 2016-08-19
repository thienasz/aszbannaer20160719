function interactInit() {

    // start interact with jquery UI
    $('.j-resize').resizable({
            handles: "n, ne, e, se, s, sw, w, nw",
            workingEl: '.img-handle',
        });

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
        var elCircle = $('.img-box-set');
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
                calculateZindex('up', $(".border-box[element-active='true']").data('value'));
                break;
            case 'down':
                console.log($(".border-box[element-active='true']").data('value'));
                console.log(222);
                calculateZindex('down', $(".border-box[element-active='true']").data('value'));
                break;
            case 'delete':
                elActive.remove();
                break;
            case 'submit':
                console.log('menusb');
                submitData();
                break;
            case 'circle':
                circle($(this), elCircle);
                // img1.css('border-radius',  '50%');
                break;
        }
    });

    //event for border
    setWidthHeight();
    $('.border-box').mousedown(function (e) {
        e.stopPropagation();
        removeActiveEl();
        $('.img-handle-' + $(this).data('value')).attr('element-active', 'true');
        $(this).attr('element-active', 'true');
        var ac = $(this);
        refreshBorder(ac);
    });
}
/**
 * handle border
 */
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
    if (el) {

    } else {
        el = $('.border-box[element-active="true"]').first();

    }
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
/**
 * remove active element when click delete
 */
function removeActiveEl() {
    var active = $("[element-active='true']");
    active.removeAttr('element-active');
}
/**
 * draw color box when click color option
 */
function drawBoxColor() {
    console.log('draw box');
}
/**
 * show slider when click opacity option
 * @param el
 * @param op
 * @returns {boolean}
 */
function drawBoxOpacity(el, op) {
   // return false;
    $('.opacity-slider').remove();
    el.append('<div class="opacity-slider" style="height: 6px;width: 70px; margin-top: 10px" ></div>');
    $(".opacity-slider").slider({
        value:50,
        slide: function( event, ui ) {
            $( "#minval" ).val( ui.value );
            $(".img-handle[element-active='true']").css('opacity',  ui.value/100);
        }
    });

    $( "#minval" ).val( $( ".opacity-slider" ).slider( "value" ) );
    $('#minval').remove();
    //el.append('<input type="text" id="minval" style="border:0; color:#2b669a; font-weight:bold;margin-top: 20px; width: 35px">');
}
/**
 * draw when click text option
 */

function circle(el, op) {
    $('.circle-slider').remove();
    el.append('<div class="circle-slider" style="height: 6px;width: 70px; margin-top: 10px" ></div>');
    $(".circle-slider").slider({
        value:50,
        slide: function( event, ui ) {
            $( "#minval" ).val( ui.value );
            $(".img-handle[element-active='true'] .img-box-set").css('border-radius',  ui.value+ '%');
        }
    });

    $( "#minval" ).val( $( ".circle-slider" ).slider( "value" ) );
    $('#minval').remove();


    //$(".img-show[element-active='true']").css('border-radius', 50);
}
function drawText() {
    removeActiveEl();
    var numberTime = new Date().valueOf();
    var html = '';
    html = '<div class="text-handle editor text-box-set  img-handle-' + numberTime + ' " data-value="' + numberTime + '" element-active="true">' +
        '<p>' +
        'Text' +
        '</p>'
    '</div>';
    $('#box-hidden').append(html);
    html = '<div class="border-box border-box-' + numberTime + ' j-drag j-rotate j-resize" data-value="' + numberTime + '"  data-type="4"  element-active="true"></div>';
    $('#working-box .working-inner-box').append(html);
    interactInit();
    $('.editor[element-active="true"]').wysiwyg();

    $(".editor").mousedown(function (e) {
        e.stopPropagation();
        refreshBorder()
    }).keyup(function (e) {
        e.stopPropagation();
        refreshWidthHeight($(this));
    });
}
/**
 * set border and el handle
 */
function setWidthHeight() {
    var innerBox = $('.inner-box');
    var iw = innerBox.outerWidth();
    var ih = (iw * 295) / 784;
    innerBox.outerHeight(ih);

    var num;
    $('.border-box').each(function () {
        if($(this).attr('resize') != 'true') {
            console.log(123);
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
        }
    });
}
/**
 * refresh when type text
 * @param el
 */
function refreshWidthHeight(el) {
    var totalHeight = 20;
    el.children().each(function () {
        totalHeight = totalHeight + $(this).outerHeight(true);
    });
    var text = el.closest('.text-handle');
    var num = text.data('value');
    $('.border-box-' + num).outerHeight(totalHeight);
    text.outerHeight(totalHeight - 20);
}
/**
 * submit data for layout
 */
function submitData() {
    console.log('vaosu');
    var array = [];
    var els = $('.border-box');
    console.log(els);
    var define = [];

    els.each(function (index, value) {
        var type = $(this).data('type');
        var handle = $('.img-handle-' + $(this).data('value'));
        var layout = {};
        layout.rotate = getRotationDegrees(handle);
        var x =  layout.rotate*0.0175;
        layout.element_id = handle.data('value');
        layout.top = handle.position().top;
        layout.left = handle.position().left;
        layout.width = handle.width()*Math.cos(x) + handle.height()*Math.sin(x);
        layout.height = handle.width()*Math.sin(x) + handle.height()*Math.cos(x);
        layout.type = type;
        layout.zindex = handle.css('z-index');2
        array.push(layout);
    });
    console.log(array);
    $.ajax({

        url: root +'/layout/saveDataLayout',
        data: {
            layouts: array,
            define: define,
        },
        dataType: 'json',
        type: 'POST',
        error: function() {
            $('#info').html('<p>An error has occurred</p>');
        },
        success: function (data) {
            console.log(data)  ;
            $('#notify').html('<div class="alert alert-success fade in"> ' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> ' +
                '<strong>Thêm thành công!</strong>Xem ảnh tại   ' +
                '<a href="layout/viewLayout/'+ data + '">   đây.. </a> ' +
                '</div>') ;
        }
    });
}
$(function () {
    $(window).mousedown(function () {
        removeBorder();
    });
    interactInit();
});

