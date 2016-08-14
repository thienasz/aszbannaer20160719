/*!
 * jQuery UI Draggable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Draggable
//>>group: Interactions
//>>description: Enables dragging functionality for any element.
//>>docs: http://api.jqueryui.com/draggable/
//>>demos: http://jqueryui.com/draggable/
//>>css.structure: ../../themes/base/draggable.css


$.widget("ui.draggable", $.ui.mouse, {
    version: "1.12.0",
    widgetEventPrefix: "drag",
    options: {
        cursor: "auto",
        cursorAt: false,
        handle: false,
        workingEl: false,
        zIndex: false,

        // Callbacks
        drag: null,
        start: null,
        stop: null
    },
    _create: function () {
        var name = this.options.workingEl + '-' + this.element.data('value');
        this.workingEl = $(name);

        this._setHandleClassName();

        this._mouseInit();
    },

    _mouseStart: function (event) {

        var target = event.target;
        this._startX = event.clientX;
        this._startY = event.clientY;
        // grab the clicked element's position
        this._offsetX = this.ExtractNumber(target.style.left);
        this._offsetY = this.ExtractNumber(target.style.top);
        return true;
    },

    _mouseDrag: function (event) {

        //Compute the helpers position
        this.position = this._generatePosition(event);

        //Call plugins and callbacks and use the resulting position if something is returned

        this.workingEl.css('position', "absolue");
        this.workingEl.css('left', this.position.left + 'px');
        this.workingEl.css('top', this.position.top + 'px');
        this.handleElement.css('position', "absolue");
        this.handleElement.css('left', this.position.left + 'px');
        this.handleElement.css('top', this.position.top + 'px');
        return false;
    },

    _setHandleClassName: function () {
        this.handleElement = this.options.handle ?
            this.element.find(this.options.handle) : this.element;
    },

    _generatePosition: function (event, constrainPosition) {
        var leftR;
        var topR;
        leftR = (this._offsetX + event.clientX - this._startX);
        topR = (this._offsetY + event.clientY - this._startY);
        return {
            top: topR,
            left: leftR
        };

    },

    // From now on bulk stuff - mainly helpers
    ExtractNumber: function (value) {
        var n = parseInt(value);

        return n == null || isNaN(n) ? 0 : n;
    }

});

var widgetsDraggable = $.ui.draggable;

