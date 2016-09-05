// global var
var info = {};
info.zindex = [];
info.listNum = [];
info.num = [];

function reset() {
    var active;
    active = $(".active");
    if(active.length == 0) {
        if (localStorage.getItem("back_category") != null) {
            $(".menu-fix").find("[data-value='" + localStorage.getItem("back_category") + "']").addClass("active");
            localStorage.removeItem("back_category");
        } else {
            $(".menu-fix > li").first().addClass("active")
        }
        reset();
    } else {
        var category;
        category = active.data("value");
        console.log(category)  ;
        if(category==1){
            $.ajax({
                url: root +'/layout/getAllLayoutsAjax',
                type: 'POST',
                dataType: 'json',
                error: function() {
                    $('#info').html('<p>An error has occurred</p>');
                },
                success: function (data) {
                     console.log(data);
                    var html = '';
                    html += '<div class="left-wrapper" >';
                    $.each (data, function (index, value) {
                        html += '<div class="box-left working-el" data-value="'+value.id+'" data-category="1"> <img class="img-show" src="data:image/png;base64,'+value.image+'"></div>';
                    });
                    $('#content-show').html(html);
                    $('#content-show').trigger('contentChange');
                }
            });
        } else if(category==2){
            $.ajax({
                url: root +'/element/getAllElementsAjax',
                data: {
                    cateId: category,
                },
                dataType: 'json',
                type: 'POST',
                error: function() {
                    $('#info').html('<p>An error has occurred</p>');
                },
                success: function (data) {
                    console.log(data);
                    var html = '';
                    html += '<div class="left-wrapper" >';
                    $.each (data, function (index, value) {
                        html += '<div class="box-left working-el"  data-value="'+value.id+'" data-category="'+value.category_id+'"> <img class="img-show" src="data:image/png;base64,'+value.image+'"></div>';
                    });
                    $('#content-show').html(html);
                    $('#content-show').trigger('contentChange');
                }
            });
        }
        else{
            {
                $.ajax({
                    url: root +'/element/getAllElementsAjax',
                    data: {
                        cateId: category,
                    },
                    dataType: 'json',
                    type: 'POST',
                    error: function() {
                        $('#info').html('<p>An error has occurred</p>');
                    },
                    success: function (data) {
                        console.log(data);
                        var html = '';
                        html += '<div class="left-wrapper" style="margin-top: 10px" >';
                        $.each (data, function (index, value) {
                            if(value.type == 'png' || value.type== 'jpg') {
                                html += '<div class="box-left working-el" style="width: 47%;float: left;margin-left: 8px"   data-value="' + value.id + '" data-category="' + value.category_id + '"> <img class="img-show" src="data:image/png;base64,' + value.image + '"></div>';
                            }else{
                                html += '<div class="box-left working-el"  style=" width: 146.83px; height: 147px;margin-left: 8px; width: 47%;float: left;" data-value="' + value.id + '" data-category="' + value.category_id + '"><div class ="img-show-svg" >' + value.image + '</div>'+'</div>';

                            }
                        });
                        $('#content-show').html(html);
                        $('#content-show').trigger('contentChange');
                    }
                });
            }
        }
        // call api

    }
}
// function add element to work section

function addToWorkSection() {
    var workEls = $('.working-el');
    workEls.click(function () {
        var workEl = $(this);
        console.log(workEl.data);
        var id = workEl.data("value");
        var cate_id =  workEl.data("category");

        if(cate_id == 1){
            $('.border-box').remove();
            $('.img-handle').remove();
            $('.text-handle').remove();
            $.ajax({
                url: root +'/layout/getLayoutAjax',
                data: {
                    id: id,
                },
                dataType: 'json',
                type: 'POST',
                error: function() {
                    $('#info').html('<p>An error has occurred</p>');
                },
                success: function (data) {
                    console.log(data);
                    $.each (data, function (index,value){

                        removeActiveEl();

                        console.log("aaaa");
                        console.log( value.image);
                        var numberTime = new Date().valueOf();
                        var html = '';
                        // add content img
                        if(value.type == 'text') {
                            html += '<div class="text-handle editor text-box-set img-handle-'+numberTime+'" data-value="'+numberTime+'" element-active="true" style="'+
                            'top: ' + value.top_real + 'px;' +
                            'left: ' + value.left_real + 'px;' +
                            'width: ' + value.width_real + 'px;' +
                            'height: ' + value.height_real + 'px;' +
                            'z-index: ' + value.zindex +
                            ';transform: rotate('+ value.rotate + 'deg)'+
                            '" contenteditable="true">' +
                            '<div class="text-content">';
                            $.each(value.text, function (index, text) {
                                //@todo: not yet. text not working.
                                console.log(123);
                                console.log(text) ;
                                console.log(123);
                                html += '<font size="' +
                                    Math.round(parseInt(text.font_size)/7) +
                                    '" color="' +
                                    rgbToHex(text.color) +
                                    '">' +
                                    text.content +
                                    '</font>';
                                //console.log(html);
                            });
                            html += '</div>' +
                                '</div>';
                        } else {
                            if(value.type == 'svg'){
                                html += '<div class="img-handle-svg img-handle img-handle-' + numberTime + '" data-value="' + value.id + '"  style="'+
                                    'top: ' + value.top_real + 'px;' +
                                    'left: ' + value.left_real + 'px;' +
                                    'width: ' + value.width_real + 'px;' +
                                    'height: ' + value.height_real + 'px;' +
                                    'opacity: ' + value.opacity +
                                    ';z-index: ' + value.zindex +
                                    ';transform: rotate('+ value.rotate + 'deg)'+
                                    '" element-active="true">' +
                                    ' <div class="img-box-set img-show img-show-svg h100 cursor-move" >' + value.image + '</div></div>';

                            }else {
                                html += '<div class="img-handle img-handle-'+numberTime+'" data-value="'+value.id+'" element-active="true" style="'+
                                    'top: ' + value.top_real + 'px;' +
                                    'left: ' + value.left_real + 'px;' +
                                    'width: ' + value.width_real + 'px;' +
                                    'height: ' + value.height_real + 'px;' +
                                    'opacity: ' + value.opacity +
                                    ';z-index: ' + value.zindex +
                                    ';transform: rotate('+ value.rotate + 'deg)'+
                                    '" ><img class="img-box-set img-show h100 cursor-move" src="data:image/png;base64,'+value.image+'"></div>';
                                //console.log(html);
                            }
                        }
                        $('#working-box .working-inner-box .box-hidden').append(html);
                        //add border
                        html = '<div class="border-box border-box-'+numberTime+' j-drag j-resize j-rotate"  data-value="'+numberTime+'"  data-type="'+value.category_id+'" data-category="1" style="'+
                            'top:' + value.top_real + 'px;' +
                            'left:' + value.left_real + 'px;' +
                            'width:' + value.width_real + 'px;' +
                            'height:' + value.height_real + 'px;' +
                            'z-index:' + value.zindex +
                            ';transform: rotate('+ value.rotate + 'deg)'+
                            '"></div>';
                        $('#working-box .working-inner-box').append(html);

                        $('#working-box').trigger('contentChange');

                        //calculate zindex
                        calculateZindex('new', numberTime);

                        // console.log(info);
                    })


                }
            });
        }else {
            $.ajax({
                url: root +'/element/getElementAjax',
                data: {
                    id: id,
                },
                dataType: 'json',
                type: 'POST',
                error: function() {
                    $('#info').html('<p>An error has occurred</p>');
                },
                success: function (value) {
                    removeActiveEl();
                    //random number by time
                    var numberTime = new Date().valueOf();
                    var html = '';
                    // add content img
                    if(value.type == 'png' || value.type =='jpg') {
                        html += '<div class="img-handle img-handle-' + numberTime + '" data-value="' + value.id + '" element-active="true">' +
                            ' <img class="img-box-set img-show h100 cursor-move" src="data:image/png;base64,' + value.image + '">' +
                            '</div>';
                    }else{
                        html += '<div class="img-handle-svg img-handle img-handle-' + numberTime + '" data-value="' + value.id + '" element-active="true">' +
                            ' <div class="img-box-set img-show img-show-svg h100 cursor-move" >' + value.image + '</div></div>';
                    }
                    $('#working-box .working-inner-box .box-hidden').append(html);
                    //add border
                    if(value.type == 'png' || value.type =='jpg') {
                        html = '<div class="border-box border-box-' + numberTime + ' j-drag j-resize j-rotate"  data-value="' + numberTime + '"  data-type="' + value.category_id + '" data-category="0"></div>';
                    }else{
                        html = '<div class="border-box-svg border-box border-box-' + numberTime + ' j-drag j-resize j-rotate"  data-value="' + numberTime + '"  data-type="' + value.category_id + '" data-category="0"></div>';
                    }
                    $('#working-box .working-inner-box').append(html);

                    $('#working-box').trigger('contentChange');
                    calculateZindex('new', numberTime);
                }
            });

        }

        // call api

    });
}

/**
 * calculate zindex
 */
function calculateZindex(type, numberTime, text) {

    // get global z-index
    var activeEl = $('div[class*="-' + numberTime + '"]');
    var textEl;
    switch (type){
        case 'new':
            if(info.zindex && info.zindex.length == 0){
                info.zindex.push(10);
                info.num[numberTime] = 0;
            } else {
                info.num[numberTime] = info.zindex.length;
                info.zindex.push(parseInt(info.zindex[info.num[numberTime] - 1]) + 2);
            }
            info.listNum.push(numberTime);
            info.num.length++;
            activeEl.css('z-index', info.zindex[info.num[numberTime]]);
            break;
        case 'down':
            var upActiveEl = $('div[class*="-' + info.listNum[parseInt(info.num[numberTime]) - 1] + '"]');

            textEl = info.listNum[parseInt(info.num[numberTime]) - 1];
            if(typeof textEl == 'undefined') {
                return false;
            }
            // set css for el
            activeEl.css('z-index', info.zindex[info.num[numberTime] - 1]);
            upActiveEl.css('z-index', info.zindex[info.num[numberTime]]);

            // set info.listNum
            var temp;
            temp = info.listNum[info.num[numberTime]]
            info.listNum[info.num[numberTime]] = info.listNum[info.num[numberTime] - 1];
            info.listNum[info.num[numberTime] - 1] = temp;

            // set info.num
            info.num[info.listNum[info.num[numberTime]]] = info.num[numberTime];
            info.num[numberTime] -= 1;

            break;
        case 'up':
            var dowwnActiveEl = $('div[class*="-' + info.listNum[parseInt(info.num[numberTime]) + 1] + '"]');
            textEl = info.listNum[parseInt(info.num[numberTime]) + 1];
            if(typeof textEl == 'undefined') {
                return false;
            }
            activeEl.css('z-index', info.zindex[info.num[numberTime] + 1]);
            dowwnActiveEl.css('z-index', info.zindex[info.num[numberTime]]);

            // set info.listNum
            var temp;
            temp = info.listNum[info.num[numberTime]]
            info.listNum[info.num[numberTime]] = info.listNum[info.num[numberTime] + 1];
            info.listNum[info.num[numberTime] + 1] = temp;

            // set info.num
            info.num[info.listNum[info.num[numberTime]]] = info.num[numberTime];
            info.num[numberTime] += 1;
            break;
        case 'delete':
            break;
    }

    var typeEl = $('.border-box-' + numberTime).first().data('type');
    if(textEl && $('.border-box-' + textEl).first().data('type') == 4) {
        numberTime = textEl;
        typeEl = $('.border-box-' + numberTime).first().data('type');
    }
    if(text && text == 'text' || typeEl == 4) {
        $('.img-handle-' + numberTime ).css('z-index', parseInt($('.border-box-' + numberTime ).first().css('z-index')) + 1);
    }
}

/**
 * handle text toolbar
 */
function initToolbarBootstrapBindings() {
    var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
            'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
            'Times New Roman', 'Verdana'],
                fontTarget = $('[title=Font]').siblings('.dropdown-menu');
            $.each(fonts, function (idx, fontName) {
                fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
                });

            var fnts = ['1', '2', '3', '4', '5',
                        '6', '7'],
                    fntTarget = $('[title=FontSize]').siblings('.dropdown-menu');
             $.each(fnts, function (size, fontSize) {
                fntTarget.append($('<li><a data-edit="fontSize ' + fontSize + '" >' + fontSize + '</a></li>'));
             });
             
    var fontcolor = $('.colorpickerplus-dropdown .colorpickerplus-container');
    fontcolor.colorpickerembed();
    fontcolor.on('changeColor', function (e, color) {
        var el = $('.color-fill-icon', $('#fontcolor'));
        if (color == null) {
            //when select transparent color
            el.addClass('colorpicker-color');
        } else {
            el.removeClass('colorpicker-color');
            el.css('background-color', color);

        }
    });
    $('a[title]').tooltip({container: 'body'});
    $('.dropdown-menu input').click(function () {
        return false;
    })
        .change(function () {
            $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
        })
        .keydown('esc', function () {
            this.value = '';
            $(this).change();
        });

    $('[data-role=magic-overlay]').each(function () {
        var overlay = $(this), target = $(overlay.data('target'));
        overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
    });
    if ("onwebkitspeechchange" in document.createElement("input")) {
        var editorOffset = $('#editor').offset();
        $('#voiceBtn').css('position', 'absolute').offset({
            top: editorOffset.top,
            left: editorOffset.left + $('#editor').innerWidth() - 35
        });
    } else {
        $('#voiceBtn').hide();
    }

};
//load js
$(function () {
    reset();
    $(".menu-fix > li").click(function () {
        $(".active").removeClass("active");
        $(this).addClass("active");
        localStorage.setItem("back_category", $(this).data("value"));
        reset();
    });
    //load js after call ajax
    $('#content-show').on('contentChange', function () {
        addToWorkSection();
    });
    $('#working-box').on('contentChange', function () {
        interactInit()
    });

    initToolbarBootstrapBindings();
});
