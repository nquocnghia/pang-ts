import { LinearShip } from './linear-ship';
import { Constant } from '../constant';
import { IShip } from './iship';
import { Bullet } from './bullet';
import { Player } from './player';
import { EventShipDestroyed } from '../event/game-event';

/**
 * This represents an enemy ship that bounce
 */
export class BouncingEnemy extends LinearShip {
    tick(): void {
        super.tick();

        // adjust ship's movement: make it bounce
        if (this.left <= Constant.GAME_LEFT || this.right >= Constant.GAME_RIGHT) {
            this.deltaX *= -1;
        }

        if (this.top <= Constant.GAME_TOP || this.bottom >= Constant.GAME_BOTTOM) {
            this.deltaY *= -1;
        }
    }

    canCollideWith(that: IShip): boolean {
        return that instanceof Bullet && that.shooter instanceof Player;
    }

    collisionHandler(that: IShip): void {
        this.notify(new EventShipDestroyed(this));
    }
}