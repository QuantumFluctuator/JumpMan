var ctx, image, level;

(function () {
    'use strict';
    var canvas;
    
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    image = document.getElementById('source');
    
    window.requestAnimationFrame(drawImageToCanvas);
    
    level = JSON.parse(localStorage.getItem('level'));
    if (level < 1) {
        localStorage.setItem('level', JSON.stringify(level));
    }
})();

function drawImageToCanvas() {
    'use strict';
    ctx.drawImage(image, 0, 0);
    window.requestAnimationFrame(drawImageToCanvas);
}