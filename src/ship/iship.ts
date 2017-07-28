import { IObservable } from '../event/iobserver';

export interface IShip extends IObservable {
    left: number;
    top: number;
    right: number;
    bottom: number;
    centerX: number;
    centerY: number;

    width: number;
    height: number;

    tick(): void;
    draw(ctx: CanvasRenderingContext2D): void;

    isCollidedWith(that: IShip): boolean;
    collisionHandler(that: IShip): void;
}