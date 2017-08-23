import { Ship } from './ship';
import { Point } from '../point';
import { EventShipDestroyed } from '../event/game-event';
import { IShip } from './iship';
import { LinearMove } from './move-strategy/linear-move';
import { Constant } from '../constant';

export class Bullet extends Ship {
    constructor(
        srcImg: string,
        shooter: Ship,
        width: number, height: number,
        deltaY: number
    ) {
        super(srcImg, new Point(0, 0), width, height, new LinearMove(0, deltaY), shooter.side);

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
        return that.side !== this.side;
    }

    collisionHandler(that: IShip): void {
        this.selfDestroy();
    }

    private selfDestroy(): void {
        this.notify(new EventShipDestroyed(this));
    }
}