// global var
var initOnce = 0;

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
            url: 'http://localhost/banner/element/getAllElementsAjax',
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
            url: 'http://localhost/banner/element/getElementAjax',
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
                var html = '';
                // html += '<div class="box-hidden"';
                // html += '</div>';

                html += '<div class="active-el j-drag j-resize j-rotate" data-value="'+value.id+'" element-active="true" style="position: absolute"> ' +
                    '<div class="box-hidden">' +
                    '<div class="img-handle">' +
                    ' <img class="img-show h100 cursor-move" src="data:image/png;base64,'+value.image+'">' +
                    '</div>' +
                    '</div>' +
                    '<div class="border-box"></div>' +
                    '</div>';
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
    })
});