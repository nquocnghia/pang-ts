import { Constant } from '../constant';
import { Point } from '../point';

/**
 * This represents a Ship
 */
export class Ship {
    private img: HTMLImageElement;

    constructor(
        imgSrc: string,
        private position: Point,
        private width: number,
        private height: number,
        private deltaX: number,
        private deltaY: number
    ) {
        // load ship's image
        this.img = new Image();
        this.img.src = imgSrc;
    }

    tick() {
        // adjust ship's position
        this.position.x += this.deltaX;
        this.position.y += this.deltaY;

        // adjust ship's movement: make it bounce
        if (this.position.x <= Constant.GAME_LEFT || this.position.x + this.width - 1 >= Constant.GAME_RIGHT) {
            this.deltaX *= -1;
        }

        if (this.position.y <= Constant.GAME_TOP || this.position.y + this.height - 1 >= Constant.GAME_BOTTOM) {
            this.deltaY *= -1;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        // draw ship image
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    onKeyDown(keyCode: number) {
        switch (keyCode) {
            case 37: // left
                this.deltaX = -Math.abs(this.deltaX);
                break;
            case 39: // right
                this.deltaX = Math.abs(this.deltaX);
                break;
            case 38: // up
                this.deltaY = -Math.abs(this.deltaY);
                break;
            case 40: // down
                this.deltaY = Math.abs(this.deltaY);
                break;
        }
    }

    onKeyUp(keyCode: number) {
        console.log(`onKeyUp: ${keyCode}`);
    }
}