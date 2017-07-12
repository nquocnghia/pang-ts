import { Constant } from './constant';
import { Ship } from './ship/ship';
import { Point } from './point';

export class Game {
    private bgImg: HTMLImageElement;

    private ship: Ship;

    constructor() {
        // load background image
        this.bgImg = new Image();
        this.bgImg.src = 'assets/bg.jpg';

        // init ship
        this.ship = new Ship('assets/player_ship.png',
            new Point(Constant.GAME_LEFT, Constant.GAME_TOP),
            64, 48,
            5, 5
        );
    }

    tick(): void {
        this.ship.tick();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // canvas background
        ctx.drawImage(
            this.bgImg,
            0,
            0,
            Constant.CANVAS_WIDTH,
            Constant.CANVAS_HEIGHT
        );

        this.ship.draw(ctx);
    }

    onKeyDown(keyCode: number): void {
        this.ship.onKeyDown(keyCode);
    }

    onKeyUp(keyCode: number): void {
        this.ship.onKeyUp(keyCode);
    }
}