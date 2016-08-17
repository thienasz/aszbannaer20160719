// global var
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
// function add element to work section

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
                html += '<div class="img-handle img-handle-'+numberTime+'" data-value="'+value.id+'" element-active="true">' +
                            ' <img class="img-box-set img-show h100 cursor-move" src="data:image/png;base64,'+value.image+'">' +
                        '</div>';
                $('#working-box .working-inner-box .box-hidden').append(html);
                //add border
                html = '<div class="border-box border-box-'+numberTime+' j-drag j-resize j-rotate"  data-value="'+numberTime+'"  data-type="'+value.category_id+'" ></div>';
                $('#working-box .working-inner-box').append(html);
                html = '<div class="position-box position-box-'+numberTime+'"></div>';
                $('#working-box .working-inner-box').append(html);
                $('#working-box').trigger('contentChange');
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

    initToolbarBootstrapBindings();
});
