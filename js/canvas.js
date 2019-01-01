
define([], function() { 

    return function(canvasSelector) { 
        let canvas = document.querySelector(canvasSelector);
        console.log("canvas found: " + (!!(canvas)));
    };

});