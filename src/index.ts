import { Constant } from './constant';

(function (document) {
    // Create canvas element and append it to the body
    const canvas = document.createElement('canvas');
    canvas.width = Constant.CANVAS_WIDTH;
    canvas.height = Constant.CANVAS_HEIGHT;
    document.body.appendChild(canvas);

    // get canvas context
    const ctx = canvas.getContext('2d');

    // load ship's image
    const img = new Image();
    img.src = 'assets/player_ship.png';

    // init ship's state
    let x = Constant.GAME_LEFT, y = Constant.GAME_TOP;
    const width = 64, height = 48;
    let deltaX = 5, deltaY = 5;

    // main loop
    function tick() {
        // canvas background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, Constant.CANVAS_WIDTH, Constant.CANVAS_HEIGHT);

        // game background
        ctx.fillStyle = 'white';
        ctx.fillRect(
            Constant.GAME_LEFT,
            Constant.GAME_TOP,
            Constant.GAME_WIDTH,
            Constant.GAME_HEIGHT
        );

        // draw ship image
        ctx.drawImage(img, x, y, width, height);

        // adjust ship's position
        x += deltaX;
        y += deltaY;

        // adjust ship's movement: make it bounce
        if (x <= Constant.GAME_LEFT || x + width - 1 >= Constant.GAME_RIGHT) {
            deltaX *= -1;
        }

        if (y <= Constant.GAME_TOP || y + height - 1 >= Constant.GAME_BOTTOM) {
            deltaY *= -1;
        }

    }

    // capture user input
    document.addEventListener('keydown', event => console.log(event.keyCode));
    document.addEventListener('keyup', event => console.log(event.keyCode));

    // start main loop
    setInterval(() => requestAnimationFrame(tick), 1000 / Constant.FPS);
})(window.document);