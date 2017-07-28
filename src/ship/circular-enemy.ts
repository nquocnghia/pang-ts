import { Ship } from './ship';
import { Point } from '../point';
import { IShip } from './iship';
import { Bullet } from './bullet';
import { Player } from './player';
import { EventShipDestroyed } from '../event/game-event';

/**
 * This represents an enemy ship that moves in a circular path
 */
export class CircularEnemy extends Ship {
    constructor(
        imgSrc: string,
        width: number,
        height: number,
        private origin: Point,
        private radius: number,
        private angle: number,
        private deltaT: number
    ) {
        super(imgSrc, new Point(0, 0), width, height);
    }

    tick(): void {
        this.centerX = Math.floor(Math.cos(this.angle) * this.radius + this.origin.x);
        this.centerY = Math.floor(Math.sin(this.angle) * this.radius + this.origin.y);

        this.angle += this.deltaT;
    }

    canCollideWith(that: IShip): boolean {
        return that instanceof Bullet && that.shooter instanceof Player;
    }

    collisionHandler(that: IShip): void {
        this.notify(new EventShipDestroyed(this));
    }
}