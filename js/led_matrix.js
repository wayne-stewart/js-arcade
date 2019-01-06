
define([], function() {

    var rgba2gray = function(inputData) {
        var outputData = new Uint8ClampedArray(inputData.length / 4);
        for(var i = 0; i < outputData.length; i++) {
            outputData[i] = 
                0.2989 * inputData[i*4] + 
                0.5870 * inputData[i*4+1] + 
                0.1140 * inputData[i*4+2];
        }
        return outputData;
    };

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
        ctx.fillStyle = "#040414";
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        var sp;
        if (this.rect.h > this.rect.w) {
            sp = rect.w / this.res.w;
        }
        else {
            sp = rect.h / this.res.h;
        }
        ctx.fillStyle = "red";
        var ledPixelData = this.ledPixelData;
        var r = sp / 2 * this.pixelSize;
        var rowStart = 0;
        var offColor = parseInt("25", 16);
        var colorRange = 255 - offColor;
        var color = 0;
        for (var y = 0; y < this.res.h; y++) {
            rowStart = y * this.res.w;
            for (var x = 0; x < this.res.w; x++) {
                color = ((ledPixelData.data[rowStart + x] / 255) * colorRange) + offColor;
                color = Math.floor(color);
                ctx.fillStyle = "#" + color.toString(16) + "0000";
                ctx.beginPath();
                ctx.ellipse(
                    rect.x + (x + 1) * sp - sp / 2, 
                    rect.y + (y + 1) * sp - sp / 2, 
                    r, r, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    };

    LedMatrix.prototype.setText = function(fontfamily, text) {
        var font = this.canvas.createExactSizeFont(fontfamily, this.res.h, text);
        var size = this.canvas.measureText(font, text);
        var cvs = document.createElement("canvas");
        cvs.width = size.w;
        cvs.height = size.h;
        var ctx = cvs.getContext("2d");
        ctx.font = font;
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,cvs.width, cvs.height);
        ctx.fillStyle = "white";
        ctx.fillText(text, 0, cvs.height);
        // cvs.style.width = cvs.width;
        // cvs.style.height = cvs.height;
        // document.body.appendChild(cvs);
        var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
        this.ledPixelData = { 
            data:  rgba2gray(imageData.data),
            width: imageData.width, 
            height: imageData.height 
        };
    };

    return LedMatrix;
});