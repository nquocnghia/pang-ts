import { IObservable } from '../event/iobserver';
import { IMoveStrategy } from './move-strategy/imove-strategy';

export interface IShip extends IObservable {
    left: number;
    top: number;
    right: number;
    bottom: number;
    centerX: number;
    centerY: number;

    width: number;
    height: number;

    mover: IMoveStrategy;

    tick(): void;
    draw(ctx: CanvasRenderingContext2D): void;

    isCollidedWith(that: IShip): boolean;
    collisionHandler(that: IShip): void;
}