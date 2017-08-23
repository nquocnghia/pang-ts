import { Point } from '../point';
import { IShip } from './iship';
import { AssetManager } from '../asset-manager';
import { Observable } from '../event/iobserver';
import { IMoveStrategy } from './move-strategy/imove-strategy';
import { GroupShip } from './group/group-ship';
import { ShipSide } from './ship-side';

/**
 * This represents a Ship
 */
export abstract class Ship extends Observable implements IShip {
    private img: HTMLImageElement;
    private contour: Array<number[]>;

    constructor(
        imgSrc: string,
        protected position: Point,
        public width: number,
        public height: number,
        private _mover: IMoveStrategy,
        public readonly side: ShipSide
    ) {
        super();

        // load ship's image
        this.img = AssetManager.getInstance().getAsset(imgSrc);

        // init contour based on image alpha channel
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.img, 0, 0, width, height);
        const pixels = ctx.getImageData(0, 0, width, height);

        this.contour = new Array(height);
        for (let y = 0; y < height; y++) {
            this.contour[y] = new Array(width);
            for (let x = 0; x < width; x++) {
                const idx = y * width * 4 + x * 4 + 3; // get the alpha channel
                this.contour[y][x] = pixels.data[idx];
            }
        }
    }

    tick(): void {
        this._mover.move(this);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // draw ship image
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    isCollidedWith(that: IShip): boolean {
        // let the group do the test
        if (that instanceof GroupShip) {
            return that.isCollidedWith(this);
        }

        // type check
        if (this.canCollideWith(that) === false) {
            return false;
        }

        // bounding box collision check
        if (this.left > that.right || this.right < that.left || this.top > that.bottom || this.bottom < that.top) {
            return false;
        }

        if (that instanceof Ship) {
            // pixel perfect test
            const topMax = this.top > that.top ? this.top : that.top;
            const bottomMin = this.bottom < that.bottom ? this.bottom : that.bottom;
            const leftMax = this.left > that.left ? this.left : that.left;
            const rightMin = this.right < that.right ? this.right : that.right;

            for (let locY = topMax; locY <= bottomMin; locY++) {
                for (let locX = leftMax; locX <= rightMin; locX++) {
                    // collision detected
                    if (this.contour[locY - this.top][locX - this.left] > 0 && that.contour[locY - that.top][locX - that.left] > 0) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    abstract canCollideWith(that: IShip): boolean;

    abstract collisionHandler(that: IShip): void;

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

    get mover(): IMoveStrategy {
        return this._mover;
    }

    set mover(val: IMoveStrategy) {
        this._mover = val;
    }
}