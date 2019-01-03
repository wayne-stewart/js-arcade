
define([], function() { 

    var Canvas = function(canvasSelector) {
        this.el = document.querySelector(canvasSelector);
    };

    Canvas.prototype.matchResolution = function() {
        this.el.width = this.el.clientWidth;
        this.el.height = this.el.clientHeight;
        return this;
    };

    Canvas.prototype.getContext2d = function() {
        return this.el.getContext("2d");
    };

    return Canvas;

});