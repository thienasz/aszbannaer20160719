// global var
var root = "http://localhost/banner";

function reset() {
    var active = $(".active");
    if(active.length == 0) {
        if (localStorage.getItem("back_category") != null) {
            $(".menu-fix").find("[data-value='" + localStorage.getItem("back_category") + "']").addClass("active");
            localStorage.removeItem("back_category");
        } else {
            $(".menu-fix > li").first().addClass("active")
        }
        reset();
    } else {
        var category = active.data("value");
        var type = active.data('value');
        console.log(type);
        // call api
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
                var html = '';
                html += '<div class="left-wrapper">';
                $.each (data, function (index, value) {
                    html += '<div class="box-left working-el type-' + type + '" data-value="'+value.id+'"> ' +
                        '<img class="img-show" src="data:image/png;base64,' + value.image + '">' +
                        '</div>';
                });
                $('#content-show').html(html);
                $('#content-show').trigger('contentChange');
            }
        });
    }
}
/**
 * add el to work section
 */
function addToWorkSection() {
    var workEls = $('.working-el');
    workEls.click(function () {
        var workEl = $(this);
        var id = workEl.data("value");
        // call api
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
                html += '<div class="img-handle img-handle-'+numberTime+' img-width-' + value.category_id + '" data-value="'+value.id+'" element-active="true">' +
                            ' <img class="img-show h100 cursor-move" src="data:image/png;base64,'+value.image+'">' +
                        '</div>';
                $('#working-box .working-inner-box .box-hidden').append(html);
                //add border
                html = '<div class="border-box border-box-'+numberTime+' j-drag j-resize j-rotate img-width-' + value.category_id + '" data-value="'+numberTime+'"  element-active="true"></div>';
                $('#working-box .working-inner-box').append(html);
                $('#working-box').trigger('contentChange');
                if(value.category_id == 3) {
                    var w = $("[element-active = 'true']").find('img').get(0).naturalWidth;
                    var h = $("[element-active = 'true']").find('img').get(0).naturalHeight;
                    $("[element-active = 'true']").height(parseInt(h)* 100/ parseInt(w));
                }
            }
        });
    });
}

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
    interactInit()
    $('.submit_image').click(function () {
        var actives = $('[class *= "img-handle"]');
        var times = 784/ parseInt($('#box-hidden').width());
        var data = [];
        actives.each(function () {
            var value = $(this);
            data.push(getParamas(value, times));
        });
        var jsonData = JSON.parse(JSON.stringify(data))
        $.ajax({
            url: root+'/layout/saveDataLayout',
            data: {
                data: jsonData,
            },
            dataType: 'json',
            type: 'POST',
            error: function() {
                $('#info').html('<p>An error has occurred</p>');
            },
            success: function (value) {

            }
        });
    });
});