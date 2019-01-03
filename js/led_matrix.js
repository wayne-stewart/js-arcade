
define([], function() {

    /*
        rect = { x, y, w, h } rectangle on canvas in which to draw
        res = { w, h } pixel resolution horizontal and vertical count
        pixelSize = 0 - 1, 0 = tiny, 1 = max without overlapping
    */
    var LedMatrix = function(canvas, rect, res) {
        this.canvas = canvas;
        this.rect = rect;
        this.res = res;
        this.pixelSize = 0.5;
    };
    
    LedMatrix.prototype.render = function() {
        var ctx = this.canvas.getContext2d();
        var rect = this.rect;
        ctx.fillStyle = "blue";
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        var sp;
        if (this.rect.h > this.rect.w) {
            sp = rect.w / this.res.w;
        }
        else {
            sp = rect.h / this.res.h;
        }
        ctx.fillStyle = "red";
        var r = sp / 2 * this.pixelSize;
        for (var x = 1; x <= this.res.w; x++) {
            for (var y = 1; y <= this.res.h; y++) {
                ctx.beginPath();
                ctx.ellipse(
                    rect.x + x * sp - sp / 2, 
                    rect.y + y * sp - sp / 2, 
                    r, r, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    };

    return LedMatrix;
});