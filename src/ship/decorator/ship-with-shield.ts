import { ShipDecorator } from './ship-decorator';
import { IShip } from '../iship';
import { AssetManager } from '../../asset-manager';

export class ShipWithShield extends ShipDecorator {
    private _width = 90;
    private _height = 86;

    private isAlive = true;

    constructor(ship: IShip) {
        super(ship);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        if (this.isAlive) {
            ctx.drawImage(AssetManager.getInstance().getAsset('shield3.png'), this.left, this.top, this.width, this.height);
        }
    }

    collisionHandler(that: IShip): void {
        if (this.isAlive) {
            this.isAlive = false;
        } else {
            super.collisionHandler(that);
        }
    }

    get left(): number {
        return this.centerX - Math.floor(this.width / 2) + 1;
    }

    get top(): number {
        return this.centerY - Math.floor(this.height / 2) + 1;
    }

    get right(): number {
        return this.left + this.width - 1;
    }

    get bottom(): number {
        return this.top + this.height - 1;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get centerX(): number {
        return this.ship.centerX;
    }

    get centerY(): number {
        return this.ship.centerY;
    }

    set left(val: number) {
        this.centerX = val + Math.floor(this.width / 2);
    }

    set top(val: number) {
        this.centerY = val + Math.floor(this.height / 2);
    }

    set right(val: number) {
        this.left = val - this.width + 1;
    }

    set bottom(val: number) {
        this.top = val - this.height + 1;
    }

    set centerX(val: number) {
        this.ship.centerX = val;
    }

    set centerY(val: number) {
        this.ship.centerY = val;
    }
}