import { Ship } from './ship';
import { Point } from '../point';
import { EventShipDestroyed } from '../event/game-event';
import { LinearShip } from './linear-ship';
import { IShip } from './iship';
import { BouncingEnemy } from './bouncing-enemy';
import { CircularEnemy } from './circular-enemy';

export class Bullet extends LinearShip {
    constructor(
        srcImg: string,
        public readonly shooter: Ship,
        width: number, height: number,
        deltaY: number
    ) {
        super(srcImg, new Point(0, 0), width, height, 0, deltaY);

        this.centerX = shooter.centerX;

        if (deltaY > 0) {
            this.top = shooter.bottom;
        } else {
            this.bottom = shooter.top;
        }
    }

    tick(): void {
        super.tick();

        if (this.bottom <= 0) {
            this.selfDestroy();
        }
    }

    canCollideWith(that: IShip): boolean {
        return that instanceof BouncingEnemy || that instanceof CircularEnemy;
    }

    collisionHandler(that: IShip): void {
        this.selfDestroy();
    }

    private selfDestroy(): void {
        this.notify(new EventShipDestroyed(this));
    }
}