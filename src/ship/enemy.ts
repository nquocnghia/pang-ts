import { Ship } from './ship';
import { Point } from '../point';
import { IMoveStrategy } from './move-strategy/imove-strategy';
import { IShip } from './iship';
import { Bullet } from './bullet';
import { ShipSide } from './ship-side';
import { EventShipDestroyed, EventShipCreated, GameEvent } from '../event/game-event';
import { ShipFactory } from './ship-factory';
import { IObserver } from '../event/iobserver';

export class Enemy extends Ship implements IObserver {
    private static bulletCounter = 0;
    static LIMIT = 2;

    private frameCounter = 0;
    private readonly INTERVAL = Math.floor(Math.random() * 300) + 60;

    constructor(
        imgSrc: string,
        position: Point,
        width: number,
        height: number,
        mover: IMoveStrategy
    ) {
        super(imgSrc, position, width, height, mover, ShipSide.ENEMY);
    }

    tick(): void {
        super.tick();

        if (this.frameCounter++ === this.INTERVAL) {
            this.frameCounter = 0;
            this.fire();
        }
    }

    canCollideWith(that: IShip): boolean {
        return that instanceof Bullet && that.side !== this.side;
    }

    collisionHandler(that: IShip): void {
        this.notify(new EventShipDestroyed(this));
    }

    fire(): void {
        if (Enemy.bulletCounter < Enemy.LIMIT) {
            Enemy.bulletCounter++;

            const bullet = ShipFactory.makeEnemyBullet(this);
            bullet.attach(this);
            this.notify(new EventShipCreated(this, bullet));
        }
    }

    update(event: GameEvent): void {
        if (event instanceof EventShipDestroyed && event.observable instanceof Bullet) {
            Enemy.bulletCounter--;
        }
    }
}