/*
    Application Bootstrapper

    requires amd_loader with require to be loaded first
*/

(function(global) {

    var _led = null;
    var _timestamp = 0;

    window.addEventListener("resize", function() {
        console.log("resized");
    });

    require(["canvas", "led_matrix"], function(Canvas, LedMatrix) {
        var canvas = new Canvas("canvas");
        canvas.matchResolution();
        var led = new LedMatrix(canvas, 
            {x:50, y:50, w:(200 * 60 / 16), h:200 }, 
            {w:60, h:16});
        led.pixelSize = 0.8;
        led.setText("verdana", "Arcade Games");
        led.setTextAnimation("bounce", 0.0125);
        led.render();
        _led = led;
        requestAnimationFrame(frameRequestCallback);
    });

    let frameRequestCallback = function(timestamp) {
        _led.update(timestamp - _timestamp);
        _led.render();
        _timestamp = timestamp;
        requestAnimationFrame(frameRequestCallback);
    };

})(this);