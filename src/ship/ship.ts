import { Point } from '../point';
import { IShip } from './iship';
import { AssetManager } from '../asset-manager';

/**
 * This represents a Ship
 */
export abstract class Ship implements IShip {
    private img: HTMLImageElement;

    constructor(
        imgSrc: string,
        protected position: Point,
        public width: number,
        public height: number
    ) {
        // load ship's image
        this.img = AssetManager.getInstance().getAsset(imgSrc);
    }

    abstract tick(): void;

    draw(ctx: CanvasRenderingContext2D): void {
        // draw ship image
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    get left(): number {
        return this.position.x;
    }

    get top(): number {
        return this.position.y;
    }

    get right(): number {
        return this.left + this.width - 1;
    }

    get bottom(): number {
        return this.top + this.height - 1;
    }

    get centerX(): number {
        return this.left + Math.floor(this.width / 2);
    }

    get centerY(): number {
        return this.top + Math.floor(this.height / 2);
    }

    set left(val: number) {
        this.position.x = val;
    }

    set top(val: number) {
        this.position.y = val;
    }

    set right(val: number) {
        this.position.x = val - this.width + 1;
    }

    set bottom(val: number) {
        this.position.y = val - this.height + 1;
    }

    set centerX(val: number) {
        this.position.x = val - Math.floor(this.width / 2);
    }

    set centerY(val: number) {
        this.position.y = val - Math.floor(this.height / 2);
    }
}