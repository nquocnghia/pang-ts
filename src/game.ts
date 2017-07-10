import { Constant } from './constant';

export class Game {
    private img: HTMLImageElement;
    private bgImg: HTMLImageElement;

    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private deltaX: number;
    private deltaY: number;

    constructor() {
        // load background image
        this.bgImg = new Image();
        this.bgImg.src = 'assets/bg.jpg';

        // load ship's image
        this.img = new Image();
        this.img.src = 'assets/player_ship.png';

        // init ship's state
        this.x = Constant.GAME_LEFT;
        this.y = Constant.GAME_TOP;
        this.width = 64;
        this.height = 48;
        this.deltaX = 5;
        this.deltaY = 5;
    }

    tick(): void {
        // adjust ship's position
        this.x += this.deltaX;
        this.y += this.deltaY;

        // adjust ship's movement: make it bounce
        if (this.x <= Constant.GAME_LEFT || this.x + this.width - 1 >= Constant.GAME_RIGHT) {
            this.deltaX *= -1;
        }

        if (this.y <= Constant.GAME_TOP || this.y + this.height - 1 >= Constant.GAME_BOTTOM) {
            this.deltaY *= -1;
        }
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

        // draw ship image
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    onKeyDown(keyCode: number): void {
        console.log(keyCode);
    }

    onKeyUp(keyCode: number): void {
        console.log(keyCode);
    }
}