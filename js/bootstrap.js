/*
    Application Bootstrapper

    requires amd_loader with require to be loaded first
*/

(function(global) {

    document.body.onload = function() {
        requestAnimationFrame(frameRequestCallback);
    };

    let frameRequestCallback = function() {
        requestAnimationFrame(frameRequestCallback);
    };

    require(["canvas"], function(Canvas) {
        var canvas = new Canvas("canvas");
    });

})(this);