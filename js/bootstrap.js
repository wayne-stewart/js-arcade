/*
    Application Bootstrapper

    requires amd_loader with require to be loaded first
*/

(function(global) {

    document.body.onload = function() {
        require(["canvas", "led_matrix"], function(Canvas, LedMatrix) {
            var canvas = new Canvas("canvas");
            canvas.matchResolution();
            var led = new LedMatrix(canvas, 
                {x:50, y:50, w:600, h:150 }, 
                {w:60, h:15});
            led.pixelSize = 0.75;
            led.render();
        });
        requestAnimationFrame(frameRequestCallback);
    };

    let frameRequestCallback = function() {
        requestAnimationFrame(frameRequestCallback);
    };

})(this);