import { Constant } from './constant';
import { Game } from './game';

(function (document) {
    // Create canvas element and append it to the body
    const canvas = document.createElement('canvas');
    canvas.width = Constant.CANVAS_WIDTH;
    canvas.height = Constant.CANVAS_HEIGHT;
    document.body.appendChild(canvas);

    // get canvas context
    const ctx = canvas.getContext('2d');

    // init game
    const game = new Game();

    // main loop
    function tick() {
        game.tick(); // calculate state changes
        game.draw(ctx); // draw game
    }

    // capture user input
    document.addEventListener('keydown', event => game.onKeyDown(event.keyCode));
    document.addEventListener('keyup', event => game.onKeyUp(event.keyCode));

    // start main loop
    setInterval(() => requestAnimationFrame(tick), 1000 / Constant.FPS);

})(window.document);