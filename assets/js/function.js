function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle +=360 : angle;
}

/**
 * get params of layout
 */
function getParamas(el, times) {
    var obj = {};
    var top = 0 , left = 0, rotate = 0, zIndex = 0, width, height, id;
    top = !isNaN(parseInt(el.css('top'))) ? parseInt(el.css('top')) : 0;
    left = !isNaN(parseInt(el.css('left'))) ? parseInt(el.css('left')) : 0;
    zIndex = !isNaN(parseInt(el.css('zIndex'))) ? parseInt(el.css('zIndex')) : 0;
    width = parseInt(el.css('width'));
    height = parseInt(el.css('height'));
    id = el.data("value");
    obj['left'] = left;
    obj['zindex'] = zIndex;
    obj['width'] = width * times;
    obj['height'] = height * times;
    obj['element_id'] = id;
    obj['rotate'] = getRotationDegrees(el);
    obj['top'] = tl.top;
    console.log( el.get(0).getBoundingClientRect());
    console.log(1111);
    return obj;
}
