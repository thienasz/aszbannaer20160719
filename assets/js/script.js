// global var
var initOnce = 0;
var root = "http://banner.dev";
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
                    html += '<div class="box-left working-el" data-value="'+value.id+'"> <img class="img-show" src="data:image/png;base64,'+value.image+'"></div>';
                });
                $('#content-show').html(html);
                $('#content-show').trigger('contentChange');
            }
        });
    }
}
// function add al to work section

function addToWorkSection() {
    var workEls = $('.working-el');
    workEls.click(function () {
        var workEl = $(this);
        var id = workEl.data("value");
        console.log(id);
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
                console.log(numberTime);
                var html = '';
                // add content img
                html += '<div class="img-handle-'+numberTime+'" data-value="'+value.id+'" element-active="true">' +
                            ' <img class="img-show h100 cursor-move" src="data:image/png;base64,'+value.image+'">' +
                        '</div>';
                $('#working-box .working-inner-box .box-hidden').append(html);
                //add border
                html = '<div class="border-box border-box-'+numberTime+' j-drag j-resize j-rotate" data-value="'+numberTime+'" ></div>';
                $('#working-box .working-inner-box').append(html);
                $('#working-box').trigger('contentChange');
            }
        });
    });
}

//load js
$(function () {
    $( ".selector" ).draggable( "option", "addClasses", false );
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
    $('.test-click').click(function () {

        // call api
        $.ajax({
            url: root +'/element/getElementTestAjax',
            dataType: 'json',
            type: 'POST',
            error: function() {
                $('#info').html('<p>An error has occurred</p>');
            },
            success: function (value) {
                removeActiveEl();
                //random number by time
                var numberTime = new Date().valueOf();
                console.log(numberTime);
                var html = '';
                // add content img
                html += '<div class="img-handle-'+numberTime+'" data-value= element-active="true">' +
                    ' <img class="img-show h100 cursor-move" src="data:image/png;base64,'+value.image+'">' +
                    '</div>';
                $('#working-box .working-inner-box .box-hidden').append(html);
                //add border
                html = '<div class="border-box border-box-'+numberTime+' j-drag j-resize j-rotate" data-value="'+numberTime+'" ></div>';
                $('#working-box .working-inner-box').append(html);
                $('#working-box').trigger('contentChange');
            }
        });
    })
});