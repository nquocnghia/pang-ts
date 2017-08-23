import { IShip } from '../iship';
import { Observable, IObserver } from '../../event/iobserver';
import { GameEvent, EventShipDestroyed } from '../../event/game-event';
import { ShipSide } from '../ship-side';
import { Collision } from '../collision';
import { IMoveStrategy } from '../move-strategy/imove-strategy';

export abstract class GroupShip extends Observable implements IShip, IObserver {
    protected ships: IShip[] = [];

    constructor(public readonly side: ShipSide, private _mover: IMoveStrategy) {
        super();
    }

    addShip(...shipsToAdd: IShip[]) {
        shipsToAdd.forEach(s => {
            s.attach(this);
            this.ships.push(s);
        });
    }

    removeShip(...shipsToRemove: IShip[]) {
        shipsToRemove.forEach(s => s.detach(this));
        this.ships = this.ships.filter(s => shipsToRemove.indexOf(s) === -1);
    }

    tick(): void {
        this.ships.forEach(s => s.tick());
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.ships.forEach(s => s.draw(ctx));
    }

    isCollidedWith(that: IShip): boolean {
        return this.ships.map(s => Collision.test(s, that)).filter(c => c === true).length > 0;
    }

    collisionHandler(that: IShip): void {
        console.log(`${this.constructor.name} is collided with ${that.constructor.name}`);
    }

    update(event: GameEvent): void {
        if (event instanceof EventShipDestroyed) {
            this.removeShip(event.observable);

            // groups is empty
            if (this.ships.length === 0) {
                this.notify(new EventShipDestroyed(this));
            }
        } else {
            // forward other events to the scene
            this.notify(event);
        }
    }

    get left(): number {
        return Math.min(...this.ships.map(s => s.left));
    }

    get top(): number {
        return Math.min(...this.ships.map(s => s.top));
    }

    get right(): number {
        return Math.max(...this.ships.map(s => s.right));
    }

    get bottom(): number {
        return Math.max(...this.ships.map(s => s.bottom));
    }

    get width(): number {
        return this.right - this.left + 1;
    }

    get height(): number {
        return this.bottom - this.top + 1;
    }

    get centerX(): number {
        return this.left + Math.floor(this.width / 2);
    }

    get centerY(): number {
        return this.top + Math.floor(this.height / 2);
    }

    get mover(): IMoveStrategy {
        return this._mover;
    }

    set mover(val: IMoveStrategy) {
        this._mover = val;
    }
}