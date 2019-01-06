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

    require(["common/canvas", "common/led_matrix"], function(Canvas, LedMatrix) {
        var canvas = new Canvas("canvas");
        canvas.matchResolution();
        var res = canvas.getResolution();
        var led = new LedMatrix(canvas, 
            {x:0, y:0, w:res.width, h:(res.height * 0.1) }, 
            {w:16 * res.width / (res.height * 0.1), h:16});
        led.pixelSize = 0.8;
        led.setText("verdana", "Welcome to the Arcade");
        led.setTextAnimation("bounce", 0.0125);
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