import { Constant } from './constant';

(function (document) {
    // Create canvas element and append it to the body
    const canvas = document.createElement('canvas');
    canvas.width = Constant.CANVAS_WIDTH;
    canvas.height = Constant.CANVAS_HEIGHT;
    document.body.appendChild(canvas);

    // get canvas context
    const ctx = canvas.getContext('2d');

    // main loop
    function tick() {

    }

    // capture user input
    document.addEventListener('keydown', event => console.log(event.keyCode));
    document.addEventListener('keyup', event => console.log(event.keyCode));

    // start main loop
    setInterval(() => requestAnimationFrame(tick), 1000 / Constant.FPS);
})(window.document);