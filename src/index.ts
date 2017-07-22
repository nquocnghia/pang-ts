import { Constant } from './constant';
import { Game } from './game';
import { AssetManager } from './asset-manager';

(function (document) {
    // Create canvas element and append it to the body
    const canvas = document.createElement('canvas');
    canvas.width = Constant.CANVAS_WIDTH;
    canvas.height = Constant.CANVAS_HEIGHT;
    document.body.appendChild(canvas);

    // get canvas context
    const ctx = canvas.getContext('2d');

    // preload assets
    const am = AssetManager.getInstance();
    am.preload();

    // launch program
    function launch() {
        // wait until all assets are loaded
        if (!am.isPreloadingDone()) {
            setTimeout(launch, 1000);
            return;
        }

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
    }

    launch();

})(window.document);