import { LinearShip } from './linear-ship';
import { Constant } from '../constant';
import { Point } from '../point';
import { ShipFactory } from './ship-factory';
import { EventShipCreated, GameEvent, EventShipDestroyed } from '../event/game-event';
import { Bullet } from './bullet';
import { IObserver } from '../event/iobserver';
import { IShip } from './iship';

/**
 * This represents the player ship
 */
export class Player extends LinearShip implements IObserver {
    private VELX = 5;

    private lastBullet: Bullet = undefined;

    constructor() {
        super('player_ship.png',
            new Point(0, 0),
            64, 48,
            0, 0
        );

        this.centerX = Constant.GAME_CENTER_X;
        this.bottom = Constant.GAME_BOTTOM;
    }

    tick(): void {
        // move the ship
        super.tick();

        // stop the ship when it reaches the borders
        if (this.left <= Constant.GAME_LEFT) {
            this.left = Constant.GAME_LEFT;
        } else if (this.right >= Constant.GAME_RIGHT) {
            this.right = Constant.GAME_RIGHT;
        }
    }

    moveLeft(): void {
        this.deltaX = -this.VELX;
    }

    moveRight(): void {
        this.deltaX = this.VELX;
    }

    stop(): void {
        this.deltaX = 0;
    }

    fire(): void {
        if (this.lastBullet === undefined) {
            this.lastBullet = ShipFactory.makePlayerBullet(this);
            this.lastBullet.attach(this);
            this.notify(new EventShipCreated(this, this.lastBullet));
        }
    }

    update(event: GameEvent): void {
        if (event instanceof EventShipDestroyed && event.observable === this.lastBullet) {
            this.lastBullet = undefined;
        }
    }

    canCollideWith(that: IShip): boolean {
        return true;
    }

    collisionHandler(that: IShip): void {
        console.log(`${this.constructor.name} collided ${that.constructor.name}`);
    }
}