import { Ship } from './ship';
import { Point } from '../point';
import { EventShipDestroyed } from '../event/game-event';
import { IShip } from './iship';
import { LinearMove } from './move-strategy/linear-move';
import { Enemy } from './enemy';
import { Constant } from '../constant';
import { Player } from './player';

export class Bullet extends Ship {
    constructor(
        srcImg: string,
        public readonly shooter: Ship,
        width: number, height: number,
        deltaY: number
    ) {
        super(srcImg, new Point(0, 0), width, height, new LinearMove(0, deltaY));

        this.centerX = shooter.centerX;

        if (deltaY > 0) {
            this.top = shooter.bottom;
        } else {
            this.bottom = shooter.top;
        }
    }

    tick(): void {
        super.tick();

        if (this.bottom <= 0 || this.top >= Constant.CANVAS_HEIGHT) {
            this.selfDestroy();
        }
    }

    canCollideWith(that: IShip): boolean {
        // enemy vs player's bullet
        return (that instanceof Enemy && this.shooter instanceof Player) ||
            // player vs enemy's bullet
            (that instanceof Player && this.shooter instanceof Enemy) ||
            // bullet vs bullet
            (that instanceof Bullet &&
                ((that.shooter instanceof Enemy && this.shooter instanceof Player) ||
                    (this.shooter instanceof Enemy && that.shooter instanceof Player)));
    }

    collisionHandler(that: IShip): void {
        this.selfDestroy();
    }

    private selfDestroy(): void {
        this.notify(new EventShipDestroyed(this));
    }
}