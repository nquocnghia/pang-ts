import { LinearShip } from './linear-ship';
import { Constant } from '../constant';

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
}