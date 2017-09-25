import { IShip } from '../iship';
import { Observable, IObserver } from '../../event/iobserver';
import { ShipSide } from '../ship-side';
import { GameEvent, EventShipDestroyed } from '../../event/game-event';
import { IMoveStrategy } from '../move-strategy/imove-strategy';

export abstract class ShipDecorator extends Observable implements IShip, IObserver {
    constructor(protected ship: IShip) {
        super();
        ship.attach(this);
    }

    tick(): void {
        this.ship.tick();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.ship.draw(ctx);
    }

    isCollidedWith(that: IShip): boolean {
        return this.ship.isCollidedWith(that);
    }

    collisionHandler(that: IShip): void {
        this.ship.collisionHandler(that);
    }

    update(event: GameEvent): void {
        if (event instanceof EventShipDestroyed) {
            event.observable = this;
        }
        this.notify(event);
    }

    get side(): ShipSide {
        return this.ship.side;
    }

    get left(): number {
        return this.ship.left;
    }

    get top(): number {
        return this.ship.top;
    }

    get right(): number {
        return this.ship.right;
    }

    get bottom(): number {
        return this.ship.bottom;
    }

    get width(): number {
        return this.ship.width;
    }

    get height(): number {
        return this.ship.height;
    }

    get centerX(): number {
        return this.ship.centerX;
    }

    get centerY(): number {
        return this.ship.centerY;
    }

    get mover(): IMoveStrategy {
        return this.ship.mover;
    }

    set left(val: number) {
        this.ship.left = val;
    }

    set top(val: number) {
        this.ship.top = val;
    }

    set right(val: number) {
        this.ship.right = val;
    }

    set bottom(val: number) {
        this.ship.bottom = val;
    }

    set centerX(val: number) {
        this.ship.centerX = val;
    }

    set centerY(val: number) {
        this.ship.centerY = val;
    }

    set mover(val: IMoveStrategy) {
        this.ship.mover = val;
    }
}