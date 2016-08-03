function interactInit() {

    // start interact with jquery UI
    initOnce++;
    console.log(initOnce);
    $('.j-resize').resizable(
        {
            handles: "n, e, s, w",
            workingEl: '.img-handle',
        }
    );
    $('.j-drag').draggable(
        {
            workingEl: '.img-handle',
            cursor: "move",
            start: function( event, ui ) {
                var curentEl = $(this);
                // showBoderSelect(curentEl)
            },
            drag: function( event, ui ) {
                var curentEl = $(this);
                // showBoderSelect(curentEl, curentEl.css('top'), curentEl.css('left'));
                // curentEl.css('right', -parseInt(curentEl.css('left')));
                // curentEl.css('bottom', -parseInt(curentEl.css('top')));
            }
        }
    );
    $('.j-rotate').rotatable({
        workingEl: '.img-handle',
    });

    $('.menu').find('.option').click(function () {
        var option = $(this).data('option');
        var elActive = $("[element-active='true']");
        var elColor = elActive.css('background-color');
        var elZIndex = elActive.css('z-index');
        console.log(elActive);
        console.log(elColor);
        console.log(elZIndex);
        switch (option) {
            case 'color':
//                        show color table
                drawBoxColor();
                break;
            case 'opacity':
//                        show opacity table
                drawBoxOpacity();
                break;
            case 'up':
//                        handle z index
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

    //call when click active el
    $('.active-el').click(function () {
        removeActiveEl();
        $(this).attr('element-active', 'true');
        showBoderSelect($(this));
    });
    //event for border
    $('.border-box').mousedown(function () {
        var ac = $(this);
        refreshBorder(ac);
    });

    function refreshBorder(el) {
        $('.border-box').css('border', 'none');
        el.css('border', 'dashed 1px red');
    }
}


function showBoderSelect(e, top, left) {
    var br = $('.border-box');
    var img = $('.img-hasndle');
    br.css('position', 'absolute');
    br.css('overflow', 'hidden');
    br.css('right', -parseInt(left));
    br.css('left', parseInt(left));
    br.css('bottom', -parseInt(top));
    br.css('top', parseInt(top));
    img.css('position', 'absolute');
    img.css('right', -parseInt(left));
    img.css('left', parseInt(left));
    img.css('bottom', -parseInt(top));
    img.css('top', parseInt(top));
}
function removeActiveEl() {
    var active = $("[element-active='true']");
    active.removeAttr( 'element-active' );
}
function dragMoveListener (event) {
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}
function drawBoxColor() {
    console.log('draw box');
}

function heightWorkingbox() {
    var innerBox = $('.inner-box');
    var iw = innerBox.outerWidth();
    var ih = (iw*444)/1200;
    innerBox.outerHeight(ih);
}
$(function () {
    heightWorkingbox();
});
