
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
        addClasses: true,
        appendTo: "parent",
        axis: false,
        connectToSortable: false,
        containment: false,
        cursor: "auto",
        cursorAt: false,
        grid: false,
        handle: false,
        workingEl: false,
        helper: "original",
        iframeFix: false,
        opacity: false,
        refreshPositions: false,
        revert: false,
        revertDuration: 500,
        scope: "default",
        scroll: true,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: false,
        snapMode: "both",
        snapTolerance: 20,
        stack: false,
        zIndex: false,

        // Callbacks
        drag: null,
        start: null,
        stop: null
    },
    _create: function () {
        var name = this.options.workingEl+'-'+this.element.data('value');
        this.workingEl = $(name);

        this.topor = parseFloat(this.element.css("transform-origin").split(' ')[1]);
        this.leftor = parseFloat(this.element.css("transform-origin").split(' ')[0]);
        if (this.options.helper === "original") {
            this._setPositionRelative();
        }
        if (this.options.addClasses) {
            this._addClass("ui-draggable");
        }
        this._setHandleClassName();

        this._mouseInit();
    },

    _setOption: function (key, value) {
        this._super(key, value);
        if (key === "handle") {
            this._removeHandleClassName();
            this._setHandleClassName();
        }
    },

    _destroy: function () {
        if (( this.helper || this.element ).is(".ui-draggable-dragging")) {
            this.destroyOnClear = true;
            return;
        }
        this._removeHandleClassName();
        this._mouseDestroy();
    },

    _mouseCapture: function (event) {
        var o = this.options;

        // Among others, prevent a drag on a resizable-handle
        if (this.helper || o.disabled ||
            $(event.target).closest(".ui-resizable-handle").length > 0) {
            return false;
        }
        //Quit if we're not on a valid handle
        this.handle = this._getHandle(event);
        if (!this.handle) {
            return false;
        }

        return true;

    },

    _mouseStart: function (event) {

        this.rotateCurrent = getRotationDegrees(this.workingEl);

        this.topBefore = this.workingEl.css("top");//translate x
        this.leftBefore = this.workingEl.css("left");//translate y
        this.workingEl.css('position', "absolute");
        this.workingEl.css('left', "0px");
        this.handleElement.css('left', "0px");
        this.topor = parseFloat(this.element.css("transform-origin").split(' ')[1]);
        this.leftor = parseFloat(this.element.css("transform-origin").split(' ')[0]);
        
        this.workingEl.css('top', "0px");
        this.handleElement.css('top', "0px");
        
		 var o = this.options;
        //Create and append the visible helper
        this.helper = this._createHelper(event);

        this._addClass(this.helper, "ui-draggable-dragging");

        //Cache the helper size
        this._cacheHelperProportions();

        //If ddmanager is used for droppables, set the global draggable
        if ($.ui.ddmanager) {
            $.ui.ddmanager.current = this;
        }

        /*
         * - Position generation -
         * This block generates everything position related - it's the core of draggables.
         */

        //Cache the margins of the original element
        this._cacheMargins();

        //Store the helper's css position
        this.cssPosition = this.helper.css("position");
        this.scrollParent = this.helper.scrollParent(true);
        this.offsetParent = this.helper.offsetParent();
        this.hasFixedAncestor = this.helper.parents().filter(function () {
                return $(this).css("position") === "fixed";
            }).length > 0;

        //The element's absolute position on the page minus margins
        this.positionAbs = this.element.offset();
        this._refreshOffsets(event);

        //Generate the original position
        this.originalPosition = this.position = this._generatePosition(event, false);
        this.originalPageX = event.pageX;
        this.originalPageY = event.pageY;

        //Adjust the mouse offset relative to the helper if "cursorAt" is supplied
        ( o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt) );

        //Set a containment if given in the options
        this._setContainment();

        //Trigger event + callbacks
        if (this._trigger("start", event) === false) {
            this._clear();
            return false;
        }

        //Recache the helper size
        this._cacheHelperProportions();

        //Prepare the droppable offsets
        if ($.ui.ddmanager && !o.dropBehaviour) {
            $.ui.ddmanager.prepareOffsets(this, event);
        }
        // Execute the drag once - this causes the helper not to be visible before getting its
        // correct position
        this._mouseDrag(event, true);

        // If the ddmanager is used for droppables, inform the manager that dragging has started
        // (see #5003)
        if ($.ui.ddmanager) {
            $.ui.ddmanager.dragStart(this, event);
        }

        return true;
    },

    _refreshOffsets: function (event) {
        this.offset = {
            top: this.positionAbs.top - this.margins.top,
            left: this.positionAbs.left - this.margins.left,
            scroll: false,
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset()
        };

        this.offset.click = {
            left: event.pageX - this.offset.left,
            top: event.pageY - this.offset.top
        };
    },

    _mouseDrag: function (event, noPropagation) {

        // reset any necessary cached properties (see #5009)
        if (this.hasFixedAncestor) {
            this.offset.parent = this._getParentOffset();
        }

        //Compute the helpers position
        this.position = this._generatePosition(event, true);
        this.positionAbs = this._convertPositionTo("absolute");

        //Call plugins and callbacks and use the resulting position if something is returned
        if (!noPropagation) {
            var ui = this._uiHash();
            if (this._trigger("drag", event, ui) === false) {
                this._mouseUp(new $.Event("mouseup", event));
                return false;
            }
            this.position = ui.position;
        }
        if(this.options.workingEl){
            var name = this.options.workingEl+'-'+this.element.data('value');
            this.workingEl = $(name);
            this.workingEl.css('transform', 'translate3d('+this.position.left+'px, '+this.position.top+'px, 0px) rotateZ('+ this.rotateCurrent +'deg)');
            this.handleElement.css('transform', 'translate3d('+this.position.left+'px, '+this.position.top+'px, 0px) rotateZ('+ this.rotateCurrent +'deg)');


            // this.handleElement.css('left', this.position.left + "px");
            // this.handleElement.css('right', -this.position.left + "px");
            // this.handleElement.css('top', this.position.top + "px");
            // this.handleElement.css('bottom', -this.position.top + "px");
        }
            // this.helper[0].style.left = this.position.left + "px";
            // this.helper[0].style.right = -this.position.left + "px";
            // this.helper[0].style.top = this.position.top + "px";
            // this.helper[0].style.bottom = -this.position.top + "px";

        if ($.ui.ddmanager) {
            $.ui.ddmanager.drag(this, event);
        }

        return false;
    },

    _mouseStop: function (event) {

        //If we are using droppables, inform the manager about the drop
        var that = this,
            dropped = false;
        if ($.ui.ddmanager && !this.options.dropBehaviour) {
            dropped = $.ui.ddmanager.drop(this, event);
        }

        //if a drop comes from outside (a sortable)
        if (this.dropped) {
            dropped = this.dropped;
            this.dropped = false;
        }

        if (( this.options.revert === "invalid" && !dropped ) ||
            ( this.options.revert === "valid" && dropped ) ||
            this.options.revert === true || ( $.isFunction(this.options.revert) &&
            this.options.revert.call(this.element, dropped) )
        ) {
            $(this.helper).animate(
                this.originalPosition,
                parseInt(this.options.revertDuration, 10),
                function () {
                    if (that._trigger("stop", event) !== false) {
                        that._clear();
                    }
                }
            );
        } else {
            if (this._trigger("stop", event) !== false) {
                this._clear();
            }
        }

        return false;
    },

    _mouseUp: function (event) {

        // If the ddmanager is used for droppables, inform the manager that dragging has stopped
        // (see #5003)
        if ($.ui.ddmanager) {
            $.ui.ddmanager.dragStop(this, event);
        }

        // Only need to focus if the event occurred on the draggable itself, see #10527
        if (this.handleElement.is(event.target)) {

            // The interaction is over; whether or not the click resulted in a drag,
            // focus the element
            this.element.trigger("focus");
        }

        return $.ui.mouse.prototype._mouseUp.call(this, event);
    },

    cancel: function () {

        if (this.helper.is(".ui-draggable-dragging")) {
            this._mouseUp(new $.Event("mouseup", {target: this.element[0]}));
        } else {
            this._clear();
        }

        return this;

    },

    _getHandle: function (event) {
        return this.options.handle ?
            !!$(event.target).closest(this.element.find(this.options.handle)).length :
            true;
    },

    _setHandleClassName: function () {
        this.handleElement = this.options.handle ?
            this.element.find(this.options.handle) : this.element;
        this._addClass(this.handleElement, "ui-draggable-handle");
    },

    _removeHandleClassName: function () {
        this._removeClass(this.handleElement, "ui-draggable-handle");
    },

    _createHelper: function (event) {

        var o = this.options,
            helperIsFunction = $.isFunction(o.helper),
            helper = helperIsFunction ?
                $(o.helper.apply(this.element[0], [event])) :
                ( o.helper === "clone" ?
                    this.element.clone().removeAttr("id") :
                    this.element );

        if (!helper.parents("body").length) {
            helper.appendTo(( o.appendTo === "parent" ?
                this.element[0].parentNode :
                o.appendTo ));
        }

        // Http://bugs.jqueryui.com/ticket/9446
        // a helper function can return the original element
        // which wouldn't have been set to relative in _create
        if (helperIsFunction && helper[0] === this.element[0]) {
            this._setPositionRelative();
        }

        if (helper[0] !== this.element[0] && !( /(fixed|absolute)/ ).test(helper.css("position"))) {
            helper.css("position", "absolute");
        }

        return helper;

    },

    _setPositionRelative: function () {
        if (!( /^(?:r|a|f)/ ).test(this.element.css("position"))) {
            this.element[0].style.position = "relative";
        }
    },

    _adjustOffsetFromHelper: function (obj) {
        if (typeof obj === "string") {
            obj = obj.split(" ");
        }
        if ($.isArray(obj)) {
            obj = {left: +obj[0], top: +obj[1] || 0};
        }
        if ("left" in obj) {
            this.offset.click.left = obj.left + this.margins.left;
        }
        if ("right" in obj) {
            this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
        }
        if ("top" in obj) {
            this.offset.click.top = obj.top + this.margins.top;
        }
        if ("bottom" in obj) {
            this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
        }
    },

    _isRootNode: function (element) {
        return ( /(html|body)/i ).test(element.tagName) || element === this.document[0];
    },

    _getParentOffset: function () {

        //Get the offsetParent and cache its position
        var po = this.offsetParent.offset(),
            document = this.document[0];

        // This is a special case where we need to modify a offset calculated on start, since the
        // following happened:
        // 1. The position of the helper is absolute, so it's position is calculated based on the
        // next positioned parent
        // 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
        // the document, which means that the scroll is included in the initial calculation of the
        // offset of the parent, and never recalculated upon drag
        if (this.cssPosition === "absolute" && this.scrollParent[0] !== document &&
            $.contains(this.scrollParent[0], this.offsetParent[0])) {
            po.left += this.scrollParent.scrollLeft();
            po.top += this.scrollParent.scrollTop();
        }

        if (this._isRootNode(this.offsetParent[0])) {
            po = {top: 0, left: 0};
        }

        return {
            top: po.top + ( parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0 ),
            left: po.left + ( parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0 )
        };

    },

    _getRelativeOffset: function () {
        if (this.cssPosition !== "relative") {
            return {top: 0, left: 0};
        }

        var p = this.element.position(),
            scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

        return {
            top: p.top - ( parseInt(this.helper.css("top"), 10) || 0 ) +
            ( !scrollIsRootNode ? this.scrollParent.scrollTop() : 0 ),
            left: p.left - ( parseInt(this.helper.css("left"), 10) || 0 ) +
            ( !scrollIsRootNode ? this.scrollParent.scrollLeft() : 0 )
        };

    },

    _cacheMargins: function () {
        this.margins = {
            left: ( parseInt(this.element.css("marginLeft"), 10) || 0 ),
            top: ( parseInt(this.element.css("marginTop"), 10) || 0 ),
            right: ( parseInt(this.element.css("marginRight"), 10) || 0 ),
            bottom: ( parseInt(this.element.css("marginBottom"), 10) || 0 )
        };
    },

    _cacheHelperProportions: function () {
        this.helperProportions = {
            width: this.helper.outerWidth(),
            height: this.helper.outerHeight()
        };
    },

    _setContainment: function () {

        var isUserScrollable, c, ce,
            o = this.options,
            document = this.document[0];

        this.relativeContainer = null;

        if (!o.containment) {
            this.containment = null;
            return;
        }

        if (o.containment === "window") {
            this.containment = [
                $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
                $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
                $(window).scrollLeft() + $(window).width() -
                this.helperProportions.width - this.margins.left,
                $(window).scrollTop() +
                ( $(window).height() || document.body.parentNode.scrollHeight ) -
                this.helperProportions.height - this.margins.top
            ];
            return;
        }

        if (o.containment === "document") {
            this.containment = [
                0,
                0,
                $(document).width() - this.helperProportions.width - this.margins.left,
                ( $(document).height() || document.body.parentNode.scrollHeight ) -
                this.helperProportions.height - this.margins.top
            ];
            return;
        }

        if (o.containment.constructor === Array) {
            this.containment = o.containment;
            return;
        }

        if (o.containment === "parent") {
            o.containment = this.helper[0].parentNode;
        }

        c = $(o.containment);
        ce = c[0];

        if (!ce) {
            return;
        }

        isUserScrollable = /(scroll|auto)/.test(c.css("overflow"));

        this.containment = [
            ( parseInt(c.css("borderLeftWidth"), 10) || 0 ) +
            ( parseInt(c.css("paddingLeft"), 10) || 0 ),
            ( parseInt(c.css("borderTopWidth"), 10) || 0 ) +
            ( parseInt(c.css("paddingTop"), 10) || 0 ),
            ( isUserScrollable ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth ) -
            ( parseInt(c.css("borderRightWidth"), 10) || 0 ) -
            ( parseInt(c.css("paddingRight"), 10) || 0 ) -
            this.helperProportions.width -
            this.margins.left -
            this.margins.right,
            ( isUserScrollable ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight ) -
            ( parseInt(c.css("borderBottomWidth"), 10) || 0 ) -
            ( parseInt(c.css("paddingBottom"), 10) || 0 ) -
            this.helperProportions.height -
            this.margins.top -
            this.margins.bottom
        ];
        this.relativeContainer = c;
    },

    _convertPositionTo: function (d, pos) {

        if (!pos) {
            pos = this.position;
        }

        var mod = d === "absolute" ? 1 : -1,
            scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

        return {
            top: (

                // The absolute mouse position
                pos.top +

                // Only for relative positioned nodes: Relative offset from element to offset parent
                this.offset.relative.top * mod +

                // The offsetParent's offset without borders (offset + border)
                this.offset.parent.top * mod -
                ( ( this.cssPosition === "fixed" ?
                    -this.offset.scroll.top :
                    ( scrollIsRootNode ? 0 : this.offset.scroll.top ) ) * mod )
            ),
            left: (

                // The absolute mouse position
                pos.left +

                // Only for relative positioned nodes: Relative offset from element to offset parent
                this.offset.relative.left * mod +

                // The offsetParent's offset without borders (offset + border)
                this.offset.parent.left * mod -
                ( ( this.cssPosition === "fixed" ?
                    -this.offset.scroll.left :
                    ( scrollIsRootNode ? 0 : this.offset.scroll.left ) ) * mod )
            )
        };

    },

    _generatePosition: function (event, constrainPosition) {

        var containment, co, top, left,
            o = this.options,
            scrollIsRootNode = this._isRootNode(this.scrollParent[0]),
            pageX = event.pageX,
            pageY = event.pageY;

        // Cache the scroll
        if (!scrollIsRootNode || !this.offset.scroll) {
            this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            };
        }

        /*
         * - Position constraining -
         * Constrain the position to a mix of grid, containment.
         */

        // If we are not dragging yet, we won't check for options
        if (constrainPosition) {
            if (this.containment) {
                if (this.relativeContainer) {
                    co = this.relativeContainer.offset();
                    containment = [
                        this.containment[0] + co.left,
                        this.containment[1] + co.top,
                        this.containment[2] + co.left,
                        this.containment[3] + co.top
                    ];
                } else {
                    containment = this.containment;
                }

                if (event.pageX - this.offset.click.left < containment[0]) {
                    pageX = containment[0] + this.offset.click.left;
                }
                if (event.pageY - this.offset.click.top < containment[1]) {
                    pageY = containment[1] + this.offset.click.top;
                }
                if (event.pageX - this.offset.click.left > containment[2]) {
                    pageX = containment[2] + this.offset.click.left;
                }
                if (event.pageY - this.offset.click.top > containment[3]) {
                    pageY = containment[3] + this.offset.click.top;
                }
            }

            if (o.grid) {

                //Check for grid elements set to 0 to prevent divide by 0 error causing invalid
                // argument errors in IE (see ticket #6950)
                top = o.grid[1] ? this.originalPageY + Math.round(( pageY -
                    this.originalPageY ) / o.grid[1]) * o.grid[1] : this.originalPageY;
                pageY = containment ? ( ( top - this.offset.click.top >= containment[1] ||
                top - this.offset.click.top > containment[3] ) ?
                    top :
                    ( ( top - this.offset.click.top >= containment[1] ) ?
                    top - o.grid[1] : top + o.grid[1] ) ) : top;

                left = o.grid[0] ? this.originalPageX +
                Math.round(( pageX - this.originalPageX ) / o.grid[0]) * o.grid[0] :
                    this.originalPageX;
                pageX = containment ? ( ( left - this.offset.click.left >= containment[0] ||
                left - this.offset.click.left > containment[2] ) ?
                    left :
                    ( ( left - this.offset.click.left >= containment[0] ) ?
                    left - o.grid[0] : left + o.grid[0] ) ) : left;
            }

            if (o.axis === "y") {
                pageX = this.originalPageX;
            }

            if (o.axis === "x") {
                pageY = this.originalPageY;
            }
        }
        var a = Math.cos(this.rotateCurrent) * this.element.height();
        
        var topR =  // The absolute mouse position
            pageY -

            // Click offset (relative to the element)
            this.offset.click.top -

            // Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.relative.top -

            // The offsetParent's offset without borders (offset + border)
            this.offset.parent.top +
            ( this.cssPosition === "fixed" ?
                -this.offset.scroll.top :
                ( scrollIsRootNode ? 0 : this.offset.scroll.top ) );
        var leftR =
            // The absolute mouse position
            pageX -

            // Click offset (relative to the element)
            this.offset.click.left -

            // Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.relative.left -

            // The offsetParent's offset without borders (offset + border)
            this.offset.parent.left +
            ( this.cssPosition === "fixed" ?
                -this.offset.scroll.left :
                ( scrollIsRootNode ? 0 : this.offset.scroll.left ) );
        
        //var rad = this.rotateCurrent;
        //leftR = leftR + this.leftor * Math.cos(rad) - this.topor * Math.sin(rad) - this.leftor* Math.cos(rad);
        //topR = topR + this.leftor * Math.sin(rad) + this.topor * Math.cos(rad) - this.topor* Math.cos(rad);

        return {
                top: topR,
                left: leftR
            };

    },

    _clear: function () {
        this._removeClass(this.helper, "ui-draggable-dragging");
        if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
            this.helper.remove();
        }
        this.helper = null;
        this.cancelHelperRemoval = false;
        if (this.destroyOnClear) {
            this.destroy();
        }
    },

    // From now on bulk stuff - mainly helpers

    _trigger: function (type, event, ui) {
        ui = ui || this._uiHash();
        $.ui.plugin.call(this, type, [event, ui, this], true);

        // Absolute position and offset (see #6884 ) have to be recalculated after plugins
        if (/^(drag|start|stop)/.test(type)) {
            this.positionAbs = this._convertPositionTo("absolute");
            ui.offset = this.positionAbs;
        }
        return $.Widget.prototype._trigger.call(this, type, event, ui);
    },

    plugins: {},

    _uiHash: function () {
        return {
            helper: this.helper,
            position: this.position,
            originalPosition: this.originalPosition,
            offset: this.positionAbs
        };
    }

});

var widgetsDraggable = $.ui.draggable;

