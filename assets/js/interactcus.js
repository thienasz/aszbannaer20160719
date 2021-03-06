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
                drawBoxColor($(this), elColor);
                break;
            case 'opacity':
                drawBoxOpacity($(this), elOpacity);
                break;
            case 'up':
                console.log("dsvsa");
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
        $(':focus').blur();
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
        var temp;
        temp = $('.text-handle[element-active="true"]').first();
        el = $('.border-box-' + temp.data('value'));
        el.attr('element-active', 'true');
        
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
    $('.opacity-slider').slider({
        value:50,
        min: 0,
        max: 100,
        slide: function( event, ui ) {
            $(".img-handle[element-active='true']").css('opacity',  ui.value/100);
        }
    });
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
}

function drawBoxColor(el, op) {
    $('#table-color').remove();
    el.append('<div id="table-color" style="width: 60px; margin-bottom: -100px">'+
        '<svg id="swatches" width="60px" height="200px" viewBox="-4 -4 60 200" style="stroke: #000;stroke-width: 2; stroke-opacity: 0.1">'+
        '<rect style="fill:#000"    x="0"  y="0" width="20" height="20"/>'+
        '<rect style="fill:#AD5C51" x="25" y="0" width="20" height="20"/>'+
        '<rect style="fill:#F4CBB2" x="0"  y="25" width="20" height="20"/>'+
        '<rect style="fill:#f00"    x="25" y="25" width="20" height="20"/>'+
        '<rect style="fill:#7DBBE6" x="0"  y="50" width="20" height="20"/>'+
        '<rect style="fill:#9CDAF1" x="25" y="50" width="20" height="20"/>'+
        '<rect style="fill:#C3E4D8" x="0"  y="75" width="20" height="20"/>'+
        '<rect style="fill:#fff"    x="25" y="75" width="20" height="20"/>'+
        '<rect id="selection" style="stroke:#0000ff; stroke-opacity: 1;fill:none" x="0" y="0" width="20" height="20"/>'+
        '</svg>'+
        '</div>');
    var _currentFill = 'fill:#C3E4D8';
    var $swatches = $("#swatches");
    var z_index1 = $('.border-box-svg').css('z-index');
    z_index1 = z_index1 - 10;
    $swatches.click(function (event) {
        $swatch = $(event.target);
        z_index1 = z_index1 - 10;
        $('.border-box-svg').css('z-index',z_index1);
        console.log(z_index1);
        _currentFill = $swatch.attr('style');
        $('.img-handle-svg svg').click(function (event) {
            $(event.target).attr('style', _currentFill);
            z_index1 = z_index1 + 50;
            $('.border-box-svg').css('z-index', z_index1);
            console.log(z_index1);
            })
    });
}
function drawText() {
    removeActiveEl();
    var numberTime = new Date().valueOf();
    var html = '';
    html = '<div class="text-handle editor text-box-set  img-handle-' + numberTime + ' " data-value="' + numberTime + '" element-active="true">' + 
        '<div class="text-content">' + 'Text' + '</div>'+
    '</div>';
    $('#box-hidden').append(html);
    html = '<div class="border-box border-box-' + numberTime + ' j-drag j-rotate j-resize" data-value="' + numberTime + '"  data-type="4"  element-active="true"></div>';
    $('#working-box .working-inner-box').append(html);
    editor_wysiwyg(numberTime);
}

function editor_wysiwyg(numberTime){
    interactInit();
    console.log('abcdds');
    $('.editor[element-active="true"]').wysiwyg();

    calculateZindex('new', numberTime, 'text');

    $(".editor").mousedown(function (e) {
        e.stopPropagation();
        removeActiveEl();
        $(this).attr('element-active', 'true');
        $("ul.dropdown-menu").click(function(){
            refreshWidthHeight($(".editor"));
        })
        refreshWidthHeight($(this));
    }).keyup(function (e) {
        e.stopPropagation();
        refreshWidthHeight($(this));
    });
    $('.border-box-' + numberTime).css('min-height', '36px');
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
            var cate = $(this).data('category');
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
                    if(cate == 1){
                        iw= num.css('width');
                        ih = num.css('height');
                    } else {
                        if(iw > 100){
                            ih = ih * 100/iw;
                            iw = 100;
                        }else{
                            ih = 100;
                            iw = 100;
                        }
                    }
                    num.height(ih);
                    num.width(iw);
                    break;
                case 2 :
                    if(cate == 1){
                        iw= num.css('width');
                        ih = num.css('height');
                    }
                    if(cate == 0){
                        iw = 580;
                        ih= 218;
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
    $('.border-box-' + num).css('min-height', totalHeight);
}
/**
 * submit data for layout
 */
function getFinalElementText(el, otherEl) {
    if(!el.children().length > 0){
        if(typeof otherEl != 'undefined') {
            return el.add(otherEl);
        } else {
            return el;
        }
    } else {
        el.each(function (index, value) {
            if($(this).clone().children().remove().end().text().length){
                otherEl = (typeof otherEl != 'undefined') ? otherEl.add($(this)) : $(this);
            }
        });
        return getFinalElementText(el.children(), otherEl);
    }
}
function submitData() {
    console.log('vaosu');
    var array = [];
    var els = $('.border-box');
    console.log(els);
    var define = [];
    els.each(function (index, value) {

        console.log(index);
        console.log(value);
        var type = $(this).data('type');
        console.log(type);
        var handle = $('.img-handle-' + $(this).data('value'));
        var layout = {};
        layout.text = [];
        layout.rotate = getRotationDegrees(handle);
        var x =  layout.rotate*0.0175;
        layout.element_id = handle.data('value');
        layout.top = handle.position().top;
        layout.left = handle.position().left;
        layout.top_real = parseInt(handle.css('top')) ;
        layout.left_real = parseInt(handle.css('left')) ;
        layout.width_real = handle.width();
        layout.height_real = handle.height();
        layout.width = handle.width()*Math.cos(x) + handle.height()*Math.sin(x);
        layout.height = handle.width()*Math.sin(x) + handle.height()*Math.cos(x);
        layout.opacity = handle.css('opacity') ;
        layout.type = type;
        layout.zindex = handle.css('z-index');
        if(type == 4) {
            layout.element_id = 0;
            var origin = handle.find('.text-content').children();
            if(origin.length > 0) {
                origin.each(function (index, value) { //if select color first
                    var temp = getFinalElementText($(this));

                    if(temp.length > 0) {
                        var elTemp;
                        temp.each(function (index, value) {
                            elTemp = {};
                            elTemp.content = $(this).clone().children().remove().end().text();
                            elTemp.color = $(this).css('color');
                            elTemp.font_family = $(this).css('font-family');
                            elTemp.font_size = $(this).css('font-size');
                            elTemp.font_weight = $(this).css('font-weight');
                            elTemp.font_style = $(this).css('font-style');
                            elTemp.top = $(this).position().top;
                            elTemp.left = $(this).position().left;
                      
                            layout.text.push(elTemp);
                        });
                    }
                });
            } else {
                //default
                elTemp = {};
                elTemp.content = handle.find('.text-content').text();
                elTemp.color = handle.find('.text-content').css('color');
                elTemp.font_family = handle.find('.text-content').css('font-family');
                elTemp.font_size = handle.find('.text-content').css('font-size');
                elTemp.font_weight = handle.find('.text-content').css('font-weight');
                elTemp.font_style = handle.find('.text-content').css('font-style');
                elTemp.top = handle.find('.text-content').position().top;
                elTemp.left = handle.find('.text-content').position().left;

                layout.text.push(elTemp);
            }
        }
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
                '<strong>Submit success!</strong>View    ' +
                '<a href="layout/viewLayout/'+ data + '">   layout </a> ' +
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

